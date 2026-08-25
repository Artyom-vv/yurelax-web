import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, finalize, forkJoin, of, tap} from 'rxjs';
import {
  AdminCommerceOfferRevision,
  AdminCommerceProductRevision,
  AdminCommerceReferences,
  AdminCommerceService,
  CommerceCapabilityReference,
  CommerceRequirement,
  PublishCommerceGrant,
  PublishCommerceOffer,
  PublishCommerceProduct,
} from '../../../shared/services/admin-commerce.service';

const CONTRACT_CODE = /^[a-z][a-z0-9_.-]{1,127}$/;
const CURRENCY_CODE = /^[A-Z][A-Z0-9_]{1,63}$/;
const POSITIVE_DECIMAL = /^(?:0|[1-9][0-9]*)(?:\.[0-9]+)?$/;

@Component({
  selector: 'yrx-admin-commerce',
  templateUrl: './admin-commerce.component.html',
  styleUrls: ['./admin-commerce.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AdminCommerceComponent implements OnInit {
  public view: 'catalog' | 'product' | 'offer' = 'catalog';
  public products: AdminCommerceProductRevision[] = [];
  public offers: AdminCommerceOfferRevision[] = [];
  public references: AdminCommerceReferences = {
    currencies: [], games: [], statistics: [], providers: [], progressions: [], capabilities: [],
  };
  public productCode = '';
  public offerCode = '';
  public loading = true;
  public mutating = false;
  public readonly productForm: FormGroup;
  public readonly offerForm: FormGroup;

  constructor(
    private readonly commerce: AdminCommerceService,
    private readonly snackBar: MatSnackBar,
    private readonly formBuilder: FormBuilder,
  ) {
    this.productForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern(CONTRACT_CODE)]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      version: [1, [Validators.required, Validators.min(1)]],
      kind: ['PERMISSION', Validators.required],
      grants: this.formBuilder.array([this.createGrantGroup()]),
    });
    this.offerForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern(CONTRACT_CODE)]],
      version: [1, [Validators.required, Validators.min(1)]],
      productRevision: ['', Validators.required],
      gameCode: ['', Validators.pattern(CONTRACT_CODE)],
      effectiveFrom: [this.localDateTime(new Date()), Validators.required],
      effectiveUntil: [''],
      requirementMode: ['NONE'],
      requirements: this.formBuilder.array([]),
      prices: this.formBuilder.array([this.createPriceGroup()]),
    });
  }

  public get grants(): FormArray { return this.productForm.get('grants') as FormArray; }
  public get prices(): FormArray { return this.offerForm.get('prices') as FormArray; }
  public get requirements(): FormArray { return this.offerForm.get('requirements') as FormArray; }
  public get offerCodes(): string[] { return [...new Set(this.offers.map(offer => offer.code))]; }

  ngOnInit(): void { this.load(); }

  public addGrant(): void { this.grants.push(this.createGrantGroup()); }
  public removeGrant(index: number): void { if (this.grants.length > 1) this.grants.removeAt(index); }
  public addPrice(): void { this.prices.push(this.createPriceGroup()); }
  public removePrice(index: number): void { if (this.prices.length > 1) this.prices.removeAt(index); }
  public addRequirement(): void {
    this.requirements.push(this.createRequirementGroup());
    if (this.offerForm.get('requirementMode')?.value === 'NONE') {
      this.offerForm.patchValue({requirementMode: 'ALL'});
    }
  }
  public removeRequirement(index: number): void {
    this.requirements.removeAt(index);
    if (this.requirements.length === 0) this.offerForm.patchValue({requirementMode: 'NONE'});
  }

  public open(view: 'catalog' | 'product' | 'offer'): void {
    this.view = view;
    if (view === 'offer' && !this.offerForm.get('productRevision')?.value && this.products.length > 0) {
      this.offerForm.patchValue({productRevision: this.productRevisionValue(this.products[0])});
    }
  }

  public load(): void {
    this.loading = true;
    forkJoin({
      products: this.commerce.products(this.productCode.trim() || undefined),
      offers: this.commerce.offers(this.offerCode.trim() || undefined),
      references: this.commerce.references(),
    }).pipe(
      tap(result => {
        this.products = result.products.items;
        this.offers = result.offers.items;
        this.references = result.references;
      }),
      catchError(error => this.failure(error, 'Не удалось загрузить commerce-каталог')),
      finalize(() => this.loading = false),
    ).subscribe();
  }

  public publishProduct(): void {
    if (this.productForm.invalid || this.mutating) return;
    let input: PublishCommerceProduct;
    try {
      const value = this.productForm.getRawValue();
      input = {
        code: value.code.trim(), name: value.name.trim(), description: value.description.trim(),
        version: Number(value.version), kind: value.kind,
        grants: value.grants.map((grant: Record<string, unknown>) => this.productGrant(grant)),
      };
    } catch (error) {
      this.snackBar.open(error instanceof Error ? error.message : 'Некорректные данные товара', 'Закрыть');
      return;
    }
    this.mutating = true;
    this.commerce.publishProduct(input).pipe(
      tap(product => {
        this.products = [product, ...this.products];
        this.snackBar.open(`Товар ${product.productCode} v${product.version} опубликован`, 'Хорошо');
        this.productForm.reset({version: 1, kind: 'PERMISSION'});
        this.grants.clear(); this.grants.push(this.createGrantGroup());
        this.view = 'catalog';
      }),
      catchError(error => this.failure(error, 'Не удалось опубликовать товар')),
      finalize(() => this.mutating = false),
    ).subscribe();
  }

  public publishOffer(): void {
    if (this.offerForm.invalid || this.mutating) return;
    let input: PublishCommerceOffer;
    try {
      const value = this.offerForm.getRawValue();
      const productRevision = this.parseProductRevision(value.productRevision);
      input = {
        code: value.code.trim(), version: Number(value.version), productCode: productRevision.productCode,
        productVersion: productRevision.productVersion, gameCode: value.gameCode.trim() || null,
        effectiveFrom: new Date(value.effectiveFrom).toISOString(),
        effectiveUntil: value.effectiveUntil ? new Date(value.effectiveUntil).toISOString() : null,
        requirement: this.requirementInput(value),
        prices: value.prices.map((price: {currencyCode: string; amount: string}) => ({
          currencyCode: price.currencyCode.trim(), amount: price.amount.trim(),
        })),
      };
    } catch (error) {
      this.snackBar.open(error instanceof Error ? error.message : 'Некорректное требование предложения', 'Закрыть');
      return;
    }
    this.mutating = true;
    this.commerce.publishOffer(input).pipe(
      tap(offer => {
        this.offers = [offer, ...this.offers];
        this.snackBar.open(`Предложение ${offer.code} v${offer.version} опубликовано`, 'Хорошо');
        this.offerForm.reset({version: 1, productRevision: '', effectiveFrom: this.localDateTime(new Date()),
          requirementMode: 'NONE'});
        this.prices.clear(); this.prices.push(this.createPriceGroup());
        this.requirements.clear();
        this.view = 'catalog';
      }),
      catchError(error => this.failure(error, 'Не удалось опубликовать предложение')),
      finalize(() => this.mutating = false),
    ).subscribe();
  }

  public retireOffer(offer: AdminCommerceOfferRevision): void {
    if (this.mutating || offer.retiredAt) return;
    const reason = globalThis.prompt?.(`Причина снятия ${offer.code} v${offer.version}`)?.trim();
    if (!reason || reason.length < 3) return;
    this.mutating = true;
    this.commerce.retireOffer(offer.id, reason).pipe(
      tap(updated => {
        this.offers = this.offers.map(item => item.id === updated.id ? updated : item);
        this.snackBar.open(`Предложение ${updated.code} снято, история сохранена`, 'Хорошо');
      }),
      catchError(error => this.failure(error, 'Не удалось снять предложение')),
      finalize(() => this.mutating = false),
    ).subscribe();
  }

  public requirement(value: unknown): string {
    if (!value || typeof value !== 'object') return 'Без дополнительных требований';
    const requirement = value as Record<string, unknown>;
    switch (requirement['kind']) {
      case 'PROGRESSION_LEVEL': return `Уровень ${requirement['minimumLevel']} в ${requirement['progressionCode']}`;
      case 'STAT_THRESHOLD': return `${requirement['statCode']} ≥ ${requirement['minimum']} (${requirement['gameCode'] ?? 'глобально'})`;
      case 'GRANT_OWNED': return `Требуется право ${requirement['providerCode']}:${requirement['grantKey']}`;
      case 'PURCHASE_COUNT_LIMIT': return `Не более ${requirement['maximum']} покупок ${requirement['offerCode']}`;
      case 'ALL': return `Все условия: ${(requirement['items'] as unknown[]).map(item => this.requirement(item)).join('; ')}`;
      case 'ANY': return `Любое условие: ${(requirement['items'] as unknown[]).map(item => this.requirement(item)).join('; ')}`;
      case 'NOT': return `Не должно выполняться: ${this.requirement(requirement['item'])}`;
      default: return 'Контрактное требование';
    }
  }

  public lifetime(grant: AdminCommerceProductRevision['grants'][number]): string {
    return grant.lifetime.kind === 'PERMANENT'
      ? 'Навсегда'
      : `На ${grant.lifetime.durationSeconds} сек.`;
  }

  public productRevisionValue(product: AdminCommerceProductRevision): string {
    return `${product.productCode}::${product.version}`;
  }

  public capability(id: unknown): CommerceCapabilityReference | undefined {
    return this.references.capabilities.find(capability => capability.id === id);
  }

  public capabilityLabel(capability: CommerceCapabilityReference): string {
    const scope = capability.gameCode ?? 'весь проект';
    return `${capability.name} · ${scope}`;
  }

  public capabilitySchema(capability: CommerceCapabilityReference): string {
    return JSON.stringify(capability.payloadSchema, null, 2);
  }

  private parseProductRevision(value: unknown): {productCode: string; productVersion: number} {
    const [productCode, version] = String(value ?? '').split('::');
    const productVersion = Number(version);
    if (!CONTRACT_CODE.test(productCode ?? '') || !Number.isInteger(productVersion) || productVersion < 1) {
      throw new Error('Выберите опубликованную версию товара');
    }
    return {productCode: productCode!, productVersion};
  }

  private createGrantGroup(): FormGroup {
    return this.formBuilder.group({
      capabilityId: ['', Validators.required],
      ownershipPolicy: ['DENY_DUPLICATE', Validators.required],
      lifetimeKind: ['PERMANENT', Validators.required],
      durationSeconds: [2_592_000, Validators.min(1)],
      startsAt: [this.localDateTime(new Date())],
      expiresAt: [this.localDateTime(new Date(Date.now() + 2_592_000_000))],
      activationEnabled: [false],
      activationDurationSeconds: [3_600, Validators.min(1)],
      activationWindowSeconds: [86_400, Validators.min(1)],
      maximumActivations: [1, Validators.min(1)],
      lifetimeMaximumActivations: [null, Validators.min(1)],
      payload: ['{}', Validators.required],
    });
  }

  private createPriceGroup(): FormGroup {
    return this.formBuilder.group({
      currencyCode: ['', [Validators.required, Validators.pattern(CURRENCY_CODE)]],
      amount: ['', [Validators.required, Validators.pattern(POSITIVE_DECIMAL)]],
    });
  }

  private createRequirementGroup(): FormGroup {
    return this.formBuilder.group({
      kind: ['PROGRESSION_LEVEL', Validators.required],
      negated: [false],
      progressionCode: [''], minimumLevel: [3, Validators.min(0)],
      statCode: [''], gameCode: [''], minimum: ['0'],
      capabilityId: [''], offerCode: [''], maximum: [1, Validators.min(1)],
    });
  }

  private productGrant(value: Record<string, unknown>): PublishCommerceGrant {
    const capability = this.requiredCapability(value['capabilityId']);
    let payload: unknown;
    try { payload = JSON.parse(String(value['payload'])); }
    catch { throw new Error(`Данные права ${capability.name} должны быть корректным JSON`); }
    const lifetimeKind = value['lifetimeKind'];
    const activation = value['activationEnabled'] === true;
    return {
      providerCode: capability.providerCode, grantKey: capability.grantKey,
      gameCode: capability.gameCode,
      deliveryMode: capability.deliveryMode,
      ownershipPolicy: value['ownershipPolicy'] as PublishCommerceGrant['ownershipPolicy'],
      lifetime: lifetimeKind === 'FIXED_DURATION'
        ? {kind: 'FIXED_DURATION', durationSeconds: Number(value['durationSeconds'])}
        : lifetimeKind === 'FIXED_WINDOW'
          ? this.fixedWindow(value['startsAt'], value['expiresAt'])
          : {kind: 'PERMANENT'},
      activationPolicy: activation ? {
        durationSeconds: Number(value['activationDurationSeconds']),
        lifetimeMaximumActivations: value['lifetimeMaximumActivations']
          ? Number(value['lifetimeMaximumActivations']) : null,
        period: {kind: 'FIXED_UTC_WINDOW', windowSeconds: Number(value['activationWindowSeconds']),
          maximumActivations: Number(value['maximumActivations'])},
      } : null,
      payload,
    };
  }

  private requirementInput(value: Record<string, any>): CommerceRequirement | null {
    if (value['requirementMode'] === 'NONE') return null;
    const items = (value['requirements'] as Record<string, unknown>[]).map(item => this.requirementLeaf(item));
    if (items.length === 0) throw new Error('Добавьте хотя бы одно условие покупки');
    return items.length === 1 ? items[0] : {kind: value['requirementMode'] === 'ANY' ? 'ANY' : 'ALL', items};
  }

  private requirementLeaf(value: Record<string, unknown>): CommerceRequirement {
    let result: CommerceRequirement;
    switch (value['kind']) {
      case 'PROGRESSION_LEVEL': result = {kind: 'PROGRESSION_LEVEL', progressionCode: this.requiredCode(value['progressionCode'], 'Код прогрессии'), minimumLevel: Number(value['minimumLevel'])}; break;
      case 'STAT_THRESHOLD': result = {kind: 'STAT_THRESHOLD', statCode: this.requiredCode(value['statCode'], 'Код статистики'), gameCode: this.optionalCode(value['gameCode'], 'Код режима'), minimum: String(value['minimum']).trim()}; break;
      case 'GRANT_OWNED': {
        const capability = this.requiredCapability(value['capabilityId']);
        result = {kind: 'GRANT_OWNED', providerCode: capability.providerCode,
          grantKey: capability.grantKey, gameCode: capability.gameCode};
        break;
      }
      case 'PURCHASE_COUNT_LIMIT': result = {kind: 'PURCHASE_COUNT_LIMIT', offerCode: this.requiredCode(value['offerCode'], 'Код предложения'), maximum: Number(value['maximum'])}; break;
      default: throw new Error('Выберите тип условия покупки');
    }
    return value['negated'] === true ? {kind: 'NOT', item: result} : result;
  }

  private fixedWindow(startsAt: unknown, expiresAt: unknown): PublishCommerceGrant['lifetime'] {
    const start = new Date(String(startsAt)); const end = new Date(String(expiresAt));
    if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || end <= start) {
      throw new Error('Окончание фиксированного срока права должно быть позже начала');
    }
    return {kind: 'FIXED_WINDOW', startsAt: start.toISOString(), expiresAt: end.toISOString()};
  }

  private requiredCode(value: unknown, label: string): string {
    const code = String(value ?? '').trim();
    if (!CONTRACT_CODE.test(code)) throw new Error(`${label}: выберите корректный контрактный ключ`);
    return code;
  }

  private requiredCapability(id: unknown): CommerceCapabilityReference {
    const capability = this.capability(id);
    if (!capability?.active) throw new Error('Выберите активное право из платформенного реестра');
    return capability;
  }

  private optionalCode(value: unknown, label: string): string | null {
    const code = String(value ?? '').trim();
    return code ? this.requiredCode(code, label) : null;
  }

  private localDateTime(date: Date): string {
    const offset = date.getTimezoneOffset() * 60_000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
  }

  private failure(error: any, fallback: string) {
    this.snackBar.open(error?.error?.message ?? fallback, 'Закрыть');
    return of(null);
  }
}

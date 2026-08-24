import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, finalize, forkJoin, of, tap} from 'rxjs';
import {
  AdminCommerceOfferRevision,
  AdminCommerceProductRevision,
  AdminCommerceService,
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
      productCode: ['', [Validators.required, Validators.pattern(CONTRACT_CODE)]],
      productVersion: [1, [Validators.required, Validators.min(1)]],
      gameCode: ['', Validators.pattern(CONTRACT_CODE)],
      effectiveFrom: [this.localDateTime(new Date()), Validators.required],
      effectiveUntil: [''],
      requirementKind: ['NONE'],
      progressionCode: [''],
      minimumLevel: [3, Validators.min(0)],
      statCode: [''],
      requirementGameCode: [''],
      minimumStatistic: ['0'],
      providerCode: [''],
      grantKey: [''],
      requiredOfferCode: [''],
      maximumPurchases: [1, Validators.min(1)],
      prices: this.formBuilder.array([this.createPriceGroup()]),
    });
  }

  public get grants(): FormArray { return this.productForm.get('grants') as FormArray; }
  public get prices(): FormArray { return this.offerForm.get('prices') as FormArray; }

  ngOnInit(): void { this.load(); }

  public addGrant(): void { this.grants.push(this.createGrantGroup()); }
  public removeGrant(index: number): void { if (this.grants.length > 1) this.grants.removeAt(index); }
  public addPrice(): void { this.prices.push(this.createPriceGroup()); }
  public removePrice(index: number): void { if (this.prices.length > 1) this.prices.removeAt(index); }

  public open(view: 'catalog' | 'product' | 'offer'): void {
    this.view = view;
  }

  public load(): void {
    this.loading = true;
    forkJoin({
      products: this.commerce.products(this.productCode.trim() || undefined),
      offers: this.commerce.offers(this.offerCode.trim() || undefined),
    }).pipe(
      tap(result => {
        this.products = result.products.items;
        this.offers = result.offers.items;
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
      input = {
        code: value.code.trim(), version: Number(value.version), productCode: value.productCode.trim(),
        productVersion: Number(value.productVersion), gameCode: value.gameCode.trim() || null,
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
        this.offerForm.reset({version: 1, productVersion: 1, effectiveFrom: this.localDateTime(new Date()),
          requirementKind: 'NONE', minimumLevel: 3, minimumStatistic: '0', maximumPurchases: 1});
        this.prices.clear(); this.prices.push(this.createPriceGroup());
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
      default: return 'Контрактное требование';
    }
  }

  public lifetime(grant: AdminCommerceProductRevision['grants'][number]): string {
    return grant.lifetime.kind === 'PERMANENT'
      ? 'Навсегда'
      : `На ${grant.lifetime.durationSeconds} сек.`;
  }

  private createGrantGroup(): FormGroup {
    return this.formBuilder.group({
      providerCode: ['', [Validators.required, Validators.pattern(CONTRACT_CODE)]],
      grantKey: ['', [Validators.required, Validators.pattern(CONTRACT_CODE)]],
      gameCode: ['', Validators.pattern(CONTRACT_CODE)],
      deliveryMode: ['ENTITLEMENT', Validators.required],
      ownershipPolicy: ['DENY_DUPLICATE', Validators.required],
      lifetimeKind: ['PERMANENT', Validators.required],
      durationSeconds: [2_592_000, Validators.min(1)],
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

  private productGrant(value: Record<string, unknown>): PublishCommerceGrant {
    let payload: unknown;
    try { payload = JSON.parse(String(value['payload'])); }
    catch { throw new Error(`Payload права ${String(value['grantKey'])} должен быть корректным JSON`); }
    const fixedDuration = value['lifetimeKind'] === 'FIXED_DURATION';
    const activation = value['activationEnabled'] === true;
    return {
      providerCode: String(value['providerCode']).trim(), grantKey: String(value['grantKey']).trim(),
      gameCode: String(value['gameCode'] ?? '').trim() || null,
      deliveryMode: value['deliveryMode'] as PublishCommerceGrant['deliveryMode'],
      ownershipPolicy: value['ownershipPolicy'] as PublishCommerceGrant['ownershipPolicy'],
      lifetime: fixedDuration
        ? {kind: 'FIXED_DURATION', durationSeconds: Number(value['durationSeconds'])}
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
    switch (value['requirementKind']) {
      case 'PROGRESSION_LEVEL': return {kind: 'PROGRESSION_LEVEL', progressionCode: this.requiredCode(value['progressionCode'], 'Код прогрессии'), minimumLevel: Number(value['minimumLevel'])};
      case 'STAT_THRESHOLD': return {kind: 'STAT_THRESHOLD', statCode: this.requiredCode(value['statCode'], 'Код статистики'), gameCode: this.optionalCode(value['requirementGameCode'], 'Код режима'), minimum: String(value['minimumStatistic']).trim()};
      case 'GRANT_OWNED': return {kind: 'GRANT_OWNED', providerCode: this.requiredCode(value['providerCode'], 'Provider'), grantKey: this.requiredCode(value['grantKey'], 'Ключ права'), gameCode: this.optionalCode(value['requirementGameCode'], 'Код режима')};
      case 'PURCHASE_COUNT_LIMIT': return {kind: 'PURCHASE_COUNT_LIMIT', offerCode: this.requiredCode(value['requiredOfferCode'], 'Код предложения'), maximum: Number(value['maximumPurchases'])};
      default: return null;
    }
  }

  private requiredCode(value: unknown, label: string): string {
    const code = String(value ?? '').trim();
    if (!CONTRACT_CODE.test(code)) throw new Error(`${label}: выберите корректный контрактный ключ`);
    return code;
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

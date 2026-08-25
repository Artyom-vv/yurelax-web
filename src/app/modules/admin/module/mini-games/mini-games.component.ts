import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, finalize, forkJoin, of} from 'rxjs';
import {AdminGameContentService, GameContentReference, GamePresentationDraft, GameStatReference} from '../../../shared/services/admin-game-content.service';
import {PlatformGameCatalogService, PublicGame, PublicGamePresentation} from '../../../shared/services/platform-game-catalog.service';

interface PresentationForm {
  description: FormControl<string>; icon: FormControl<string>; iconStroked: FormControl<boolean>;
  heroImageUrl: FormControl<string>;
}

@Component({selector: 'yrx-mini-games', templateUrl: './mini-games.component.html',
  styleUrls: ['./mini-games.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush, standalone: false})
export class MiniGamesComponent implements OnInit {
  games: GameContentReference[] = [];
  statistics: GameStatReference[] = [];
  drafts: GamePresentationDraft[] = [];
  published = new Map<string, PublicGame>();
  selectedGame?: GameContentReference;
  selectedStats = new Set<string>();
  loading = true;
  saving = false;
  publishingId?: string;
  readonly form = new FormGroup<PresentationForm>({
    description: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(320)]}),
    icon: new FormControl('cube', {nonNullable: true, validators: [Validators.required, Validators.pattern(/^[a-z][a-z0-9-]{0,63}$/)]}),
    iconStroked: new FormControl(true, {nonNullable: true}),
    heroImageUrl: new FormControl('', {nonNullable: true, validators: [Validators.maxLength(2048)]}),
  });

  constructor(private readonly content: AdminGameContentService, private readonly catalog: PlatformGameCatalogService,
    private readonly snack: MatSnackBar, private readonly changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    forkJoin({references: this.content.references(), publicGames: this.catalog.list().pipe(catchError(() => of({items: []})))})
      .pipe(finalize(() => {this.loading = false; this.changeDetector.markForCheck();}))
      .subscribe({next: ({references, publicGames}) => {
        this.games = references.games; this.statistics = references.statistics;
        this.published = new Map(publicGames.items.map(game => [game.code, game]));
        if (this.games[0]) this.selectGame(this.games[0]);
      }, error: error => this.failure(error, 'Не удалось загрузить каталог режимов')});
  }

  selectGame(game: GameContentReference): void {
    this.selectedGame = game;
    this.applyPresentation(this.published.get(game.code)?.presentation);
    this.loading = true;
    this.content.drafts(game.code).pipe(finalize(() => {this.loading = false; this.changeDetector.markForCheck();}))
      .subscribe({next: page => {this.drafts = page.items; this.changeDetector.markForCheck();},
        error: error => this.failure(error, 'Не удалось загрузить историю изменений')});
  }

  toggleStat(code: string): void {
    if (this.selectedStats.has(code)) this.selectedStats.delete(code);
    else if (this.selectedStats.size < 6) this.selectedStats.add(code);
  }

  save(): void {
    if (!this.selectedGame || this.form.invalid) {this.form.markAllAsTouched(); return;}
    this.saving = true;
    this.content.create(this.selectedGame.code, this.presentation()).pipe(
      finalize(() => {this.saving = false; this.changeDetector.markForCheck();}),
    ).subscribe({next: draft => {
      this.drafts = [draft, ...this.drafts.filter(item => item.id !== draft.id)];
      this.snack.open('Черновик сохранён. Игроки пока не видят изменения.', 'Закрыть', {duration: 4500});
    }, error: error => this.failure(error, 'Не удалось сохранить черновик')});
  }

  preview(draft: GamePresentationDraft): void {this.applyPresentation(draft.presentation);}

  publish(draft: GamePresentationDraft): void {
    this.publishingId = draft.id;
    this.content.publish(draft.id).pipe(finalize(() => {this.publishingId = undefined; this.changeDetector.markForCheck();}))
      .subscribe({next: published => {
        this.drafts = this.drafts.map(item => item.id === published.id ? published : item);
        if (this.selectedGame) this.published.set(this.selectedGame.code, {
          code: this.selectedGame.code, name: this.selectedGame.name, presentation: published.presentation,
        });
        this.applyPresentation(published.presentation);
        this.snack.open('Версия опубликована и доступна игрокам.', 'Закрыть', {duration: 4500});
      }, error: error => this.failure(error, 'Не удалось опубликовать версию')});
  }

  statAllowed(code: string): boolean {
    return !this.selectedGame || code.startsWith(`${this.selectedGame.code}.`) || !code.includes('.');
  }
  date(value?: string): string {
    return value ? new Intl.DateTimeFormat('ru-RU', {dateStyle: 'medium', timeStyle: 'short'}).format(new Date(value)) : '—';
  }

  private presentation(): PublicGamePresentation {
    const value = this.form.getRawValue();
    return {description: value.description.trim(), icon: value.icon.trim(), iconStroked: value.iconStroked,
      ...(value.heroImageUrl.trim() ? {heroImageUrl: value.heroImageUrl.trim()} : {}),
      featuredStatCodes: [...this.selectedStats]};
  }
  private applyPresentation(value?: PublicGamePresentation): void {
    this.form.setValue({description: value?.description ?? '', icon: value?.icon ?? 'cube',
      iconStroked: value?.iconStroked ?? true, heroImageUrl: value?.heroImageUrl ?? ''});
    this.selectedStats = new Set(value?.featuredStatCodes ?? []);
  }
  private failure(error: any, fallback: string): void {
    this.snack.open(error?.error?.message ?? fallback, 'Закрыть', {duration: 6000});
  }
}

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, finalize, of, tap} from 'rxjs';
import {PlatformGameLinkService} from '../../../shared/services/platform-game-link.service';

const GAME_LINK_CODE = /^[A-F0-9]{10}$/;

@Component({
  selector: 'yrx-game-link',
  templateUrl: './game-link.component.html',
  styleUrls: ['./game-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
/** Presents the final first-party confirmation for a Minecraft account link. */
export class GameLinkComponent implements OnInit {
  public code = '';
  public loading = false;
  public linkedName = '';
  public error = '';

  constructor(private readonly route: ActivatedRoute, private readonly router: Router,
    private readonly links: PlatformGameLinkService, private readonly changes: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.code = (this.route.snapshot.queryParamMap.get('code') ?? '').trim().toUpperCase();
    if (!GAME_LINK_CODE.test(this.code)) this.error = 'Ссылка повреждена. Выполните /link в игре ещё раз.';
  }

  /** Confirms the displayed Minecraft account for the active web account. */
  public approve(): void {
    if (!GAME_LINK_CODE.test(this.code) || this.loading) return;
    this.loading = true;
    this.error = '';
    this.links.approve(this.code).pipe(
      tap(profile => this.linkedName = profile.currentName),
      catchError(error => {
        this.error = error?.error?.message ?? 'Не удалось связать аккаунты. Создайте новую ссылку командой /link.';
        return of(null);
      }),
      finalize(() => { this.loading = false; this.changes.markForCheck(); }),
    ).subscribe();
  }

  /** Opens the linked player profile after confirmation. */
  public openProfile(): void { void this.router.navigate(['/platform/profile/home']); }
}

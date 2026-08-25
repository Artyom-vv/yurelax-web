import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {catchError, finalize, of} from 'rxjs';
import {PlatformGameCatalogService, PublicGame} from '../../../shared/services/platform-game-catalog.service';

@Component({
  selector: 'yrx-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class GamesComponent implements OnInit {
  games: PublicGame[] = [];
  loading = true;
  unavailable = false;

  constructor(private readonly catalog: PlatformGameCatalogService) {}

  ngOnInit(): void {
    this.catalog.list().pipe(
      catchError(() => {
        this.unavailable = true;
        return of({items: []});
      }),
      finalize(() => this.loading = false),
    ).subscribe(page => this.games = page.items);
  }

  statLabel(code: string): string {
    return STAT_LABELS[code] ?? code.replaceAll('_', ' ');
  }

  trackGame(_: number, game: PublicGame): string { return game.code; }
}

const STAT_LABELS: Record<string, string> = {
  game_won: 'Победы', wins: 'Победы', kills: 'Убийства', score: 'Очки',
  marker_hold_seconds: 'Удержание точек', team_points_earned: 'Командные очки',
};

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {AdminPlayersService} from './admin-players.service';

describe('AdminPlayersService', () => {
  let service: AdminPlayersService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule], providers: [AdminPlayersService]});
    service = TestBed.inject(AdminPlayersService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('searches only the staff-safe player directory', () => {
    service.players('Suppick').subscribe();
    const request = http.expectOne('/api/admin/players?search=Suppick&limit=30');
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });

  it('reads the explicit support resources with encoded player identity', () => {
    const playerId = 'player/id';
    service.statistics(playerId, 'hunt').subscribe();
    http.expectOne('/api/admin/players/player%2Fid/statistics?gameCode=hunt').flush({playerId, items: []});

    service.rewards(playerId, 'hunt').subscribe();
    http.expectOne('/api/admin/players/player%2Fid/rewards?gameCode=hunt&limit=50').flush({items: []});

    service.purchases(playerId).subscribe();
    http.expectOne('/api/admin/players/player%2Fid/purchases?limit=50').flush({items: []});

    service.entitlements(playerId).subscribe();
    http.expectOne('/api/admin/players/player%2Fid/entitlements?limit=50').flush({items: []});

    service.timeline(playerId, 'ACTIVITY').subscribe();
    http.expectOne('/api/admin/players/player%2Fid/timeline?scope=ACTIVITY&limit=50').flush({items: []});
  });
});

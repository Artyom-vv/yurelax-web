import {Injectable} from '@angular/core';
import {forkJoin, map, Observable, of, tap} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {AppStore} from '../../../store/app.store';
import {UserRes} from '../../platform/interfaces/user.interface';
import {RolesEnum} from '../../shared/enums/roles.enum';
import {PersistenceService} from '../../shared/services/persistence.service';
import {PlatformSessionService} from '../../shared/services/platform-session.service';
import {GetMeRes} from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly persistence: PersistenceService,
    private readonly appStore: AppStore,
    private readonly platformSession: PlatformSessionService,
  ) {}

  saveUserData(user: UserRes): void {
    this.persistence.set('user', user);
    this.appStore.setUser(user);
  }

  getMe(): Observable<GetMeRes> {
    return forkJoin({
      profile: this.platformSession.profile(),
      access: this.platformSession.access(),
    }).pipe(
      map(({profile, access}) => {
        const minecraft = profile.identities.find(identity => identity.provider === 'MINECRAFT');
        const createdAt = profile.identities.map(identity => identity.verifiedAt).sort()[0]
          ?? new Date(0).toISOString();
        return {
          _id: profile.playerId,
          login: profile.currentName,
          userInvitedRef: '',
          email: '',
          emailVerify: true,
          role: access.roles.some(role => role !== 'PLAYER') ? RolesEnum.ADMIN : RolesEnum.USER,
          subscription: '',
          userStatisticRef: '',
          userInfoRef: {
            level: 0,
            pouches: 0,
            coins: 0,
            ucoins: 0,
            prestigeScore: 0,
            lastOnlineDate: 0,
            isOnline: false,
            skinType: 'default' as const,
            skinUrl: null,
            avatarUrl: minecraft ? `${environment.crafatarApiUrl}/avatars/${minecraft.externalId}` : null,
            userInfoId: profile.playerId,
            createdAt,
            updatedAt: createdAt,
          }
        } satisfies GetMeRes;
      }),
      tap(user => this.saveUserData(user))
    );
  }

  logout(): Observable<void> {
    return this.platformSession.logout();
  }

  logoutFromAllDevices(): Observable<boolean> {
    // The BFF currently exposes current-session revocation only.
    return of(false);
  }
}

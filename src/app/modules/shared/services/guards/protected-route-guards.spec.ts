import {firstValueFrom, of} from 'rxjs';
import {RolesEnum} from '../../enums/roles.enum';
import {AuthGuard} from './auth.guard';
import {RoleGuard} from './role-guard.service';

describe('protected route guards', () => {
  const state = {url: '/admin/home'} as any;
  const adminRoute = {data: {roles: [RolesEnum.ADMIN]}} as any;

  it('defers session and role decisions during server rendering', async () => {
    const session = {status: vi.fn(), access: vi.fn()};
    const router = {navigate: vi.fn()};

    await expect(firstValueFrom(new AuthGuard(session as any, router as any, 'server' as any).canActivate(adminRoute, state)))
      .resolves.toBe(true);
    await expect(firstValueFrom(new RoleGuard(session as any, router as any, 'server' as any).canActivate(adminRoute, state)))
      .resolves.toBe(true);

    expect(session.status).not.toHaveBeenCalled();
    expect(session.access).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('requires an authenticated browser session', async () => {
    const session = {status: vi.fn(() => of({authenticated: false}))};
    const router = {navigate: vi.fn()};
    const guard = new AuthGuard(session as any, router as any, 'browser' as any);

    await expect(firstValueFrom(guard.canActivate(adminRoute, state))).resolves.toBe(false);
    expect(session.status).toHaveBeenCalledWith(true);
    expect(router.navigate).toHaveBeenCalledWith(['/auth'], {
      queryParams: {accessDenied: true, returnTo: '/admin/home'},
    });
  });

  it('allows a platform operator into the admin workspace', async () => {
    const session = {access: vi.fn(() => of({roles: ['PLAYER', 'PLATFORM_ADMIN'], scopes: []}))};
    const router = {navigate: vi.fn()};
    const guard = new RoleGuard(session as any, router as any, 'browser' as any);

    await expect(firstValueFrom(guard.canActivate(adminRoute, state))).resolves.toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('keeps a player outside the admin workspace', async () => {
    const session = {access: vi.fn(() => of({roles: ['PLAYER'], scopes: []}))};
    const router = {navigate: vi.fn()};
    const guard = new RoleGuard(session as any, router as any, 'browser' as any);

    await expect(firstValueFrom(guard.canActivate(adminRoute, state))).resolves.toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/platform']);
  });
});

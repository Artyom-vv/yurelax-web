import {EntitlementLifecycleActionComponent} from './entitlement-lifecycle-action.component';

describe('EntitlementLifecycleActionComponent', () => {
  it('requires an explicit bounded reason before revocation', () => {
    const component = new EntitlementLifecycleActionComponent();
    const emit = vi.spyOn(component.changeRequested, 'emit');
    component.status = 'ACTIVE';
    component.reason = 'no';
    component.submit();
    expect(emit).not.toHaveBeenCalled();
    component.reason = '  Подтверждённая ошибочная выдача  ';
    component.submit();
    expect(emit).toHaveBeenCalledWith({operation: 'REVOKE', reason: 'Подтверждённая ошибочная выдача'});
  });

  it('offers restoration only for a revoked right', () => {
    const component = new EntitlementLifecycleActionComponent();
    component.status = 'REVOKED';
    expect(component.operation).toBe('RESTORE');
    component.status = 'CONSUMED';
    expect(component.operation).toBeNull();
  });
});

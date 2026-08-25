import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AdminPageHeaderComponent} from './admin-page-header.component';
import {AdminStateComponent} from './admin-state.component';
import {AdminStatusComponent} from './admin-status.component';

describe('Admin UI primitives', () => {
  it('renders one consistent page hierarchy', async () => {
    await TestBed.configureTestingModule({declarations: [AdminPageHeaderComponent]}).compileComponents();
    const fixture: ComponentFixture<AdminPageHeaderComponent> = TestBed.createComponent(AdminPageHeaderComponent);
    fixture.componentRef.setInput('eyebrow', 'Контракты');
    fixture.componentRef.setInput('title', 'Статистика');
    fixture.componentRef.setInput('description', 'Опубликованные показатели платформы.');
    fixture.componentRef.setInput('surface', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('Статистика');
    expect(fixture.nativeElement.querySelector('header').classList).toContain('admin-page-header_surface');
  });

  it('renders accessible loading feedback without page-specific markup', async () => {
    await TestBed.configureTestingModule({declarations: [AdminStateComponent]}).compileComponents();
    const fixture: ComponentFixture<AdminStateComponent> = TestBed.createComponent(AdminStateComponent);
    fixture.componentRef.setInput('title', 'Загружаем каталог');
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.admin-state__loader')).toBeTruthy();
  });

  it('renders a text-first status with an independent dot signal', async () => {
    await TestBed.configureTestingModule({declarations: [AdminStatusComponent]}).compileComponents();
    const fixture = TestBed.createComponent(AdminStatusComponent);
    fixture.componentRef.setInput('label', 'Используется');
    fixture.componentRef.setInput('tone', 'positive');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Используется');
    expect(fixture.nativeElement.querySelector('.admin-status__dot')).toBeTruthy();
  });
});

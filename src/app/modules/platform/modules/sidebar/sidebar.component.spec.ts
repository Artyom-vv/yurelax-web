import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SidebarComponent} from './sidebar.component';
import {SidebarModule} from './sidebar.module';

describe('SidebarComponent', () => {
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    fixture.componentRef.setInput('collapsible', true);
    fixture.componentRef.setInput('mobileLabel', 'Разделы кабинета');
    fixture.detectChanges();
  });

  it('exposes one accessible mobile navigation toggle', () => {
    const toggle: HTMLButtonElement = fixture.nativeElement.querySelector('.sidebar__toggle');
    expect(toggle.textContent).toContain('Разделы кабинета');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    toggle.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.mobileOpen).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelector('.sidebar').classList).toContain('sidebar_open');
  });

  it('does not toggle a desktop-only sidebar', () => {
    fixture.componentRef.setInput('collapsible', false);
    fixture.detectChanges();

    fixture.componentInstance.toggleMobile();

    expect(fixture.componentInstance.mobileOpen).toBe(false);
  });
});

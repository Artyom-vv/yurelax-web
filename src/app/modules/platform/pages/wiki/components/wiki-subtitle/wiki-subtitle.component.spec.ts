import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiSubtitleComponent } from './wiki-subtitle.component';

describe('WikiHeadlineComponent', () => {
  let component: WikiSubtitleComponent;
  let fixture: ComponentFixture<WikiSubtitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WikiSubtitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WikiSubtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

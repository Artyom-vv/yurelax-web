import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiHeadlineComponent } from './wiki-headline.component';

describe('WikiHeadlineComponent', () => {
  let component: WikiHeadlineComponent;
  let fixture: ComponentFixture<WikiHeadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WikiHeadlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WikiHeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

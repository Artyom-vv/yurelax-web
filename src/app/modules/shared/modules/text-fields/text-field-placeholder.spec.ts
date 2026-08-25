import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputModule} from './modules/input/input.module';
import {TextAreaModule} from './modules/text-area/text-area.module';

@Component({
  template: `
    <input [formControl]="title" yrxInput placeholder="Название">
    <textarea [formControl]="description" yrxTextArea placeholder="Описание"></textarea>
  `,
  imports: [ReactiveFormsModule, InputModule, TextAreaModule],
})
class PlaceholderHostComponent {
  readonly title = new FormControl('', Validators.required);
  readonly description = new FormControl('', Validators.required);
}

describe('Yurelax text field placeholders', () => {
  let fixture: ComponentFixture<PlaceholderHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [PlaceholderHostComponent]}).compileComponents();
    fixture = TestBed.createComponent(PlaceholderHostComponent);
    fixture.detectChanges();
  });

  it('preserves the copy and appends the required marker for inputs and textareas', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;

    expect(input.placeholder).toBe('Название *');
    expect(textarea.placeholder).toBe('Описание *');
  });
});

import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from "@angular/core";
import {InputEmitInterface} from "./interfaces/input-emit.interface";
import {AbstractControl} from "@angular/forms";

@Directive({
  selector: '[inputEvent]'
})
export class InputEventDirective {

  constructor(
    private el: ElementRef,
  ) {
    this.input = el;
  }

  @HostListener('keydown', ['$event'])
  onKeydownEvent(event: KeyboardEvent) {
    const input: HTMLInputElement = this.input.nativeElement;
    this.acceptable = true;
    this.code = event.code
    if (event.key === 'Delete' || event.key === 'Backspace') {
      this.output.action = null
      this.control?.setValue(null)
      this.output.id = +input.id
      this.onInput.emit(this.output)
    } else if (event.code.startsWith('Digit')) {
      this.output.action = 'next'
    } else {
      this.acceptable = false;

      if (event.key === 'ArrowLeft' || event.shiftKey && event.key === 'Tab') {
        event.preventDefault()
        this.output.action = 'back'
      } else if (event.key === 'ArrowRight' || event.key === 'Tab') {
        event.preventDefault()
        this.output.action = 'next'
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault()
      }
      this.output.id = +input.id
      this.onInput.emit(this.output)
    }
  }
  @HostListener('input', ['$event'])
  onInputEvent(event: any) {
    const input = event.target
    if (this.acceptable) {
      if (+event.data > 0 && +event.data <= 9) {
        this.control?.setValue(event.data)
      } else {
        this.control?.setValue(null)
      }
    } else {
      this.control?.setValue(null)
    }
    this.output.id = +input.id;
    this.onInput.emit(this.output)
  }

  @Input() control: AbstractControl | null = null
  @Output() onInput: EventEmitter<InputEmitInterface> = new EventEmitter<InputEmitInterface>()

  public output: InputEmitInterface = {} as InputEmitInterface;
  public acceptable: boolean = true;
  public code: string = '';
  public input!: ElementRef;
}

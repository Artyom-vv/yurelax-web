import {Directive, ElementRef, EventEmitter, HostListener, Output} from "@angular/core";
import {InputEmitInterface} from "./interfaces/input-emit.interface";

@Directive({
  selector: '[inputEvent]'
})
export class InputEventDirective {

  constructor(el: ElementRef) {
    this.input = el;
  }

  @HostListener('keydown', ['$event'])
  onKeydownEvent(event: KeyboardEvent) {
    const input: HTMLInputElement = this.input.nativeElement;
    this.acceptable = true;
    this.code = event.code
    console.log(event)
    if (event.key === 'Delete') {
      this.output = {
        action: null,
        id: 0
      };
      input.value = ''
      if (!input.value) {
        this.output.id = +input.id
        this.onInput.emit(this.output)
      }
    } else if (event.key === 'Backspace') {
      this.output = {
        action: 'back',
        id: 0
      }
      if (!input.value) {
        this.output.id = +input.id
        this.onInput.emit(this.output)
      }
    } else if (event.code.startsWith('Digit')) {
      this.output = {
        action: 'next',
        id: 0
      }
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
        input.value = event.data
      } else {
        input.value = ''
      }
    } else {
      input.value = ''
    }
    this.output.id = +input.id;
    this.onInput.emit(this.output)
  }
  @Output() onInput: EventEmitter<InputEmitInterface> = new EventEmitter<InputEmitInterface>()

  public output: InputEmitInterface = {} as InputEmitInterface;
  public acceptable: boolean = true;
  public code: string = '';
  public input!: ElementRef;
}

import {Directive, HostBinding, HostListener, Input} from "@angular/core";

@Directive({
  selector: '[yrxPasswordHider]',
  host: {
    '[class.cursor-pointer]': 'true'
  }
})
export class PasswordHiderDirective {
  @Input() yrxPasswordHider?: HTMLInputElement[];
  @HostListener('click') onClick() {
    if (Array.isArray(this.yrxPasswordHider)) {
      this.yrxPasswordHider.forEach(input => {
        input.type = input.type === 'password' ? 'text' : 'password';
      })
    }
  }
}

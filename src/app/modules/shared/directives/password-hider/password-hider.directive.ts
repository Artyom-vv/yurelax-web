import {Directive, HostListener, Input} from "@angular/core";

@Directive({
  selector: '[passwordHider]',
})
export class PasswordHiderDirective {
  @Input() deps?: HTMLInputElement[];
  @HostListener('click') onClick() {
    if (Array.isArray(this.deps)) {
      this.deps.forEach(dep => {
        dep.type = dep.type === 'password' ? 'text' : 'password';
      })
    }
  }
}

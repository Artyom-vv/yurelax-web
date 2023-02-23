import {Directive, HostListener, Input} from "@angular/core";

@Directive({
  selector: '[passwordHider]',
})
export class PasswordHiderDirective {
  @Input() ref!: HTMLInputElement;
  @Input() deps?: HTMLInputElement[];
  @HostListener('click') onClick() {
    this.ref.type = this.ref.type === 'password' ? 'text' : 'password'
    if (Array.isArray(this.deps)) {
      this.deps.forEach(dep => {
        dep.type = this.ref.type;
      })
    }
  }
}

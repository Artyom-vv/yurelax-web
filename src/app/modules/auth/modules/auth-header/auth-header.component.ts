import {Component, Input} from '@angular/core';

@Component({
    selector: 'yrx-auth-header',
    templateUrl: './auth-header.component.html',
    styleUrls: ['./auth-header.component.scss'],
    standalone: false
})
export class AuthHeaderComponent {
  @Input() page: 'login' | 'register' | 'email-code' | 'recover-password' | null = null
}

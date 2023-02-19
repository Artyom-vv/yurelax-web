import {Component, Input} from '@angular/core';

@Component({
  selector: 'yrx-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss']
})
export class AuthHeaderComponent {
  @Input() page: 'login' | 'register' | 'email-verify' | 'recover-password' | null = null
}

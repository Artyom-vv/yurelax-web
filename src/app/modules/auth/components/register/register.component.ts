import {ChangeDetectorRef, Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {LOGIN_VALIDATION_PATTERN, MIN_PASSWORD_LENGTH, PASSWORD_VALIDATION_PATTERN} from "../../auth.constants";

@Component({
  selector: 'yrx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
  }

  private subscriptions: Subscription[] = []

  public form!: FormGroup;
  public dataLoading: boolean = false;

  ngOnInit() {
    this.dataFields()
    this.initForms()
    this.watchForms()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  public register(): void {
    this.dataLoading = true;
    this.subscriptions.push(
      this.authService.register(this.form.getRawValue()).pipe(
        tap((response) => {
          console.log(response)
          this.dataLoading = false;
        }),
        catchError(err => {
          this.dataLoading = false
          this.cdr.detectChanges()
          throw new Error(err);
        })
      ).subscribe()
    )
  }

  private initForms(): void {
    this.form = this.fb.group({
      login: ["", [Validators.required, Validators.pattern(LOGIN_VALIDATION_PATTERN)]],
      email: ["", [Validators.required, Validators.email]],
      userInvitedId: [null],
      password: ["", [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH), Validators.pattern(PASSWORD_VALIDATION_PATTERN)]],
      passwordRepeat: ["", [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH), Validators.pattern(PASSWORD_VALIDATION_PATTERN)]],

    })
  }

  private dataFields(): void {

  }

  private watchForms(): void {

  }

}

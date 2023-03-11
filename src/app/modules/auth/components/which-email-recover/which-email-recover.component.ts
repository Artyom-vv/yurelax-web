import {ChangeDetectorRef, Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthStore} from "../../store/auth.store";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";

@Component({
  selector: 'yrx-which-email-recover',
  templateUrl: './which-email-recover.component.html',
  styleUrls: ['./which-email-recover.component.scss']
})
export class WhichEmailRecoverComponent {

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authStore: AuthStore,
    private _snackBar: MatSnackBar
  ) {
  }

  private subscriptions: Subscription[] = []

  public form!: FormGroup;
  public dataLoading: boolean = false;

  ngOnInit() {
    this.dataFields()
    this.initForms()
    this.watchForms()
    this.cdr.detectChanges()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  public send(): void {

  }

  private initForms(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    })
  }

  private dataFields(): void {

  }

  private watchForms(): void {

  }
}

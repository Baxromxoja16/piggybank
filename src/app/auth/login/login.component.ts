import { Component, OnDestroy } from '@angular/core';
import { UpDirective } from '../directives/up.directive';
import { PasswordToggleDirective } from '../directives/password-toggle.directive';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService, UserLogin } from '../services/login.service';
import { Router } from '@angular/router';
import { Subscription, map, startWith, switchMap, timer } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [UpDirective, PasswordToggleDirective, ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  subscription: Subscription = new Subscription();
  createForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  isLoading = false;

  error: string | number = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    if (this.createForm.valid) {
      const enteredCredentials: UserLogin = this.createForm.value;

      this.isLoading = true;

      const loginSubscription = this.loginService
        .login(enteredCredentials)
        .subscribe(() => {
          this.isLoading = false;

          this.router.navigate(['/main']);
        },
        err => {
          this.isLoading = false;
        });

      this.subscription.add(loginSubscription);
    }
    const errorSubscription = this.loginService.errorMessage$
      .pipe(switchMap((e) => timer(4000).pipe(startWith(e))))
      .subscribe((err) => (this.error = err));

    this.subscription.add(errorSubscription);
  }

  close() {
    this.loginService.errorMessage$.next('');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

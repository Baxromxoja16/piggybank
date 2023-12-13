import { Component } from '@angular/core';
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [UpDirective, PasswordToggleDirective, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  createForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  error: string = ''

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    if (this.createForm.valid) {
      const enteredCredentials: UserLogin = this.createForm.value;

      this.loginService.login(enteredCredentials).subscribe((token) => {
        const matchingCredentials = token.find(
          (cred) =>
            cred.email === enteredCredentials.email &&
            cred.password === enteredCredentials.password
        );

        if (matchingCredentials) {
          sessionStorage.setItem('tokenUser', JSON.stringify(token));
          this.router.navigate(['/main'])
        } else {
          this.error = ('Incorrect email or password');
          setTimeout(() => {
            this.error = ''
          }, 4000);
          // Handle incorrect credentials, e.g., show an error message
        }
      });
    }
  }

  close() {
    this.error = ''
  }
}

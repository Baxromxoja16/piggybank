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

  constructor(private loginService: LoginService) {}

  onSubmit() {
    if (this.createForm.valid) {
      const enteredCredentials: UserLogin = this.createForm.value;

      this.loginService.login(enteredCredentials).subscribe((testCredentials) => {
        const matchingCredentials = testCredentials.find(
          (cred) =>
            cred.email === enteredCredentials.email &&
            cred.password === enteredCredentials.password
        );

        if (matchingCredentials) {
          console.log('Login successful');
          // Call your further logic for successful login
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

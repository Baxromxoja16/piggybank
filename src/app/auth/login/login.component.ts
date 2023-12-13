import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UpDirective } from '../directives/up.directive';
import { PasswordToggleDirective } from '../directives/password-toggle.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [UpDirective, PasswordToggleDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}

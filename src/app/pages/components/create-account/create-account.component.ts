import { Component } from '@angular/core';
import { UpDirective } from '../../../auth/directives/up.directive';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [UpDirective, ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent {
  lettersReg = new RegExp('[A-Za-z]');
  numberReg = new RegExp('^[0-9.,0-9]');
  currencies = [
    { name: 'USD', symbol: '$' },
    { name: 'EUR', symbol: '€' },
    { name: 'GBP', symbol: '£' },
    { name: 'JPY', symbol: '¥' },
    { name: 'UZS', symbol: 'S' },
    { name: 'RUB', symbol: '₽' },
  ];
  selected = { name: 'USD', symbol: '$' };

  createForm: FormGroup = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.pattern(this.lettersReg),
    ]),
    currency: new FormControl({
      name: new FormControl(''),
      symbol: new FormControl(''),
    }),
    description: new FormControl(null, [Validators.maxLength(256)]),
    balance: new FormControl(null, [
      Validators.required,
      Validators.pattern(this.numberReg),
    ]),
  });

  constructor(private accountService: AccountService) {}

  onSubmit() {
    this.accountService.addAccount(this.createForm.value);
  }
}

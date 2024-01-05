import { Component, OnDestroy } from '@angular/core';
import { UpDirective } from '../../../auth/directives/up.directive';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account, AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [UpDirective, ReactiveFormsModule, MatButtonModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent implements OnDestroy {
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

  subscription: Subscription = new Subscription()

  createForm: FormGroup = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.pattern(this.lettersReg),
    ]),
    currency: new FormControl(''),
    description: new FormControl(null, [Validators.maxLength(256)]),
    balance: new FormControl(null, [
      Validators.required,
      Validators.pattern(this.numberReg),
    ]),
  });

  constructor(private accountService: AccountService, private router: Router, private snackBar: MatSnackBar) {}

  close() {
    this.router.navigate(['/main']);
  }

  onSubmit() {
    const addAccount = this.accountService.addAccount(this.createForm.value).subscribe(
      (account: Account) => {
        this.snackBar.open(`Card ${account.title} successful created`, 'close', {
          duration: 4000,
        });
        this.createForm.reset()
        this.router.navigate(['/main']);
      },
      error => {
        this.snackBar.open(` ${error.error.message}`, 'close', {
          duration: 4000,
        });
      }
    );

    this.subscription.add(addAccount);    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

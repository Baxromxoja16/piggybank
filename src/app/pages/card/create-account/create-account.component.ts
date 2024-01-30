import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [UpDirective, ReactiveFormsModule, MatButtonModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent implements OnInit, OnDestroy {
  lettersReg = new RegExp('[A-Za-z]');
  numberReg = new RegExp('^[0-9.,0-9]');
  currencies!: any;
  selected = { name: 'USD', symbol: '$' };

  subscription: Subscription = new Subscription();

  editMode = false;

  createForm!: FormGroup;

  editAccount: Account[] = [];

  id: string = '';

  constructor(
    private accountService: AccountService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;

    if (this.id) {
      this.editMode = true;
      this.accountService.getAccount(this.id).subscribe(
        (account) => {
          this.editAccount.push(account)
          this.formInit();
        }
      )
    }

    this.accountService.getCurrencies().subscribe((currencies) => {
      this.currencies = currencies;
    })

    this.formInit()
  }

  close() {
    this.router.navigate(['/main']);
  }

  onSubmit() {
    let addAccount;
    if (this.editMode) {
      addAccount = this.accountService.editAccount(this.id, this.createForm.value).subscribe(
        (account) => {
          this.snackBarMessage(`Card ${(account as Account).title} successful edited`);
          this.createForm.reset()
          this.router.navigate(['/main']);
        }
      );
    } else {
      addAccount = this.accountService.addAccount(this.createForm.value).subscribe(
        (account: Account) => {
          this.snackBarMessage(`Card ${account.title} successful created`)
          this.createForm.reset()
          this.router.navigate(['/main']);
        },
        error => {
          this.snackBarMessage(error.error.message);
        }
      );
    }

    this.subscription.add(addAccount);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  private snackBarMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
    });
  }

  private formInit() {
    let title = '';
    let currency = '';
    let description = '';
    let balance = null;

    if (this.editMode) {
      title = this.editAccount[0]?.title;
      currency = this.editAccount[0]?.currency;
      description = this.editAccount[0]?.description;
      balance = this.editAccount[0]?.balance;
    }

    this.createForm = new FormGroup({
      title: new FormControl(title, [
        Validators.required,
        Validators.pattern(this.lettersReg),
      ]),
      currency: new FormControl(currency),
      description: new FormControl(description, [Validators.maxLength(256)]),
      balance: new FormControl(balance, [
        Validators.required,
        Validators.pattern(this.numberReg),
      ]),
    });

  }


}

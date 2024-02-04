import { Component, DoCheck, computed, OnDestroy, OnInit, signal, WritableSignal, Signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { Account, AccountService } from '../services/account.service';
import { finalize, interval, Subscription, takeWhile } from 'rxjs';
import { ITransaction } from './transaction.model';
import { CommonModule } from '@angular/common';
import { SearchFieldComponent } from '../../shared/components/search-field/search-field.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, SearchFieldComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  transactions: WritableSignal<ITransaction[]> = this.transactionService.transactions

  unfiltered: WritableSignal<ITransaction[]> = this.transactionService.unfiltered

  account: WritableSignal<Account> = this.accountService.switchAccountSig
  oldAccount: WritableSignal<Account> = this.accountService.oldAccountSig

  loading = false;

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkAccount()
  }

  private checkAccount() {
    this.loading = true;

    const interval$ = interval(300).pipe(
      takeWhile(() => !this.account()._id),
      finalize(() => this.loading = false)
    );

    const transactionSubs = this.transactionService.getTransactions().subscribe();
    this.subscription.add(transactionSubs);

    this.subscription.add(interval$.subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSorted(type: string) {
    if (type === 'income') {
      this.transactions.set(this.unfiltered().filter((trans) => trans.type === 'income'));
    } else {
      this.transactions.set(this.unfiltered().filter((trans) => trans.type === 'expense'));
    }
  }

  defaultSort() {
    this.transactions.set(this.unfiltered());
  }

  toInfo(transaction: ITransaction) {
    this.router.navigate(["/main/transaction-info/", transaction._id])
  }

}

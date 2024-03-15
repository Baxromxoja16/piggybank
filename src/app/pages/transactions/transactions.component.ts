import { Component, OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { Account, AccountService } from '../services/account.service';
import { Subscription } from 'rxjs';
import { ITransaction } from './transaction.model';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  transactions: WritableSignal<ITransaction[]> = this.transactionService.transactions

  unfiltered: WritableSignal<ITransaction[]> = this.transactionService.unfiltered

  account: WritableSignal<Account> = this.accountService.switchAccountSig
  oldAccount: WritableSignal<Account> = this.accountService.oldAccountSig

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkAccount()
  }

  private checkAccount() {
    if (this.account()._id) {
      const transactionSubs = this.transactionService.getTransactions().subscribe();
      this.subscription.add(transactionSubs);
    } else {
      setTimeout(() => {
        this.checkAccount()
      }, 0);
    }
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

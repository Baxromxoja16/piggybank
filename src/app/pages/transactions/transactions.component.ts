import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionCreateComponent } from './transaction-create/transaction-create.component';
import { RouterOutlet } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { Account, AccountService } from '../services/account.service';
import { Subscription } from 'rxjs';
import { ITransaction } from './transaction.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  transactions: ITransaction[] = []

  unfiltered: ITransaction[] = [];

  account!: Account;

  constructor(private transactionService: TransactionService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.getActiveAccountID()
    setTimeout(() => {
      this.transactionService.getTransactions().subscribe((transactions: ITransaction[]) => {
        this.transactions = transactions
        this.account = this.transactionService.account
        this.unfiltered = this.transactions
      })
    }, 500);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSorted(type: string) {
    if (type === 'income') {
      this.transactions = this.unfiltered.filter((trans) => trans.type === 'income');
    } else {
      this.transactions = this.unfiltered.filter((trans) => trans.type === 'expense');
    }
  }

  defaultSort() {
    this.transactions = this.unfiltered;
  }

  private getActiveAccountID() {
    const getAccounts = this.accountService.getAccounts().subscribe()

    const activeAccount = this.accountService.switchAccount.subscribe(activeAccount => {
      this.transactionService.account$.next(activeAccount)
    })

    this.subscription.add(getAccounts)
    this.subscription.add(activeAccount);
  }
}

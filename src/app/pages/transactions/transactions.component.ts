import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionCreateComponent } from './transaction-create/transaction-create.component';
import { RouterOutlet } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { AccountService } from '../services/account.service';
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

  constructor(private transactionService: TransactionService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.getActiveAccountID()
    setTimeout(() => {
      this.transactionService.getTransactions().subscribe((transactions: ITransaction[]) => {
        this.transactions = transactions
      })
    }, 500);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  private getActiveAccountID() {
    const getAccounts = this.accountService.getAccounts().subscribe()

    const activeAccount = this.accountService.switchAccount.subscribe(activeAccount => {
      this.transactionService.accountId$.next(activeAccount)
    })

    this.subscription.add(getAccounts)
    this.subscription.add(activeAccount);
  }
}

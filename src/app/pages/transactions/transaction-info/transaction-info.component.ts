import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { ITransaction } from '../transaction.model';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule, DatePipe } from '@angular/common';
import { Account } from '../../services/account.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-transaction-info',
  standalone: true,
  imports: [MatIconModule, RouterModule, MatProgressSpinnerModule, DatePipe, CommonModule, MatButtonModule],
  templateUrl: './transaction-info.component.html',
  styleUrl: './transaction-info.component.scss'
})
export class TransactionInfoComponent implements OnInit, OnDestroy{
  id: string = '';

  transaction!: ITransaction;

  subscription = new Subscription()

  account!: Account;

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      const getTransaction = this.transactionService.getTransaction(this.id).subscribe((transaction) => {
        this.transaction = transaction;
      })

      this.subscription.add(getTransaction);
    }
    this.account = this.transactionService.account

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

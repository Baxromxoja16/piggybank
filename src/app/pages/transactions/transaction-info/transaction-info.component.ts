import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { ITransaction } from '../transaction.model';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule, DatePipe } from '@angular/common';
import { Account, AccountService } from '../../services/account.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transaction-info',
  standalone: true,
  imports: [
    MatIconModule,
    RouterModule,
    MatProgressSpinnerModule,
    DatePipe,
    CommonModule,
    MatButtonModule],
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
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      const getTransaction = this.transactionService.getTransaction(this.id).subscribe((transaction) => {
        this.transaction = transaction;
      })

      this.subscription.add(getTransaction);
    }
    this.account = this.accountService.switchAccountSig();

  }

  deleteTransaction(transaction: ITransaction) {
    const deleteTra = this.transactionService.deleteTransaction(transaction._id as string).subscribe((transaction) => {
      this.router.navigate(['/main']);
    });

    this.subscription.add(deleteTra);
  }

  editTransaction() {
    const message = 'This function in progress, it will be implemented soon'
    this.snackBar.open(message, 'Close', {
      duration: 4000,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

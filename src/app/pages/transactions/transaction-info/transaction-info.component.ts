import { Component, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
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
import { DialogTransaction } from './dialog-transaction';
import { MatDialog } from '@angular/material/dialog';

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

  account: WritableSignal<Account> = this.accountService.switchAccountSig;

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      const getTransaction = this.transactionService.getTransaction(this.id).subscribe((transaction) => {
        this.transaction = transaction;
      })

      this.subscription.add(getTransaction);
    }
  }

  deleteTransaction(transaction: ITransaction) {
    const dialogRef = this.dialog.open(DialogTransaction);

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const deleteTra = this.transactionService.deleteTransaction(transaction._id as string).subscribe((transaction) => {
          const message = 'Transaction deleted!'
          this.openSnackBar(message, 'success');
          this.router.navigate(['/main']);
        },
        (err) => {
          this.openSnackBar(err.error.message, 'warn')
        });
        this.subscription.add(deleteTra);
      }
    })

  }

  editTransaction() {
    const message = 'This function in progress, it will be implemented soon'
    this.openSnackBar(message, 'success')
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private openSnackBar(message: string, type: string) {
    this.snackBar.open(message, 'close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type === 'success' ? '' : "snack-error"
    })
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Account, AccountService } from '../../services/account.service';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from './dialog-animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-account-info',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    SharedModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.scss',
})
export class AccountInfoComponent implements OnInit, OnDestroy {
  id: string = '';
  subscription: Subscription = new Subscription();
  progress: string = '';
  account: Account | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;

    const getAccount = this.accountService
      .getAccount(this.id)
      .subscribe((data) => {
        typeof data !== 'string'
          ? (this.progress = 'stop')
          : (this.progress = 'start');
        this.account = data;
      });
    this.subscription.add(getAccount);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete(id?: string) {
    if (id) {
      const dialogRef = this.dialog.open(DialogAnimationsExampleDialog);

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const deletedAccount = this.accountService
            .deleteAccount(this.id)
            .subscribe(() => {
              this.router.navigate(['/main']);
              this.snackBar.open(`Card deleted`, 'close', {
                duration: 4000,
              });
            });

          this.subscription.add(deletedAccount);
        }
      });
    }
  }
}

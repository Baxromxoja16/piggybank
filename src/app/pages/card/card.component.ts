import { Component, HostListener, OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { CreateAccountComponent } from './create-account/create-account.component';

import { Router } from '@angular/router';
import { Subscription, take, takeLast } from 'rxjs';
import { Account, AccountService } from '../services/account.service';
import { TransactionService } from '../services/transaction.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CreateAccountComponent, SharedModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit, OnDestroy {
  open: boolean = false;
  accounts: WritableSignal<Account[]> = this.accountService.accounts;
  subscription: Subscription = new Subscription();
  switchAccount: WritableSignal<Account> = this.accountService.switchAccountSig;
  isLoading = false;

  constructor(private accountService: AccountService, private router: Router, private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.isLoading = true;
    const getAccount = this.accountService
      .getAccounts()
      .subscribe((data: Account[]) => {
        this.isLoading = false;
        this.accounts.set(data)
        this.switchAccount = this.accountService.switchAccountSig
      },
      err => {
        this.isLoading = false;
      });

    this.subscription.add(getAccount);
  }

  @HostListener('click', ['$event.target'])
  clickedOut(target: HTMLElement) {
    if (
      target.className === 'close' ||
      target.className === 'black-bg' ||
      target.className.includes('btn-cancel')
    ) {
      this.closeCreateAccountPopup();
    }
  }

  onSwitchAccount(account: Account) {
    this.accountService.oldAccountSig.set(this.accountService.switchAccountSig());
    this.accountService.switchAccountSig.set(account);
    this.transactionService.getTransactions().subscribe();
  }

  closeCreateAccountPopup() {
    this.open = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

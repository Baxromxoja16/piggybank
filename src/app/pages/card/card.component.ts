import { Component, HostListener, OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { CreateAccountComponent } from './create-account/create-account.component';

import { Router, RouterModule } from '@angular/router';
import { Subscription, take, takeLast } from 'rxjs';
import { Account, AccountService } from '../services/account.service';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CreateAccountComponent, RouterModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit, OnDestroy {
  open: boolean = false;
  accounts: Account[] = [];
  subscription: Subscription = new Subscription();
  switchAccount: WritableSignal<Account> = this.accountService.switchAccountSig;

  constructor(private accountService: AccountService, private router: Router, private transactionService: TransactionService) {}

  ngOnInit(): void {
    const getAccount = this.accountService
      .getAccounts()
      .subscribe((data: Account[]) => {
        this.accounts = data;
        this.switchAccount = this.accountService.switchAccountSig
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
    this.accountService.switchAccountSig.set(account);
    localStorage.setItem('account', JSON.stringify(this.accountService.switchAccountSig()));
    this.transactionService.getTransactions().subscribe();
  }

  closeCreateAccountPopup() {
    this.open = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

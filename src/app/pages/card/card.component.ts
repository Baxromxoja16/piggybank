import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CreateAccountComponent } from './create-account/create-account.component';

import { Router, RouterModule } from '@angular/router';
import { Subscription, take, takeLast } from 'rxjs';
import { Account, AccountService } from '../services/account.service';
import { CommonModule } from '@angular/common';

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
  switchAccount!: Account;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.subscription.add(
      this.accountService.accountsChanged
        .subscribe((accounts) => {
          this.accounts = accounts;
        })
    );

    const getAccount = this.accountService
      .getAccounts()
      .subscribe((data: Account[]) => {
        this.accounts = data;
      });

    const switchAccount = this.accountService.switchAccount
    .subscribe((account) => {
      this.switchAccount = account
    })

    this.subscription.add(switchAccount);
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
    this.accountService.switchAccount.next(account);
  }

  closeCreateAccountPopup() {
    this.open = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

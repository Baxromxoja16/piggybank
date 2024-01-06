import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CreateAccountComponent } from './create-account/create-account.component';

import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Account, AccountService } from '../services/account.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CreateAccountComponent, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit, OnDestroy {
  open: boolean = false;
  accounts: Account[] = [];
  subscription: Subscription = new Subscription();

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

  closeCreateAccountPopup() {
    this.open = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CreateAccountComponent } from '../../../pages/components/create-account/create-account.component';
import {
  Account,
  AccountService,
} from '../../../pages/services/account.service';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

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
          console.log(accounts);
          
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

  openCreateAccountPopup() {
    // this.open = true;
    this.router.navigate(['/main/create-account']);
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

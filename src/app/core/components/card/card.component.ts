import { Component, HostListener, OnInit } from '@angular/core';
import { CreateAccountComponent } from '../../../pages/components/create-account/create-account.component';
import { Account, AccountService } from '../../../pages/services/account.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CreateAccountComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit{
  open: boolean = false;
  accounts: Account[] = []; 

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(data => {
      this.accounts = data;
    })
  }

  openCreateAccountPopup() {
    this.open = true;
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
}

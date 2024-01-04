import { Component, HostListener, OnInit } from '@angular/core';
import { CreateAccountComponent } from '../../../pages/components/create-account/create-account.component';
import { Account, AccountService } from '../../../pages/services/account.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CreateAccountComponent, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit{
  open: boolean = false;
  accounts: Account[] = []; 

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((data: Account[]) => {
      this.accounts = data;
    })
  }

  openCreateAccountPopup() {
    // this.open = true;
    this.router.navigate(["/main/create-account"])
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

  // showDetails(id: string) {
  //   this.router.navigate(['/main/account-info/' + id])
  // }
}

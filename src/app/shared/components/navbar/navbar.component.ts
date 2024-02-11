import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../../pages/services/account.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  account = this.accountService.switchAccountSig;

  constructor(private accountService: AccountService) {}
}

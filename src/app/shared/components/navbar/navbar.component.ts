import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../../pages/services/account.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  account = this.accountService.switchAccountSig;

  constructor(private accountService: AccountService, private router: Router, private snackBar: MatSnackBar) {}

  toStatistic() {
    this.account()._id ?
    this.router.navigate(['/statistic/', this.account()._id]) :
    this.snackBar.open('Please choose account', 'close', {panelClass: 'snack-error'})
  }
}

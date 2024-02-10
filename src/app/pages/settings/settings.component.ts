import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  account = this.accountService.switchAccountSig;

  constructor(private accountService: AccountService) {}

}

import { Component } from '@angular/core';
import { TransactionsComponent } from '../transactions/transactions.component';
import { SettingsComponent } from '../settings/settings.component';
import { CardComponent } from '../card/card.component';
import { AccountInfoComponent } from '../card/account-info/account-info.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CardComponent, TransactionsComponent, SettingsComponent, AccountInfoComponent, RouterOutlet, NavbarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}

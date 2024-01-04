import { Component } from '@angular/core';
import { TransactionsComponent } from '../../core/components/transactions/transactions.component';
import { SettingsComponent } from '../../core/components/settings/settings.component';
import { CardComponent } from '../../core/components/card/card.component';
import { AccountInfoComponent } from '../components/account-info/account-info.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CardComponent, TransactionsComponent, SettingsComponent, AccountInfoComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}

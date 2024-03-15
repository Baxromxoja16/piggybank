import { Component } from '@angular/core';
import { TransactionsComponent } from '../transactions/transactions.component';
import { SettingsComponent } from '../settings/settings.component';
import { CardComponent } from '../card/card.component';
import { AccountInfoComponent } from '../card/account-info/account-info.component';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CardComponent, TransactionsComponent, SettingsComponent, AccountInfoComponent, SharedModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}

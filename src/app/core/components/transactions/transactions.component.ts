import { Component } from '@angular/core';
import { CreateAccountComponent } from '../../../pages/components/create-account/create-account.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CreateAccountComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {

}

import { Component } from '@angular/core';
import { TransactionCreateComponent } from './transaction-create/transaction-create.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {

}

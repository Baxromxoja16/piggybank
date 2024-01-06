import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-transaction-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './transaction-create.component.html',
  styleUrl: './transaction-create.component.scss',
})
export class TransactionCreateComponent {
  toppings = new FormControl('');
  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];
  startDate = new Date(1990, 0, 1);

}

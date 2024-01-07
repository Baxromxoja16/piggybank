import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-transaction-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
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
export class TransactionCreateComponent implements OnInit{
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

  ngOnInit(): void {
  }

  transactionForm: FormGroup = new FormGroup({
    type: new FormControl<string>('', Validators.required),
    title: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(128),
      this.noDotsAtEndValidator,
    ]),
    category: new FormControl('', Validators.required),
    description: new FormControl<string>('', Validators.max(256)),
    amount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.pattern(/[0-9]/),
      Validators.pattern(/^\d+(\.\d{1,2})?$/),
      this.singleDotValidator,
    ]),
    date: new FormControl('', [Validators.required, this.dateValidation]),
  });


  private dateValidation(control: AbstractControl) {
    const value = control.value;
    const chosenDate = new Date(value);
    const dateNow = new Date();

    if (dateNow.getTime() < chosenDate.getTime()) {
      return { isValid: true }
    }

    return null;
  } 

  private noDotsAtEndValidator(control: AbstractControl) {
    const value = control.value;

    // Check if the last character is a dot
    if (value && value.trim().endsWith('.')) {
      return { noDotsAtEnd: true };
    }

    return null; // Validation passed
  }

  private singleDotValidator(control: AbstractControl) {
    const value = control.value;
    const dotCount = value ? value.split('.').length - 1 : 0;

    if (dotCount > 1) {
      return { singleDot: true };
    }

    return null; // Validation passed
  }
}

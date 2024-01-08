import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Router, RouterModule } from '@angular/router';
import { Account, AccountService } from '../../services/account.service';
import { Subscription } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogCancel } from './dialog-cencel.component';

export interface IsError {
  message: string
  isError: boolean
}

export interface ITransaction {
  type: string
  title: string
  category: string[]
  description: string
  amount:number
  date:Date
  accountId:string
}

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
export class TransactionCreateComponent implements OnInit, OnDestroy {
  toppings = new FormControl('', Validators.required);
  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];
  startDate = new Date(1990, 0, 1);

  subscription = new Subscription();


  submitted = false;

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.getActiveAccountID();    
  }

  transactionForm: FormGroup = new FormGroup({
    type: new FormControl<string>('', Validators.required),
    title: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(128),
      this.noDotsAtEndValidator,
    ]),
    category: new FormControl(this.toppings.value, Validators.required),
    description: new FormControl<string>('', Validators.max(256)),
    amount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.pattern(/[0-9]/),
      Validators.pattern(/^\d+(\.\d{0,2})?$/)
    ]),
    date: new FormControl('', [Validators.required, this.dateValidation]),
    accountId: new FormControl('', Validators.required)
  });


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      this.transactionService.createTransaction(this.transactionForm.value).subscribe((data) => {
        this.snackBar.open(`${data.type} transaction has been successfully added!`, 'Close', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.transactionForm.reset()
      })
    }
  }

  onCancel() {
    const dialogRef = this.dialog.open(DialogCancel, {
      panelClass: ['warn']
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.transactionForm.reset();
      }
    })
  }

  protected typeValidation(): IsError {
    const formControl = this.transactionForm.get('type');
    
    if (formControl?.errors?.['required'] && formControl?.touched) {
      return {message: `Transaction type is required field`, isError: true};
    }
    return {message: '', isError: false};
  }
  protected titleValidation(): IsError {
    const formControl = this.transactionForm.get('title');
    const maxLength = formControl?.errors?.['maxlength'];

    if (formControl?.errors?.['required'] && formControl?.touched) {
      return {message: `Title is required field`, isError: true};
    } 
    else if (maxLength?.actualLength > maxLength?.requiredLength && formControl?.touched) {
      return {message: `The maximum length should be ${maxLength?.requiredLength}, actualy length ${maxLength?.actualLength}`, isError: true};
    }
    return {message: '', isError: false};
  }
  protected categoryValidation(): IsError {
    const formControl = this.transactionForm.get('category');
    formControl?.setValue(this.toppings.value)
    
    if (formControl?.errors?.['required'] && this.toppings?.touched) {
      return {message: `Category is required field`, isError: true};
    }
    return {message: '', isError: false};
  }
  protected amountValidation(): IsError {
    const formControl = this.transactionForm.get('amount');
    
    if (formControl?.errors?.['required'] && formControl?.touched) {
      return {message: `Amount is required field`, isError: true};
    } else if (formControl?.errors?.['pattern']?.requiredPattern && formControl.touched) {
      return {message: `After dot (.) you should engter only two numbers!`, isError: true};
    } else if (formControl?.errors?.['min'] && formControl.touched) {
      return {message: `You should enter a positive amount!`, isError: true};
    }
    return {message: '', isError: false};
  }

  private getActiveAccountID() {
    const getAccounts = this.accountService.getAccounts().subscribe()

    const activeAccount = this.accountService.switchAccount.subscribe(activeAccount => {
      this.transactionService.accountId$.next(activeAccount)
      this.transactionForm.get('accountId')?.setValue(activeAccount._id)
    })

    this.subscription.add(getAccounts)
    this.subscription.add(activeAccount);
  }

  protected dateValidationForHTML(): IsError {
    const formControl = this.transactionForm.get('date');

    if (formControl?.errors?.['required'] && formControl?.touched || this.submitted) {
      return {message: `Date is required field`, isError: true};
    } else if (formControl?.errors?.['isValid'] && formControl.touched) {
      return {message: `You can not enter future date`, isError: true};
    }
    return {message: '', isError: false};
  }

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
}

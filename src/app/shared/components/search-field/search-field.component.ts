import { Component, Input, OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService, ICategory } from '../../../pages/services/category.service';
import { TransactionService } from '../../../pages/services/transaction.service';
import { ITransaction } from '../../../pages/transactions/transaction.model';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss'
})
export class SearchFieldComponent implements OnInit, OnDestroy {
  @Input() dataCategoryOrTransaction!: WritableSignal<ICategory[] | ITransaction[]>;

  subscription: Subscription = new Subscription();

  createForm: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private categoryService: CategoryService,) {}

  ngOnInit(): void {
    if (this.router.url === '/categories') {
      this.getChangedValue<ICategory>(this.categoryService.categories)
    } else if(this.router.url === '/transaction-info') {
      this.getChangedValue<ITransaction>(this.transactionService.transactions)
    }

  }

  private getChangedValue<T>(signals: WritableSignal<T[]>) {
    const valueChanges = this.createForm.valueChanges.subscribe((data) => {
      const searchPattern = new RegExp(data.search.trim(), 'i');
      const filtered = signals().filter(
        (item: any) => searchPattern.test(item.title)
      );
      console.log(filtered);
    })

    this.subscription.add(valueChanges);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

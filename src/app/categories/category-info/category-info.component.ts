import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, WritableSignal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { CategoryService, ICategory } from '../../pages/services/category.service';
import { SearchFieldComponent } from '../../shared/components/search-field/search-field.component';

@Component({
  selector: 'app-category-info',
  standalone: true,
  imports: [
    SearchFieldComponent,
    MatProgressSpinnerModule,
    RouterLink,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './category-info.component.html',
  styleUrl: './category-info.component.scss'
})
export class CategoryInfoComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  categories: WritableSignal<ICategory[]> = this.categoryService.categories

  editCategoryId!: string;

  reg = new RegExp(/[a-zA-Z]/gi);
  createForm: FormGroup = new FormGroup({
    type: new FormControl('income' || 'expense'),
    title: new FormControl('', [Validators.required, Validators.pattern(this.reg)])
  })

  constructor(private categoryService: CategoryService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    const getCategories = this.categoryService.getCategories().subscribe();
    this.subscription.add(getCategories);
  }

  deleteCategory(id: string) {
    const deleteCategory = this.categoryService.deleteCategory(id).subscribe(
      () => {
        const message = 'Category deleted!'
        this.snackBar.open(message, 'Close', {
          duration: 4000,
        });
      }
    );
    this.subscription.add(deleteCategory);
  }

  editCategory(category: ICategory) {
    this.createForm.get('type')?.setValue(category.type);
    this.createForm.get('title')?.setValue(category.title);

    if (!this.editCategoryId) this.editCategoryId = category._id;
  }

  onSubmit () {
    if (this.createForm.valid) {
      const newValue = this.createForm.value;

      const editCategory = this.categoryService.updateCategory(this.editCategoryId, newValue).subscribe(
        () => {
          const message = 'Category updated!'
          this.snackBar.open(message, 'Close', {
            duration: 4000,
          });

          const newValueAddedDynamic = this.categories().filter(
            (cat) => this.editCategoryId === cat._id ? cat.title = newValue.title : cat
          );
          this.categories.set(newValueAddedDynamic);

          this.editCategoryId = '';
        }
      )
      this.subscription.add(editCategory);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

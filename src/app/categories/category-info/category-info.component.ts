import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, WritableSignal, signal } from '@angular/core';
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
  imports: [SearchFieldComponent, MatProgressSpinnerModule, RouterLink, MatIconModule, CommonModule],
  templateUrl: './category-info.component.html',
  styleUrl: './category-info.component.scss'
})
export class CategoryInfoComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  categories: WritableSignal<ICategory[]> = this.categoryService.categories

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

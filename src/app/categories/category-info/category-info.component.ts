import { Component, OnInit, OnDestroy, WritableSignal, signal } from '@angular/core';
import { Subscription } from 'rxjs';

import { CategoryService, ICategory } from '../../pages/services/category.service';
import { SearchFieldComponent } from '../../shared/components/search-field/search-field.component';

@Component({
  selector: 'app-category-info',
  standalone: true,
  imports: [SearchFieldComponent],
  templateUrl: './category-info.component.html',
  styleUrl: './category-info.component.scss'
})
export class CategoryInfoComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  categories: WritableSignal<ICategory[]> = this.categoryService.categories

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    const getCategories = this.categoryService.getCategories().subscribe();
    this.subscription.add(getCategories);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Component } from '@angular/core';
import { SearchFieldComponent } from '../../shared/components/search-field/search-field.component';

@Component({
  selector: 'app-category-info',
  standalone: true,
  imports: [SearchFieldComponent],
  templateUrl: './category-info.component.html',
  styleUrl: './category-info.component.scss'
})
export class CategoryInfoComponent {

}

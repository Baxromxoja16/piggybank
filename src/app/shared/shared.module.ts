import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RangeDateComponent } from './components/range-date/range-date.component';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RouterModule,
    RouterOutlet,
    RouterLink,
    FooterComponent,
    NavbarComponent,
    RangeDateComponent,
    SearchFieldComponent,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RouterModule,
    RouterOutlet,
    RouterLink,
    FooterComponent,
    NavbarComponent,
    RangeDateComponent,
    SearchFieldComponent,
  ]
})
export class SharedModule { }

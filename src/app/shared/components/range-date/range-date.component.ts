import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-range-date',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './range-date.component.html',
  styleUrl: './range-date.component.scss'
})
export class RangeDateComponent {
  rangeDate = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  })

  constructor() {
    this.rangeDate.valueChanges.subscribe((data) => {
      console.log(this.rangeDate.valid);
    })
  }
}

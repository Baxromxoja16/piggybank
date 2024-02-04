import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss'
})
export class SearchFieldComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  createForm: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  ngOnInit(): void {
    const valueChanges = this.createForm.valueChanges.subscribe((data) => {
      console.log(data);
    })

    this.subscription.add(valueChanges);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

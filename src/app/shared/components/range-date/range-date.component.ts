import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StatisticService } from '../../../statistic/services/statistic.service';
import { Subscription } from 'rxjs';

export interface IDate {
  start: string
  end: string
}

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
export class RangeDateComponent implements OnDestroy{
  subsciption = new Subscription
  rangeDate = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  })

  constructor(private statisticService: StatisticService) {
    const valueChange = this.rangeDate.valueChanges.subscribe((data) => {
      this.statisticService.getStatistics((data as IDate)).subscribe();
    });

    this.subsciption.add(valueChange);
  }

  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }
}

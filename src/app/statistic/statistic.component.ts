import { Component, OnInit } from '@angular/core';
import { CardComponent} from '../pages/card/card.component'
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { RangeDateComponent } from '../shared/components/range-date/range-date.component';
import { StatisticService } from './services/statistic.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../pages/services/account.service';

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [
    CardComponent,
    NavbarComponent,
    MatTabsModule,
    MatNativeDateModule,
    RangeDateComponent,
    CommonModule,
    RouterModule
  ],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})
export class StatisticComponent implements OnInit{
  statistics = this.statisticService.statistics;

  constructor(
    private statisticService: StatisticService,
    private router: Router,
    private accountService: AccountService) {}

  ngOnInit(): void {
    if (!this.accountService.switchAccountSig()._id) {
      this.router.navigate(['/main'])
    }
  }
}

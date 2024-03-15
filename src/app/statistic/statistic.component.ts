import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../pages/card/card.component'
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { StatisticService } from './services/statistic.service';
import { Router } from '@angular/router';
import { AccountService } from '../pages/services/account.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [
    CardComponent,
    SharedModule,
    MatTabsModule,
    MatNativeDateModule,
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

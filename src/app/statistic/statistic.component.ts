import { Component } from '@angular/core';
import { CardComponent} from '../pages/card/card.component'
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [CardComponent, NavbarComponent, MatTabsModule],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})
export class StatisticComponent {

}

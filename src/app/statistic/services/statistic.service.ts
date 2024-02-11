import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IStatistics } from './statistic.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  baseUrl = environment.apiUrl + 'statistic/';

  statistics: WritableSignal<IStatistics[]> = signal([] as IStatistics[])

  constructor(private http: HttpClient) { }

  getStatistics() {
    return this.http.get<IStatistics[]>(this.baseUrl).pipe(
      tap((statistics: IStatistics[]) => {
        this.statistics.set(statistics);
      })
    )
  }
}

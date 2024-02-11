import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AccountService } from '../../pages/services/account.service';
import { IStatistics } from './statistic.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  baseUrl = environment.apiUrl + 'statistic/';

  token = sessionStorage.getItem('tokenUser')!;
  headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: this.token,
  };

  statistics: WritableSignal<IStatistics[]> = signal([] as IStatistics[])

  constructor(private http: HttpClient, private accountService: AccountService) { }

  getStatistics() {
    const accountId = this.accountService.switchAccountSig()._id;
    return this.http.get<IStatistics[]>(this.baseUrl + accountId, { headers: this.headers }).pipe(
      tap((statistics: IStatistics[]) => {
        this.statistics.set(statistics);
      })
    )
  }
}

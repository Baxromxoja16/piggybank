import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, of } from 'rxjs';

export interface Account {
  title: string;
  currency: string
  description: string;
  balance: number;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'http://localhost:3000/account';
  account: Account = {
    title: 'Credit card',
    currency: 'USD',
    description: '',
    balance: 2245.42,
  };
  accounts = [this.account, this.account];
  accounts$ = of(this.accounts);

  constructor(private http: HttpClient) {}

  getAccounts() {
    return this.accounts$;
  }

  addAccount(data: Account): Observable<Account> {
    const token = sessionStorage.getItem('tokenUser')!;
    let headers = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: token,
    };

    return this.http
      .post<Account>(this.baseUrl, data, { headers: headers });
  }
}

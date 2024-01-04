import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, of } from 'rxjs';

export interface Account {
  title: string;
  currency: string
  description: string;
  balance: number;
  sign: string;
  createdAt: string;
  updatedAt: string;
  user_id:string;
  _id: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'http://localhost:3000/account';

  token = sessionStorage.getItem('tokenUser')!;
  headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: this.token,
  };

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl, {headers: this.headers});
  }

  addAccount(data: Account): Observable<Account> {


    return this.http
      .post<Account>(this.baseUrl, data, { headers: this.headers });
  }
}

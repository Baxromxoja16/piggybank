import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

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
  baseUrl = 'http://localhost:3000/account/';

  token = sessionStorage.getItem('tokenUser')!;
  headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: this.token,
  };

  private accounts: Account[] = [];

  accountsChanged: Subject<Account[]> = new Subject();

  constructor(private http: HttpClient) {}

  private updateAccounts() {
    this.accountsChanged.next([...this.accounts]);
  }

  getAccount(id: string) {
    return this.http.get<Account>(this.baseUrl + id, {headers: this.headers});
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl, {headers: this.headers}).pipe(
      tap(accounts => this.accounts = accounts)
    );
  }

  addAccount(data: Account): Observable<Account> {
    return this.http
      .post<Account>(this.baseUrl, data, { headers: this.headers }).pipe(
        tap((account) => {
          this.accounts.push(account);
          this.updateAccounts();
        })
      );
  }

  deleteAccount(id: string) {
    return this.http.delete(this.baseUrl + id, { headers: this.headers }).pipe(
      tap(() => {
        this.accounts = this.accounts.filter((account) => account._id !== id);
        this.updateAccounts();
      })
    );
  }

  editAccount(id: string, body: Account) {
    return this.http.put(this.baseUrl + id, body, { headers: this.headers });
  }
}

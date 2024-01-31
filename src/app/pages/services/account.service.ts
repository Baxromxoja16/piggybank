import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

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
  baseUrl = environment.apiUrl + 'account/';


  token = sessionStorage.getItem('tokenUser')!;
  headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: this.token,
  };

  // private accounts: Account[] = [];

  accounts: WritableSignal<Account[]> = signal([]);

  switchAccountSig = signal<Account>({} as Account);

  oldAccountSig = signal<Account>({} as Account);

  constructor(private http: HttpClient) {}


  getAccount(id: string) {
    return this.http.get<Account>(this.baseUrl + id, {headers: this.headers});
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl, {headers: this.headers}).pipe(
      tap(accounts => {
        this.accounts.set(accounts);
        this.switchAccountSig.set(this.switchAccountSig() || accounts[0]);
      }),
    );
  }

  getCurrencies() {
    return this.http.get(environment.apiUrl + `currency`, { headers: this.headers }).pipe(
      map((values: any) => {
        return values.map((c: { code: string; symbol: string }) => {
          return { code: c.code, sign: c.symbol };
        });
      })
    );
  }

  addAccount(data: Account): Observable<Account> {
    return this.http
      .post<Account>(this.baseUrl, data, { headers: this.headers }).pipe(
        tap((account) => {
          this.accounts.set([...this.accounts(), account]);
        })
      );
  }

  deleteAccount(id: string) {
    return this.http.delete(this.baseUrl + id, { headers: this.headers }).pipe(
      tap(() => {
        const updatedAccount = this.accounts().filter((account) => account._id !== id);

        this.accounts.set(updatedAccount);
      })
    );
  }

  editAccount(id: string, body: Account) {
    return this.http.put(this.baseUrl + id, body, { headers: this.headers }).pipe(
      tap((account) => {

        const idx = this.accounts().findIndex(
          (acc) =>
            (account as Account)._id === (acc as Account)._id
        );

        this.accounts().splice(idx, 1, account as Account);

        this.accounts.set(this.accounts());
      })
    );
  }
}

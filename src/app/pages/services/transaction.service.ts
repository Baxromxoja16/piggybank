import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ITransaction } from '../transactions/transaction.model';
import { Account } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  baseUrl = 'http://localhost:3000/transaction/';
  token = sessionStorage.getItem('tokenUser')!;
  headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: this.token,
  };

  account$: Subject<Account> = new Subject();
  account!: Account;

  constructor(private http: HttpClient) {
    this.account$.subscribe(account => this.account = account);
  }

  getTransactions(): Observable<ITransaction[]> {
    return this.http.get<ITransaction[]>(this.baseUrl + this.account._id,  { headers: this.headers });
  }

  getTransaction(id: string) {
    return this.http.get(this.baseUrl + this.account._id + id,  { headers: this.headers });
  }

  createTransaction(transaction: ITransaction): Observable<ITransaction> {
    return this.http.post<ITransaction>(this.baseUrl + this.account._id, transaction, { headers: this.headers });
  }

  editTransaction() {}

  deleteTransaction() {}
}

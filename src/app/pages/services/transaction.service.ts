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

  accountId$: Subject<Account> = new Subject();
  accountId = '';

  constructor(private http: HttpClient) {
    this.accountId$.subscribe(account => this.accountId = account._id);    
  }

  getTransactions() {
    return this.http.get(this.baseUrl + this.accountId,  { headers: this.headers });
  }

  getTransaction(id: string) {
    return this.http.get(this.baseUrl + this.accountId + id,  { headers: this.headers });
  }

  createTransaction(transaction: ITransaction): Observable<ITransaction> {
    return this.http.post<ITransaction>(this.baseUrl + this.accountId, transaction, { headers: this.headers });
  }

  editTransaction() {}

  deleteTransaction() {}
}

import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ITransaction } from '../transactions/transaction.model';
import { Account, AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  baseUrl = environment.apiUrl + 'transaction/';

  token = sessionStorage.getItem('tokenUser')!;
  headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: this.token,
  };

  transactions: WritableSignal<ITransaction[]> = signal([]);

  unfiltered: WritableSignal<ITransaction[]> = signal([]);

  accounts = this.accountService.accounts;

  constructor(private http: HttpClient, private accountService: AccountService) {
  }

  getTransactions(): Observable<ITransaction[]> {
    return this.http.get<ITransaction[]>(this.baseUrl + this.accountService.switchAccountSig()._id,  { headers: this.headers }).pipe(
      tap((transactions) => {
        this.transactions.set(transactions)
        this.unfiltered.set(transactions)
      })
    );
  }

  getTransaction(id: string) {
    return this.http.get<ITransaction>(this.baseUrl + this.accountService.switchAccountSig()._id + '/' + id,  { headers: this.headers });
  }

  createTransaction(transaction: ITransaction): Observable<ITransaction> {
    return this.http.post<ITransaction>(this.baseUrl + this.accountService.switchAccountSig()._id, transaction, { headers: this.headers }).pipe(
      tap((response) => {
       this.transactions.set([...this.transactions(), response]);

        // Find and update account balance
        const updatedAccounts = this.accounts().map((acc) => {
          if (response.accountId === acc._id) {
            const newBalance = response.type === 'expense' ? acc.balance - response.amount : acc.balance + response.amount;
            return { ...acc, balance: newBalance };
          }
          return acc;
        });

        // Update accounts
        this.accounts.set(updatedAccounts);
      })
    );
  }

  editTransaction() {}

  deleteTransaction(id: string) {
    return this.http.delete(this.baseUrl + this.accountService.switchAccountSig()._id + '/' + id, { headers: this.headers }).pipe(
      tap(() => {
        this.transactions.set(this.transactions().filter((tr) => tr._id !== id));
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface Account {
  title: string;
  currency: {
    name: string
    symbol: string
  };
  description: string;
  balance: number;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  account: Account = {
    title: 'Credit card',
    currency: {
      name: 'USD',
      symbol: '$'
    },
    description: '',
    balance: 2245.42,
  };
  accounts = [this.account, this.account];
  accounts$ = of(this.accounts);

  constructor() {}

  getAccounts() {
    return this.accounts$;
  }

  addAccount(data: Account) {
    return this.accounts.push(data);
  }
}

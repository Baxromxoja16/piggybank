import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';

export interface UserLogin {
  email: string;
  password: string;
}

export interface TokenType {
  token: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = 'http://localhost:3000/';
  errorMessage$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {}

  login(data: UserLogin) {
    return this.http.post<TokenType>(this.baseUrl + 'auth/login', data).pipe(
      tap((res:TokenType) => this.setSession(res)),
      catchError(this.handleError({}))
    );
  }

  private setSession(res: TokenType) {
    const expiresIn = Date.now() + +res.expiresIn;
    sessionStorage.setItem('tokenUser', res.token);
    sessionStorage.setItem('expiresIn', String(expiresIn));
  }

  private handleError<T>(result: T) {
    return (error: any): Observable<T> => {
      this.errorMessage$.next(error.error.message)
      return of(result as T);
    };
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

export interface UserLogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  test: Observable<UserLogin> = of({ email: 'aglamof@mail.ru', password: '123asd' });
  errorMessage: string = ''

  constructor(private http: HttpClient) {}

  login(data: UserLogin) {
    // return this.http.post('', data)
    return this.test.pipe(
      tap((res) => this.setSession(res)),
      catchError(this.handleError({}))
    )
  }

  private setSession(res: any) {
    const expiresIn = Date.now() + +res.expiresIn;
    localStorage.setItem('myToken', res.token);
    localStorage.setItem('expiresIn', String(expiresIn));
  }

  private handleError<T>(result: T) {
    return (error: any): Observable<T> => {
      this.errorMessage = error.error.message;
      return of(result as T);
    };
  }
}

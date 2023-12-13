import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

export interface UserLogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  test: Observable<UserLogin[]> = of([
    { email: 'aglamof@mail.ru', password: '123asd' },
  ]);

  constructor(private http: HttpClient) {}

  login(data: UserLogin) {
    // return this.http.post('', data)
    return this.test
  }
}

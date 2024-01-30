import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ICategory {
  _id: string
  type: string
  title: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.apiUrl + 'category/';

  token = sessionStorage.getItem('tokenUser')!;
  headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: this.token,
  };

  categories: WritableSignal<ICategory[]> = signal([]);

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<ICategory[]>(this.baseUrl, { headers: this.headers }).pipe(
      tap((categories) => this.categories.set(categories))
    )
  }

  getCategoryById(id: string) {
    return this.http.get(this.baseUrl + id, { headers: this.headers })
  }

  createCategory(body: ICategory) {
    return this.http.post(this.baseUrl, body, { headers: this.headers })
  }

  updateCategory(id: string, body: ICategory) {
    return this.http.put(this.baseUrl + id, body, { headers: this.headers })
  }

  deleteCategory(id: string) {
    return this.http.delete(this.baseUrl + id, { headers: this.headers }).pipe(
      tap(() => {
        const changed = this.categories().filter((val) => val._id !== id)
        this.categories.set(changed);
      })
    )
  }
}

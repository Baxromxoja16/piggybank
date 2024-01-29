import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ICategory {
  type: string
  title: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = 'http://localhost:3000/category/';

  token = sessionStorage.getItem('tokenUser')!;
  headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: this.token,
  };
  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<ICategory[]>(this.baseUrl, { headers: this.headers })
  }

  getCategory(id: string) {
    return this.http.get<ICategory>(this.baseUrl + id, { headers: this.headers })
  }

  createCategory(body: ICategory) {
    return this.http.post(this.baseUrl, body, { headers: this.headers })
  }

  deleteCategory(id: string) {
    return this.http.delete(this.baseUrl + id, { headers: this.headers })
  }

  editCategory(id: string, body: ICategory) {
    return this.http.put(this.baseUrl + id, body, { headers: this.headers })
  }
}

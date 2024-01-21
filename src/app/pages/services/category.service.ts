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
    return this.http.get(this.baseUrl, { headers: this.headers })
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
    return this.http.put(this.baseUrl + id, { headers: this.headers })
  }
}

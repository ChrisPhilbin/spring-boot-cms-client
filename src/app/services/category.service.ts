import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICategory } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories$ = new BehaviorSubject<ICategory[] | null>(null);
  category$ = new BehaviorSubject<ICategory | null>(null);
  isCategoryLoading$ = new BehaviorSubject<boolean>(false);
  categoryHasErrors$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getAllCategories() {
    this.isCategoryLoading$.next(true);
    this.categoryHasErrors$.next(false);
    this.http
      .get<ICategory[]>(`${environment.baseUrl}/category/all`)
      .subscribe({
        next: (categories: ICategory[]) => {
          this.categories$.next(categories);
          this.isCategoryLoading$.next(false);
        },
        error: (error: Error) => {
          this.handleCategoryErrors(error);
        },
      });
  }

  getCategoryDetailsById(categoryId: string) {
    this.isCategoryLoading$.next(true);
    this.categoryHasErrors$.next(false);
    this.http
      .get<ICategory>(`${environment.baseUrl}/category/${categoryId}`)
      .subscribe({
        next: (category: ICategory) => {
          this.category$.next(category);
        },
        error: (error) => this.handleCategoryErrors(error),
      });
  }

  createNewCategory(newCategoryDetails: ICategory) {
    this.isCategoryLoading$.next(true);
    this.categoryHasErrors$.next(true);
    this.http
      .post<ICategory>(`${environment.baseUrl}/category`, {
        newCategoryDetails,
      })
      .subscribe({
        next: (newCategory: ICategory) => {
          const existingCategories = this.categories$.getValue();
          existingCategories?.concat(newCategory);
          this.categories$.next(existingCategories);
          this.isCategoryLoading$.next(false);
        },
        error: (error) => {
          this.handleCategoryErrors(error);
        },
      });
  }

  handleCategoryErrors(error: Error) {
    console.error(error);
    this.isCategoryLoading$.next(false);
    this.categoryHasErrors$.next(true);
  }
}

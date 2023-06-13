import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$ = new BehaviorSubject<IUser | null>(null);
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public hasAuthErrors$ = new BehaviorSubject<boolean>(false);
  public isLoginLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  login(userName: string, password: string) {
    this.hasAuthErrors$.next(false);
    this.isLoginLoading$.next(true);
    return this.http
      .post<any>(
        `${environment.baseUrl}/authenticate`,
        {
          username: userName,
          password: password,
        },
        {
          observe: 'response',
        }
      )
      .subscribe({
        next: (authResponse) => {
          if (authResponse.ok) {
            const token = authResponse.headers
              .get('authorization')
              ?.split(' ')[1];
            if (token) {
              this.isLoginLoading$.next(false);
              this.isLoggedIn$.next(true);
              this.cookieService.set('token', token);
              this.router.navigate(['/']);
            }
          } else {
            this.hasAuthErrors$.next(true);
          }
        },
        error: (error) => {
          console.error(error);
          this.hasAuthErrors$.next(true);
        },
      });
  }
}

import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  token: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private jwtHelper: JwtHelperService
  ) {
    this.authService.token$.subscribe((authServiceToken) => {
      if (authServiceToken) this.token = authServiceToken;
    });
  }

  canActivate(): boolean {
    const cookieToken: string | null = this.cookieService.get('token');

    if (!cookieToken || !this.jwtHelper.isTokenExpired(cookieToken)) {
      setTimeout(() => {
        this.router.navigate(['/auth']);
      }, 300);
      return false;
    }

    // if (this.jwtHelper.isTokenExpired(cookieToken)) {
    //   setTimeout(() => {
    //     this.router.navigate(['/auth']);
    //   }, 300);
    //   return false;
    // }

    if (cookieToken && !this.token) {
      this.authService.token$.next(cookieToken);
    }

    return true;
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'spring-boot-cms-client';

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.authService.token$.subscribe((token) => {
      if (!token) {
        if (this.cookieService.check('token')) {
          this.authService.token$.next(this.cookieService.get('token'));
        }
      }
    });
  }
}

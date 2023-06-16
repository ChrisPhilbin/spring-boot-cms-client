import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  signInMode: boolean = true;
  userName: string = '';
  password: string = '';
  confirmPassword: string = '';
  hasErrors: boolean = false;
  isSessionExpired: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.hasAuthErrors$.subscribe((authErrors) => {
      if (authErrors) {
        this.password = '';
      }
      this.hasErrors = authErrors;
    });
    this.isSessionExpired =
      this.route.snapshot.queryParamMap.get('sessionExpired') === 'true'
        ? true
        : false;
  }

  submitAuth() {
    this.authService.login(this.userName, this.password);
  }
}

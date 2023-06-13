import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.hasAuthErrors$.subscribe((authErrors) => {
      if (authErrors) {
        this.password = '';
      }
      this.hasErrors = authErrors;
    });
  }

  submitAuth() {
    this.authService.login(this.userName, this.password);
  }
}

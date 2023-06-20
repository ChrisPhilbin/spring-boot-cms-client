import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { PostIndexComponent } from './components/post/post-index/post-index.component';
import { ViewPostComponent } from './components/post/view-post/view-post.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ViewCategoryComponent } from './components/category/view-category/view-category.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PostIndexComponent,
    ViewPostComponent,
    LoadingComponent,
    ViewCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    CookieService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

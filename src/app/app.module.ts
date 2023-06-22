import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {InvoicesComponent} from './invoices/invoices.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NgxPaginationModule} from "ngx-pagination";
import {ScanComponent} from './scan/scan.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UsersComponent} from './users/users.component';
import {WebcamModule} from "ngx-webcam";
import {LogoutComponent} from './logout/logout.component';
import {BasicAuthHttpInterceptor} from "./authentication/basic.auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InvoicesComponent,
    DashboardComponent,
    ScanComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    HttpClientModule,
    WebcamModule
  ],
  providers: [InvoicesComponent, {provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

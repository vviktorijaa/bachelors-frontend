import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvoicesComponent} from "./invoices/invoices.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ScanComponent} from "./scan/scan.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', title: 'Invoices', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, title: 'Dashboard', pathMatch: 'full'},
  {path: 'invoices', component: InvoicesComponent, title: 'Invoices', pathMatch: 'full'},
  {path: 'scan', component: ScanComponent, title: 'Scan', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, title: 'Login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent, title: 'Register', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

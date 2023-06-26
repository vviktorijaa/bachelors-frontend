import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvoicesComponent} from "./invoices/invoices.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ScanComponent} from "./scan/scan.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {UsersComponent} from "./users/users.component";
import {AuthGuard} from "./authentication/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: '/login', title: 'Dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, title: 'Login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, title: 'Dashboard', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'invoices', component: InvoicesComponent, title: 'Invoices', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'scan', component: ScanComponent, title: 'Scan', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, title: 'Register', pathMatch: 'full'},
  {path: 'users', component: UsersComponent, title: 'Users', pathMatch: 'full', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

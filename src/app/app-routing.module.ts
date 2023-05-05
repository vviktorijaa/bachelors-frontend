import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvoicesComponent} from "./invoices/invoices.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ScanComponent} from "./scan/scan.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', title: 'Invoices', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, title: 'Dashboard', pathMatch: 'full'},
  {path: 'invoices', component: InvoicesComponent, title: 'Invoices', pathMatch: 'full'},
  {path: 'scan', component: ScanComponent, title: 'Scan', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

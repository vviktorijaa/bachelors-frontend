import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {InvoicesComponent} from "../invoices/invoices.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  message: any;
  invoicesData: any;

  constructor(private router: Router,
              private invoices: InvoicesComponent) {
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  ngOnInit(): void {
    this.checkInvoicesWeek();
  }

  async checkInvoicesWeek(): Promise<void> {
    const invoicesExist = await this.getInvoicesWeek();
    if (invoicesExist) {
      this.message = "You have invoices due this week. Please, check the 'Invoices" +
        "Due This Week' section."
    } else {
      this.message = "No invoices are due this week."
    }
  }

  getInvoicesWeek(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.invoices.getInvoicesDueThisWeek().subscribe({
        next: (data: any) => {
          this.invoicesData = data;
          resolve(this.invoicesData.length > 0);
        },
        error: (err: any) => {
          console.log(err);
          resolve(false);
        }
      });
    });
  }
}

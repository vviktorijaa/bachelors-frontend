import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';

const INVOICES_API = "http://localhost:8081/invoices";
const INVOICES_DUE_NEXT_WEEK_API = "http://localhost:8081/dueNextWeek";

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent {

  invoices: any;
  p: number = 1;
  activeTab: string = 'invoices';

  constructor(private http: HttpClient) {
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
    this.loadInvoices();
  }

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices() {
    if (this.activeTab === 'invoices') {
      this.http.get(INVOICES_API).subscribe({
        next: (data) => {
          this.invoices = data;
        },
        error: (err) => {
          console.log(err)
        }
      })
    } else {
      this.http.get(INVOICES_DUE_NEXT_WEEK_API).subscribe({
        next: (data) => {
          this.invoices = data;
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
}

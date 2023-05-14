import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';

const INVOICES_API = "http://localhost:8081/invoices";

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent {

  invoices: any;
  p: number = 1;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get(INVOICES_API).subscribe({
      next: (data) => {
        this.invoices = data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}

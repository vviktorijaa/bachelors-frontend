import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent {

  fileToUpload: File | null = null;

  form: any = {
    invoice: null
  }

  jsonResponse: any = {
    image: null,
    regions: null
  }

  constructor(private http: HttpClient) {
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    if (this.fileToUpload) {
      formData.append('invoice', this.fileToUpload, this.fileToUpload.name);
    }

    const httpOptions: Object = {
      headers: new HttpHeaders(),
      responseType: 'text' as const
    };

    this.http.post("http://localhost:8080/scan/invoice", formData, httpOptions).subscribe({
      next: (data) => {
        console.log(data);
        this.jsonResponse = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}

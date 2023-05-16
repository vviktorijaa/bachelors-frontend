import {Component, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const SCAN_INVOICE_ENDPOINT = "http://localhost:8080/scan/invoice";

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent {

  @ViewChild('canvasElement', {static: false}) canvas: any;
  @ViewChild('processingImage', {static: true}) processingImage: any;

  canvasDataURL: string | null = null;
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

    this.http.post(SCAN_INVOICE_ENDPOINT, formData, httpOptions).subscribe({
      next: (data) => {
        // @ts-ignore
        this.jsonResponse = JSON.parse(data);
        this.drawCanvasImage();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  private drawCanvasImage(): void {
    if (this.canvas && this.canvas.nativeElement && this.jsonResponse && this.jsonResponse.image) {
      const canvas = this.canvas.nativeElement;
      const ctx = canvas.getContext('2d');

      const image = new Image();
      image.src = 'data:image/png;base64,' + this.jsonResponse.image;
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        for (const region of this.jsonResponse.regions) {
          const x1 = region[0][0] * canvas.width;
          const y1 = region[0][1] * canvas.height;
          const x3 = region[2][0] * canvas.width;
          const y3 = region[2][1] * canvas.height;

          const width = x3 - x1;
          const height = y3 - y1;

          ctx.beginPath();
          ctx.rect(x1, y1, width, height);
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'red';
          ctx.stroke();
        }
        this.canvasDataURL = canvas.toDataURL('image/png');
      };
    }
  }
}

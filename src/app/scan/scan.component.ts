import {Component, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {WebcamImage} from "ngx-webcam";
import {Observable, Subject} from "rxjs";

const SCAN_INVOICE_ENDPOINT = "http://localhost:8080/scan/invoice";

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent {

  @ViewChild('canvasElement', {static: false}) canvas: any;
  @ViewChild('processingImage', {static: true}) processingImage: any;
  @ViewChild('fileInput', { static: false }) fileInput: any;

  canvasDataURL: string | null = null;
  fileToUpload: File | null = null;
  invoiceStatus: string | null = "";
  invoiceStatusVisibility: boolean = false;
  showCamera: boolean = true;

  form: any = {
    invoice: null
  }

  jsonResponse: any = {
    image: null,
    regions: null
  }

  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: File | null = null;
  btnLabel: string = 'Scan Invoice';

  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  snapshot(event: WebcamImage) {
    console.log(event);
    const imageDataUrl = event.imageAsDataUrl;
    const byteString = atob(imageDataUrl.split(',')[1]);
    const mimeString = imageDataUrl.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    this.previewImage = new File([blob], 'image.jpg', { type: mimeString });
    this.btnLabel = 'Re-scan Invoice';
  }
  checkPermissions() {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 500,
        height: 500
      }
    }).then((res) => {
      console.log("response", res);
      this.stream = res;
      this.status = "Camera has access";
      this.btnLabel = "Scan Invoice";
      this.showCamera = true;
    }).catch(err => {
      console.log(err);
      if(err?.message === "Permission denied") {
        this.status = "Permission denied. Try again by allowing the camera";
      } else {
        this.status = "You may not have camera device. Please try again.";
      }
    })
  }

  captureImage() {
    this.trigger.next();
    this.onSubmit();
    this.showCamera = false;
  }

  proceed() {
    console.log(this.previewImage);
  }

  constructor(private http: HttpClient) {
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
      this.form.invoice = event.target.files[0];
    }
  }

  onSubmit(): void {
    this.invoiceStatusVisibility = true;
    this.invoiceStatus = "Processing invoice..."
    const formData = new FormData();
    const fileInput = this.fileInput.nativeElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      formData.append('invoice', file, file.name);
      this.showCamera = false;
    } else if (this.previewImage) {
      formData.append('invoice', this.previewImage, this.previewImage.name);
      this.fileToUpload = null;
      this.previewImage = null;
      this.showCamera = false;
    } else {
      this.invoiceStatus = "Please, upload an image."
      this.showCamera = false;
      return;
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
        this.invoiceStatus = "Invoice saved successfully."
        fileInput.value = '';
        setTimeout(() => {
          this.invoiceStatusVisibility = false;
        }, 4000);
      },
      error: (err) => {
        this.invoiceStatus = "Error processing invoice."
        console.log(err);
        setTimeout(() => {
          this.invoiceStatusVisibility = false;
        }, 4000);
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

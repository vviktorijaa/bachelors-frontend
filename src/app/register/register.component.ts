import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const USER_REGISTER_API = 'http://localhost:8081/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: any = {
    username: null,
    password: null,
    repeatPassword: null
  };

  passwordsMatch = true;
  invalidRegistration: boolean = false;
  uniqueUsername: boolean = false;

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  onSubmit(): void {
    console.log('Form submitted:', this.form);

    const httpOptions: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    };

    if (this.form.password !== this.form.repeatPassword) {
      this.passwordsMatch = false;
      return;
    }

    this.httpClient.post(USER_REGISTER_API, this.form, httpOptions).subscribe(
      () => {
        this.router.navigate(['/login']);
        this.invalidRegistration = false;
      },
      (err) => {
        this.invalidRegistration = true;
        if (err.status == 406) {
          this.uniqueUsername = true;
        }
      }
    )
  }
}

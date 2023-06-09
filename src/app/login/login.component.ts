import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../authentication/auth.service";

const HTTP_UNAUTHORIZED: number = 401;
const HTTP_FORBIDDEN: number = 403;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: any = {
    username: null,
    password: null
  };

  isLoggedIn = false;
  errorMessage = '';
  wrongCredentials: boolean = false;
  invalidLogin: boolean = false;

  constructor(private router: Router, private loginService: AuthService) {
  }

  onSubmit(): void {
    console.log('Form submitted:', this.form);
    sessionStorage.setItem('username', this.form.username);
    sessionStorage.setItem('password', this.form.password);

    this.loginService.authenticate(this.form.username, this.form.password).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
        this.invalidLogin = false;
      },
      (err) => {
        this.invalidLogin = true;
        this.wrongCredentials = true;
        if (err.status == HTTP_UNAUTHORIZED) {
          this.wrongCredentials = true;
        }
        if (err.status == HTTP_FORBIDDEN) {
          this.wrongCredentials = true;
        }
      }
    )
  }
}

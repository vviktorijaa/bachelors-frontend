import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs";

const AUTH_API = 'http://localhost:8081/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean | undefined;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  authenticate(username: string, password: string) {
    const httpOptions: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Basic " + btoa(username + ":" + password)
      }),
      responseType: 'text'
    };

    return this.http.post(AUTH_API, {}, httpOptions).pipe(
      map(
        (data) => {
          let authString = 'Basic ' + btoa(username + ':' + password);
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('basicAuth', authString);
          sessionStorage.setItem('userId', JSON.parse(data.toString()).id);

          this.isLoggedIn = true;
        }
      ))
  }

  isUserLoggedIn() {
    let basicAuth = sessionStorage.getItem('basicAuth');
    return basicAuth != null;
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('basicAuth');

    this.isLoggedIn = false;
  }
}

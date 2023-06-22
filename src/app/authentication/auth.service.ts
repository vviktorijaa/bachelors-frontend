import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";

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
    console.log('Authenticating:', username, password);
    const httpOptions: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Basic " + btoa(username + ":" + password)
      }),
      responseType: 'text'
    };

    let credentials = {username: username, password: password};

    return this.http.post(AUTH_API, credentials, httpOptions).pipe(
      map(() => {
          let authString = 'Basic ' + btoa(username + ':' + password);
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('basicAuth', authString);

          this.isLoggedIn = true;
        }),
      catchError((error) => {
        console.error('Authentication error:', error);
        return throwError(error);
      }))
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

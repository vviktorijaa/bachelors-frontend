import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

export class BasicAuthHttpInterceptor implements HttpInterceptor {

  username = sessionStorage.getItem('username');
  password = sessionStorage.getItem('password');
  authString = 'Basic ' + btoa(this.username + ':' + this.password);

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (sessionStorage.getItem('username') && sessionStorage.getItem('basicAuth')) {
      req = req.clone({
        setHeaders: {
          Authorization: this.authString
        }
      })
    }
    return next.handle(req);
  }
}

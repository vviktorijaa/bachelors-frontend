import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  notLoggedIn: boolean | undefined;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(): boolean {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
      this.notLoggedIn = true;
      return false;
    }
    return true;
  }

}

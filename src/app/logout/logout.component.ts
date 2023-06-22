import {Component, OnInit} from '@angular/core';
import {AuthService} from "../authentication/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private logoutService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.logoutService.logOut();
    this.router.navigate(['login']);
  }

}

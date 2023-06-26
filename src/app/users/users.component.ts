import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const USERS_API = 'http://localhost:8081/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any;
  p: number = 1;
  message: any;
  showMessage: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.http.get(USERS_API).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

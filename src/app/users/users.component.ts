import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {}

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

  deleteUserById(id: number): void {
    this.http.delete(USERS_API + '/' + id).subscribe({
      next: (data) => {
        this.message = 'Delete successful';
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 4000);
        this.getUsers();
      },
      error: (error) => {
        this.message = 'There was an error: ' + error;
        this.showMessage = true;
      }
    });
  }
}

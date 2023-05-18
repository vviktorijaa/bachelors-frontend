import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

const USERS_API = "http://localhost:8081/users";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users: any;
  p: number = 1;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get(USERS_API).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}

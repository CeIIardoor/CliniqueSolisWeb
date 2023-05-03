import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./Models/User";

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html'
})
export class UsersDashboardComponent implements OnInit{

  public users : User[] = [];
  public viewTarget : User | null = null;
  public editTarget : User | null = null;
  BACKEND_URL = 'http://localhost:8080/api/user/';

  constructor(
    private httpClient : HttpClient
  ) {}

  ngOnInit(): void {
    this.httpClient.get(this.BACKEND_URL + 'all').subscribe(
      (data : any) => {
        this.users = data.users;
      }
    )
  }
  setViewTarget(id: number) : void {
    this.viewTarget = this.users.find(user => user.id == id) as User;
    console.log(this.viewTarget);
  }

  setEditTarget(id: number) : void {
    this.editTarget = this.users.find(user => user.id == id) as User;
    console.log(this.editTarget);
  }
}

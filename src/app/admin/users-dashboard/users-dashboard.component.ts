import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "./Models/UserInterface";

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html'
})
export class UsersDashboardComponent implements OnInit{

  public users : UserInterface[] = [];
  public viewTarget : UserInterface | null = null;
  public editTarget : UserInterface | null = null;
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
    this.viewTarget = this.users.find(user => user.id == id) as UserInterface;
    console.log(this.viewTarget);
  }

  setEditTarget(id: number) : void {
    this.editTarget = this.users.find(user => user.id == id) as UserInterface;
    console.log(this.editTarget);
  }
}

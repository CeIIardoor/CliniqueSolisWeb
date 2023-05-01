import { Component, OnInit } from "@angular/core";
import { UserAuthService } from "../_services/user-auth.service";
import { Router } from "@angular/router";
import {UserService} from "../_services/user.service";
import {routeNames} from "../routes";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

})
export class HeaderComponent implements OnInit {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService
    ) {}

  ngOnInit(): void {}

  public isAuthenticated() : boolean {
    return this.userAuthService.isAuthenticated();
  }

  logout() {
    this.router.navigate(['/'+ routeNames.index]).then(r => console.log("logout to index : " + r));
    this.userAuthService.clear();
  }

    protected readonly routeNames = routeNames;
}

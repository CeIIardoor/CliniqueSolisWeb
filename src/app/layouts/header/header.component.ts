import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../_auth/auth.service";
import { Router } from "@angular/router";
import {routeNames} from "../../routes";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

})
export class HeaderComponent implements OnInit {
  constructor(
    private userAuthService: AuthService,
    private router: Router,
    ) {}

  ngOnInit(): void {}

  public isDashboard() : boolean {
    return this.router.url.includes(routeNames.dashboard);
  }

  public isAuthenticated() : boolean {
    return this.userAuthService.isAuthenticated();
  }
  logout() {
    this.router.navigate(['/'+ routeNames.index]).then(() => console.log("logout to index : "));
    this.userAuthService.clear();
  }

    protected readonly routeNames = routeNames;
}

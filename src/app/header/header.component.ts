import { Component, OnInit } from "@angular/core";
import { UserAuthService } from "../_services/user-auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router
    ) {}

  ngOnInit(): void {}

  public isAuthenticated() : boolean {
    return this.userAuthService.isAuthenticated();
  }

  logout() {
    this.router.navigate(['/index']);
    this.userAuthService.clear();
  }
}

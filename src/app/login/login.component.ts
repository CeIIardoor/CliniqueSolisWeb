import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../_services/user.service";
import { UserAuthService } from "../_services/user-auth.service";
import { Router } from "@angular/router";
import {routeNames} from "../routes";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  authenticate(loginForm: NgForm) {
    this.userService.login(loginForm.value.email, loginForm.value.password).subscribe(
      (response: any) => {
        this.userAuthService.setToken(response.access_token);
        this.userAuthService.setRole(response.role_name);

        const role = this.userAuthService.getRole();
        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/' + routeNames.dashboard]).then(r => console.log("navigate to /dashboard : " + r));
        }
        else if (role === 'ROLE_UTILISATEUR') {
          this.router.navigate(['/' + routeNames.home]).then(r => console.log("navigate to /home : " + r));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

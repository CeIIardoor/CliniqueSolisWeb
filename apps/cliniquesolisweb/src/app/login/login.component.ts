import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../_services/user.service";
import { UserAuthService } from "../_services/user-auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
          this.router.navigate(['/admin']).then(r => console.log(r));
        }
        else if (role === 'ROLE_UTILISATEUR') {
          this.router.navigate(['/user']).then(r => console.log(r));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

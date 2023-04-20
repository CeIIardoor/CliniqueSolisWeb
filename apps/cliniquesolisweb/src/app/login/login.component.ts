import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../_services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  authenticate(loginForm: NgForm) {
    this.userService.login(loginForm.value.email, loginForm.value.password).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }
}

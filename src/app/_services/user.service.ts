import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {UserAuthService} from "./user-auth.service";

@Injectable({
  providedIn: "root"
})
export class UserService {

  BACKEND_PATH = "http://localhost:8080/api/auth/";
  requestHeader = new HttpHeaders(
    {
      "No-Auth": "True"
    }
  );

  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {

  }

  public login(email: String, password: String) {

    return this.httpclient.post(
      this.BACKEND_PATH + "login",
      { email, password },
      { headers: this.requestHeader });
  }

  public authorize(allowedRoles: string[]): boolean {
    const userRole = this.userAuthService.getRole();
    if (userRole === null) {
      return false;
    }
    return allowedRoles.includes(userRole);
  }
}

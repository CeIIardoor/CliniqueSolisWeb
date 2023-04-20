import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService {

  BACKEND_PATH = "http://localhost:8080/api/auth/";
  requestHeader = new HttpHeaders(
    {
      "No-Auth": "True"  // This is the header that is used to bypass the authentication in the backend
    }
  );

  constructor(private httpclient: HttpClient) {

  }

  public login(email: String, password: String) {

    return this.httpclient.post(
      this.BACKEND_PATH + "login",
      { email, password },
      { headers: this.requestHeader });
  }
}

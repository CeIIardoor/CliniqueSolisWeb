import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}
  BACKEND_URL = environment.apiURL

  deleteUser(id: number): void {
    this._http.delete(`${this.BACKEND_URL}/api/user/${id}`)
  }
}

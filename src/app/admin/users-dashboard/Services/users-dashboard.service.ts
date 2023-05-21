import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UsersDashboardService {
  constructor(private http: HttpClient) {}
  BACKEND_URL = environment.apiURL

  getAllUsers(): Observable<any>{
    return this.http.get(`${this.BACKEND_URL}/api/user/all`)
  }

  deleteUserById(id: number): void {
    this.http.delete(`${this.BACKEND_URL}/api/user/delete/${id}`)
  }
}

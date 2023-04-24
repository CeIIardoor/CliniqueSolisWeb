import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  BACKEND_PATH = "https://cellardoor.info:8080/api/demo-controller/";

  constructor(private http: HttpClient) { }

  getHelloMessage(): Observable<string> {
    return this.http.get<string>(this.BACKEND_PATH + "user");
  }
}

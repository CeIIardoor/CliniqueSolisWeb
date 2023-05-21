import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor() { }

  getHelloMessage(): Observable<any> {
    return new Observable<any>(observer => {
      setTimeout(() => {
        observer.next({ message: "Hello World!" });
      }, 200);
    });
  }
}

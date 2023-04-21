import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRole(role: string) {
    localStorage.setItem('role', JSON.stringify(role));
  }

  public getRole() : string {
    return JSON.parse(localStorage.getItem('role') || '');
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', JSON.stringify(jwtToken));
  }

  public getToken() : string {
    return localStorage.getItem('jwtToken') || '';
  }

  public clear() {
    localStorage.clear();
  }

  public isAuthenticated() : boolean {
    return !!(this.getRole() && this.getToken());
  }
}

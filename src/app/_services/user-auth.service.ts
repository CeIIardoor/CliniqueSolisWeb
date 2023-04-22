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
    if (localStorage.getItem('role') === null) {
      return '';
    }
    return JSON.parse(localStorage.getItem('role') || '');
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', JSON.stringify(jwtToken));
  }

  public getToken() : string {
    if (localStorage.getItem('jwtToken') === null) {
      return '';
    }
    return JSON.parse(localStorage.getItem('jwtToken') || '');
  }

  public clear() {
    localStorage.removeItem('role');
    localStorage.removeItem('jwtToken');
  }

  public isAuthenticated() : boolean {
    return !!(this.getToken() && this.getRole());
  }
}

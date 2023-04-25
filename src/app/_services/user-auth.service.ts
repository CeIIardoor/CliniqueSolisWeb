import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRole(role: string) {
    localStorage.setItem('role', role);
  }

  public getRole() : string {
    return localStorage.getItem('role') || '';
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken() : string {
    return localStorage.getItem('jwtToken') || '';
  }

  public clear() {
    localStorage.removeItem('role');
    localStorage.removeItem('jwtToken');
  }

  public isAuthenticated() : boolean {
    return !!(this.getToken() && this.getRole());
  }
}

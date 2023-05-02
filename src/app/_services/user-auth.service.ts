import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRole(role: string) {
    localStorage.setItem('role', role);
  }

  public getRole() : string | null {
    return localStorage.getItem('role') || null;
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken() : string | null {
    return localStorage.getItem('jwtToken') || null;
  }

  public clear() {
    localStorage.removeItem('role');
    localStorage.removeItem('jwtToken');
  }

  public isAuthenticated() : boolean {
    return !!(this.getToken() && this.getRole());
  }
}

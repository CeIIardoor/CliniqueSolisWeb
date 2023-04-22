import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../_services/user.service";
import {UserAuthService} from "../_services/user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userAuthService : UserAuthService,
    private router: Router,
    private userService : UserService
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    if (this.userAuthService.getToken() != null) {
      const roles = route.data["roles"] as string[];
      if (roles) {
        if (this.userService.isCurrentUserAuthorized(roles)) {
          return true;
        } else {
          this.router.navigate(['/forbidden']).then(r => console.log("Authorization Error : Redirected to forbidden page"));
          return false;
        }
      }
    }
    this.router.navigate(['/login']).then(r => console.log("Authorization Error : Redirected to login page"));
    return false;
  }

}

import {Routes} from "@angular/router";
import {IndexComponent} from "./index/index.component";
import {AdminComponent} from "./admin/admin.component";
import {AuthGuard} from "./_auth/auth.guard";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {RegisterComponent} from "./register/register.component";

export const routeNames = {
  index: '',
  dashboard: 'dashboard',
  home: 'home',
  login: 'login',
  register: 'register',
  forbidden: 'forbidden',
}

export const routes: Routes = [
  {path: routeNames.index, component: IndexComponent},
  {path: routeNames.dashboard, component: AdminComponent, canActivate: [AuthGuard], data: {roles: ["ROLE_ADMIN"]}},
  {path: routeNames.home, component: HomeComponent, canActivate: [AuthGuard], data: {roles: ["ROLE_ADMIN", "ROLE_UTILISATEUR"]}},
  {path: routeNames.login, component: LoginComponent, canActivate: [AuthGuard]},
  {path: routeNames.register, component: RegisterComponent},
  {path: routeNames.forbidden, component: ForbiddenComponent},
];

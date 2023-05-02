import {Routes} from "@angular/router";
import {IndexComponent} from "./index/index.component";
import {AuthGuard} from "./_auth/auth.guard";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./_auth/login/login.component";
import {ForbiddenComponent} from "./layouts/forbidden/forbidden.component";
import {UsersDashboardComponent} from "./admin/users-dashboard/users-dashboard.component";
import {AdminComponent} from "./admin/admin.component";

export const routeNames = {
  index: '',
  dashboard: 'dashboard',
  home: 'home',
  login: 'login',
  forbidden: 'forbidden',
  usersDashboard: 'dashboard/users',
}

export const routes: Routes = [
  {path: routeNames.index, component: IndexComponent},
  {path: routeNames.dashboard, component: AdminComponent, canActivate: [AuthGuard], data: {roles: ["ROLE_ADMIN"]}},
  {path: routeNames.home, component: HomeComponent, canActivate: [AuthGuard], data: {roles: ["ROLE_ADMIN", "ROLE_UTILISATEUR"]}},
  {path: routeNames.login, component: LoginComponent, canActivate: [AuthGuard]},
  {path: routeNames.forbidden, component: ForbiddenComponent},
  {path: routeNames.usersDashboard, component: UsersDashboardComponent, canActivate: [AuthGuard], data: {roles: ["ROLE_ADMIN"]}},
  {path: '**', redirectTo: routeNames.index},
];

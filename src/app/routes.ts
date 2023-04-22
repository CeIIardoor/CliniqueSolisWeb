import {Routes} from "@angular/router";
import {IndexComponent} from "./index/index.component";
import {AdminComponent} from "./admin/admin.component";
import {AuthGuard} from "./_auth/auth.guard";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {RegisterComponent} from "./register/register.component";

export const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {roles: ["ROLE_ADMIN"]}},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {roles: ["ROLE_ADMIN", "ROLE_UTILISATEUR"]}},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forbidden', component: ForbiddenComponent},
];

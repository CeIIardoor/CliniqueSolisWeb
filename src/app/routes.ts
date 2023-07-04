import {Routes} from "@angular/router";
import {IndexComponent} from "./index/index.component";
import {AuthGuard} from "./_auth/auth.guard";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./_auth/login/login.component";
import {ForbiddenComponent} from "./layouts/forbidden/forbidden.component";
import {UsersDashboardComponent} from "./admin/users-dashboard/users-dashboard.component";
import {AdminComponent} from "./admin/admin.component";
import {NotFoundComponent} from "./layouts/not-found/not-found.component";
import {RegisterPatientComponent} from "./register-patient/register-patient.component";
import { GestionPatientsComponent} from "./patient/gestion-patients.component";

export const routeNames = {
  index: '',
  dashboard: 'dashboard',
  home: 'home',
  login: 'login',
  forbidden: 'forbidden',
  notFound: 'notfound',
  usersDashboard: 'dashboard/users',
  mesRendezVous: 'mes-rendez-vous',
  registerPatient:"register-patient",
  gestionMedecins: 'dashboard/gestion-medecins',
  gestionPatients: 'dashboard/gestion-patients',
  gestionRendezVous: 'dashboard/gestion-rendez-vous',
}

export const routes: Routes = [
  {path: routeNames.index, component: IndexComponent},
  {path: routeNames.home, component: HomeComponent, canActivate: [AuthGuard], data: {roles: ["ROLE_ADMIN", "ROLE_UTILISATEUR"]}},
  {path: routeNames.login, component: LoginComponent, canActivate: [AuthGuard]},
  {path: routeNames.dashboard, component: AdminComponent, canActivate: [AuthGuard], data: {roles: ["ROLE_ADMIN"]}},
  {path: routeNames.usersDashboard, component: UsersDashboardComponent, canActivate: [AuthGuard], data: {roles: ["ROLE_ADMIN"]}},
  {path: routeNames.forbidden, component: ForbiddenComponent},
  {path: routeNames.registerPatient, component:RegisterPatientComponent},
  {path:routeNames.gestionPatients, component: GestionPatientsComponent, canActivate: [AuthGuard], data: {roles: ["ROLE_ADMIN"]}},

  {path: '**', component: NotFoundComponent},
];

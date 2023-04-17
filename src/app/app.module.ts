import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {IndexComponent} from './index/index.component';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './user/user.component';
import {LoginComponent} from './login/login.component';
import {HeaderComponent} from './header/header.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {NgOptimizedImage} from "@angular/common";

import {RouterModule, Routes} from '@angular/router';
import {AppRoutingModule} from './app-routing.module'


const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    AppRoutingModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

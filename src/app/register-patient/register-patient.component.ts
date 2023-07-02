import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AuthService} from "../_auth/auth.service";
import {LoginService} from "../_auth/login.service";

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {
  constructor(private http:HttpClient,
              private router: Router,
              private userAuthService: AuthService,
              private loginService: LoginService
  ){}
  ngOnInit(): void {}
  loading: boolean = false;

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 1000);
  }

  submitForm(registerPatientForm : NgForm) {
    console.log(registerPatientForm.value);
    if (registerPatientForm.value.password !== registerPatientForm.value.passwordConfirmation) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    this.http.post(environment.apiURL + "/api/patient/create", {
        "email": registerPatientForm.value.email,
        "mdp": registerPatientForm.value.password,
        "nom": registerPatientForm.value.nom,
        "prenom": registerPatientForm.value.prenom,
        "cin": registerPatientForm.value.cin,
      }
      ,
      {headers: {'No-Auth': 'True'}}
    ).subscribe(
      () => {
        this.loginService.login(registerPatientForm.value.email, registerPatientForm.value.password).subscribe(
          (response : any) => {
            this.userAuthService.setJwtToken(response.access_token);
            this.userAuthService.setRefreshToken(response.refresh_token);
            this.userAuthService.setRole(response.role_name);
            this.router.navigate(['/rendez-vous']).then(() => console.log("PatientInterface successfully registered"));
          }
        );
      }
    );
  }
}

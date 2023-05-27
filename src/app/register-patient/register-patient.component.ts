import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {IPatientRegister} from "./PatientModel/ipatient-register";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {data} from "autoprefixer";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {
  BACKEND_URL = `${environment.apiURL}/api/patient/`;

  constructor(private http:HttpClient,private router: Router){}
  ngOnInit(): void {}
  loading: boolean = false;

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 1000);
  }

  submitForm(registerPatientForm : NgForm) {
    if (registerPatientForm.value.mdp !== registerPatientForm.value.mdpConfirmation) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    // TODO : Register the user as ROLE_PATIENT
    // TODO : Redirect to /rendez-vous

    // this.http.post(this.BACKEND_URL +"create", {
    //   nom: registerPatientForm.value.nom,
    //   prenom: registerPatientForm.value.prenom,
    //   email: registerPatientForm.value.email,
    //   cin: registerPatientForm.value.cin,
    //   mdp: registerPatientForm.value.mdp
    // }).subscribe(
    //   (response) => {
    //     console.log("Patient has been registered successfully", response);
    //     this.router.navigate(['/rendez-vous']).then(
    //       () => {
    //         console.log("Navigated to /rendez-vous");
    //       }
    //     );
    //   }
    // );

  }
}

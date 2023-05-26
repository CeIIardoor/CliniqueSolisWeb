import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {IPatientRegister} from "./PatientModel/ipatient-register";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {
  BACKEND_URL = `${environment.apiURL}/api/patient/`;

  formRegister:IPatientRegister ={
    nom:"",
    prenom:"",
    email:"",
    cin:"",
    mdp:""
  };

  constructor(private http:HttpClient,private router: Router){}
  ngOnInit(): void {}
  loading: boolean = false;

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 1000);


  }
  onSubmit(): void {
    this.http.post(this.BACKEND_URL +"create", this.formRegister).subscribe(
      (response) => {
        console.log("Patient has been registered successfully", response);
      }
    );
    this.router.navigateByUrl('/rendez-vous');


  }


}

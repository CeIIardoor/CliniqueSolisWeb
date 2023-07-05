import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  getAllPatients(): Observable<any>{
    return this.http.get(`${environment.apiURL}/api/patient/all`)
  }

  deletePatientById(patient_id: number): Observable<any> {
    return this.http.delete(`${environment.apiURL}/api/patient/delete/${patient_id}`)
  }

  updatePatient(patientId: number | undefined, patientData: {
    patient_id: any;
    nom: any;
    prenom: any;
    email: any;
    cin: any;
    telephone: any;
    sexe: any;
  }): Observable<any> {
    let PatientRequest = {
      patient_id: patientData.patient_id,
      nom: patientData.nom,
      prenom: patientData.prenom,
      email: patientData.email,
      cin: patientData.cin,
      telephone: patientData.telephone,
      sexe: patientData.sexe
    }
    return this.http.put(`${environment.apiURL}/api/patient/update/${patientId}`, PatientRequest);
  }

  searchPatient(query: any) : Observable<any> {
    return this.http.get(`${environment.apiURL}/api/patient/search?cin=${query}`)
  }

  addPatient(patientData: {
    patient_id: any;
    nom: any;
    prenom: any;
    email: any;
    cin: any;
    telephone: any;
    sexe: any;
    age: any;

  }) {
    let PatientRequest = {
      patient_id: patientData.patient_id,
      nom: patientData.nom,
      prenom: patientData.prenom,
      email: patientData.email,
      cin: patientData.cin,
      telephone: patientData.telephone,
      sexe: patientData.sexe,
      age: patientData.age
    }
    return this.http.post(`${environment.apiURL}/api/patient/create`, PatientRequest);
  }
}

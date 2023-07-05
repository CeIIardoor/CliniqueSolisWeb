import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class MedecinService {
  constructor(private http: HttpClient) {}

  getAllMedecins(): Observable<any>{
    return this.http.get(`${environment.apiURL}/api/medecin/all`)
  }

  deleteMedecinById(medecin_id: number): Observable<any> {
    return this.http.delete(`${environment.apiURL}/api/medecin/delete/${medecin_id}`)
  }

  updateMedecin(medecinId: number | undefined, medecinData: {
    medecin_id: any;
    nom: any;
    prenom: any;
    email: any;
    cin: any;
    specialite: any;
    telephone: any;
  }): Observable<any> {
    let MedecinRequest = {
      medecin_id: medecinData.medecin_id,
      nom: medecinData.nom,
      prenom: medecinData.prenom,
      email: medecinData.email,
      cin: medecinData.cin,
      specialite: medecinData.specialite,
      telephone: medecinData.telephone
    }
    return this.http.put(`${environment.apiURL}/api/medecin/update/${medecinId}`, MedecinRequest);
  }

  searchMedecin(query: any) : Observable<any> {
    return this.http.get(`${environment.apiURL}/api/medecin/search?cin=${query}`)
  }

  addMedecin(medecinData: {
    medecin_id: any;
    nom: any;
    prenom: any;
    email: any;
    cin: any;
    specialite: any;
    telephone: any;
    diplome: any;

  }) {
    let MedecinRequest = {
      medecin_id: medecinData.medecin_id,
      nom: medecinData.nom,
      prenom: medecinData.prenom,
      email: medecinData.email,
      cin: medecinData.cin,
      specialite: medecinData.specialite,
      telephone: medecinData.telephone,
      diplome: medecinData.diplome
    }
    return this.http.post(`${environment.apiURL}/api/medecin/create`, MedecinRequest);
  }
}

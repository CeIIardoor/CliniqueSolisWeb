import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class RendezVousService {
  constructor(private http: HttpClient) {}

  getAllRendezVous(): Observable<any>{
    return this.http.get(`${environment.apiURL}/api/rendezvous/all`)
  }

  deleteRendezVousById(rendezVous_id: number): Observable<any> {
    return this.http.delete(`${environment.apiURL}/api/rendezvous/deleteRDV/${rendezVous_id}`)
  }

  updateRendezVous(rendezVousId: number | undefined, rendezVousData: {
    rendezVous_id: any;
    date: any;
    heure: any;
    patient_id: any;
    medecin_id: any;
    duree: any;
  }): Observable<any> {
    let RendezVousRequest = {
      rendezVous_id: rendezVousData.rendezVous_id,
      date: rendezVousData.date,
      heure: rendezVousData.heure,
      patient_id: rendezVousData.patient_id,
      medecin_id: rendezVousData.medecin_id,
      duree: rendezVousData.duree
    }
    return this.http.put(`${environment.apiURL}/api/rendezvous/updateRDV/${rendezVousId}`, RendezVousRequest);
  }

  searchRendezVous(query: any) : Observable<any> {
    return this.http.get(`${environment.apiURL}/api/rendezvous/searchRDV?date=${query}`)
  }

  addRendezVous(rendezVousData: {
    rendezVous_id: any;
    date: any;
    heure: any;
    patient_id: any;
    medecin_id: any;
    duree: any;
  }) {
    let RendezVousRequest = {
      rendezVous_id: rendezVousData.rendezVous_id,
      date: rendezVousData.date,
      heure: rendezVousData.heure,
      patient_id: rendezVousData.patient_id,
      medecin_id: rendezVousData.medecin_id,
      duree: rendezVousData.duree
    }
    return this.http.post(`${environment.apiURL}/api/rendezvous/createRDV`, RendezVousRequest);
  }

  getRendezVousById(rendezVous_id: number): Observable<any> {
    return this.http.get(`${environment.apiURL}/api/rendezvous/${rendezVous_id}`)
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError, tap} from "rxjs";
import {CustomResponse} from "../Models/custom-response";
import {Patient} from "../Models/Patient";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private readonly baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  //get all patients
  patients$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.baseUrl}/patient/list`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
  //save patient
  save$ = (patient: Patient) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.baseUrl}/patient/save`, patient)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  edit$ = (patient: Patient): Observable<CustomResponse> =>
    this.http.put<CustomResponse>(`${this.baseUrl}/patient/update/${patient.id}`, patient)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  filter$ = (cin: string, response: CustomResponse): Observable<CustomResponse> =>
    new Observable<CustomResponse>(subscriber => {
      console.log(response);
      subscriber.next(
        cin === ''
          ? response
          : {
            ...response,
            message:
              response.data.patients
                ?.filter(patient => patient.cin === cin).length === 0
                ? `Patient filtered by ${cin}`
                : `Patient with CIN ${cin} not found`
          }
      );
      subscriber.complete();
    }).pipe(
      tap(console.log),
      catchError(this.handleError)
    );


  delete$ = (patientId: number) => <Observable<CustomResponse>>
    this.http.delete<CustomResponse>(`${this.baseUrl}/patient/delete/${patientId}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`Method not implemented.- ${error.status}`);
  }
}

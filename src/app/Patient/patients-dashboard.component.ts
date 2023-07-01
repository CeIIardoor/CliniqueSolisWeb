import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { routeNames } from "../routes";
import { catchError, map, Observable, of, startWith } from "rxjs";
import { AppState } from "./Models/app-state";
import { CustomResponse } from "./Models/custom-response";
import { PatientService } from "./_services/PatientService";
import { DataState } from "./Enums/DataState";
import { Patient } from "./Models/Patient";

@Component({
  selector: 'app-patient',
  templateUrl: './patients-dashboard.component.html',
})
export class PatientsDashboard implements OnInit {
  public patients: Patient[] = [];
  public viewTarget: Patient | null = null;
  public editTarget: Patient | null = null;
  BACKEND_URL = 'http://localhost:8080/api/patient';
  appState$!: Observable<AppState<CustomResponse>>;

  constructor(private router: Router, private patientService: PatientService) {}

  public isDashboard(): boolean {
    return this.router.url.includes(this.routeNames.dashboard);
  }

  protected readonly routeNames = routeNames;

  ngOnInit() {
    this.appState$ = this.patientService.patients$.pipe(
      map(response => {
        return { dataState: DataState.LOADED_STATE, appData: response };
      }),
      startWith({ dataState: DataState.LOADING_STATE }),
      catchError(error => {
        return of({ dataState: DataState.ERROR_STATE, error: error });
      })
    );
  }

  setViewTarget(patientId: any): void {
    // Logic to set the viewTarget based on the patientId
    // For example, you can fetch the patient details from an API or local data
    // and assign it to the viewTarget property
    this.viewTarget = {
      id: patientId,
      nom: 'John', // Add the missing properties with appropriate values
      prenom: 'Doe',
      email: 'john.doe@example.com',
      date_naissance: '1990-01-01',
      // Add the rest of the properties
    } as Patient;
  }

  setEditTarget(patientId: any): void {
    // Logic to set the editTarget based on the patientId
    // Similar to setViewTarget, you can fetch the patient details
    // and assign it to the editTarget property
    this.editTarget = {
      id: patientId,
      nom: 'John', // Add the missing properties with appropriate values
      prenom: 'Doe',
      email: 'john.doe@example.com',
      date_naissance: '1990-01-01',
      // Add the rest of the properties
    } as Patient;
  }
}

import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, fromEvent, tap} from "rxjs";
import {PatientInterface} from "./Models/PatientInterface";
import {PatientService} from "./_services/Patient.service";
import {co} from "@fullcalendar/core/internal-common";

@Component({
  selector: 'app-gestion-patients',
  templateUrl: './gestion-patients.component.html'
})
export class GestionPatientsComponent implements OnInit, OnDestroy {


  // PROPERTIES
  patients: PatientInterface[] = [];
  viewTarget: PatientInterface | null = null;
  editTarget: PatientInterface | null = null;
  @ViewChild('searchInput') searchInputValue: ElementRef | undefined;
  editForm : FormGroup = this.formBuilder.group({
    patient_id: [this.editTarget?.patient_id],
    nom: [this.editTarget?.nom],
    prenom: [this.editTarget?.prenom],
    cin: [this.editTarget?.cin],
    email: [this.editTarget?.email],
    sexe: [this.editTarget?.sexe],
    telephone: [this.editTarget?.telephone],
    age: [this.editTarget?.age],

  });

  addForm: FormGroup = this.formBuilder.group({
      patient_id: [''],
      nom: [''],
      prenom: [''],
      cin: [''],
      email: [''],
      sexe: [''],
      telephone: [''],
      age: [''],
    }
  );

  // CONSTRUCTOR
  constructor(
    private httpClient: HttpClient,
    private GestionPatients: PatientService,
    private formBuilder: FormBuilder,
  ) {
  }


  // LIFECYCLE HOOKS
  ngOnInit(): void {
    this.GestionPatients.getAllPatients().subscribe(
      (data) => {
        this.patients = data.patients;
      }
    )
  }
  ngAfterViewInit() {
    fromEvent(this.searchInputValue?.nativeElement,'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          console.log(this.searchInputValue?.nativeElement.value)
        })
      )
      .subscribe(
        () => {
          this.GestionPatients.searchPatient(this.searchInputValue?.nativeElement.value).subscribe(
            (data) => {
              this.patients = data.patients;
            }
          )
        }
      );
  }
  ngOnDestroy(): void {
    this.viewTarget = null;
    this.editTarget = null;
    this.patients = [];
  }

  // METHODS
  toggleBackgroundBlur(blur: boolean): void {
    if (blur) {
      const bg = document.getElementById('bg');
      bg?.classList.add('bg-black', 'opacity-50', 'top-0', 'left-0', 'w-full', 'h-full', 'fixed', 'z-40');
    } else {
      const bg = document.getElementById('bg');
      bg?.classList.remove('bg-black', 'opacity-50', 'top-0', 'left-0', 'w-full', 'h-full', 'fixed', 'z-40');
    }
  }

  openViewModal(patient_id: number): void {
    const modal = document.getElementById('viewPatientModal');
    modal?.classList.remove('hidden');
    this.toggleBackgroundBlur(true);
    this.viewTarget = this.patients.find(patient => patient.patient_id == patient_id) as PatientInterface;
    console.log(this.viewTarget);

  }

  closeViewModal() {
    const modal = document.getElementById('viewPatientModal');
    modal?.classList.add('hidden');
    this.toggleBackgroundBlur(false);
    this.viewTarget = null;
  }

  openEditModal(patient: PatientInterface): void {
    this.editTarget = this.patients.find(p => p.patient_id == patient.patient_id) as PatientInterface;
    const modal = document.getElementById('editPatientModal');
    modal?.classList.remove('hidden');
    this.toggleBackgroundBlur(true);
  }

  closeEditModal() {
    const modal = document.getElementById('editPatientModal');
    modal?.classList.add('hidden');
    this.toggleBackgroundBlur(false);
    this.editTarget = null;
  }

  deletePatient(patient_id: number) {
    let patient = this.patients.find(patient => patient.patient_id == patient_id) as PatientInterface;

      this.GestionPatients.deletePatientById(patient_id).subscribe(
        (data) => {
          console.log(data);
          this.GestionPatients.getAllPatients().subscribe(
            (data) => {
              this.patients = data.patients;
            }
          );
        }
      );
  }

  onEditFormSubmit(patientId: number | undefined) {
    console.log(patientId);
    console.log("lol");
    console.log(this.editForm.value);
    let patientData = {
      patient_id: this.editForm.value.patient_id,
      nom : this.editForm.value.nom,
      prenom: this.editForm.value.prenom,
      cin: this.editForm.value.cin,
      email: this.editForm.value.email,
      sexe: this.editForm.value.sexe,
      telephone: this.editForm.value.telephone,
      age: this.editForm.value.age,
    }

    this.GestionPatients.updatePatient(patientId, patientData).subscribe(
      () => {
        this.GestionPatients.getAllPatients().subscribe(
          (data) => {
            this.patients = data.patients;
          }
        )
      }
    );
    this.closeEditModal();
  }

  onAddFormSubmit() {
    let patientData = {
      patient_id: this.addForm.value.patient_id,
      nom : this.addForm.value.nom,
      prenom: this.addForm.value.prenom,
      cin: this.addForm.value.cin,
      email: this.addForm.value.email,
      sexe: this.addForm.value.sexe,
      telephone: this.addForm.value.telephone,
      age: this.addForm.value.age,

    }
    this.GestionPatients.addPatient(patientData).subscribe(
      (data) => {
        console.log(data);
        this.GestionPatients.getAllPatients().subscribe(
          (data) => {
            this.patients = data.patients;
          }
        )
      }
    );
    this.closeAddModal();
  }

  closeAddModal() {
    const modal = document.getElementById('addPatientModal');
    modal?.classList.add('hidden');
    this.toggleBackgroundBlur(false);
  }

  openAddModal() {
    const modal = document.getElementById('addPatientModal');
    modal?.classList.remove('hidden');
    this.toggleBackgroundBlur(true);
  }
}

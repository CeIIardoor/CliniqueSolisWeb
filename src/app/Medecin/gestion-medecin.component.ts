import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, fromEvent, tap} from "rxjs";
import {MedecinInterface} from "./Models/MedecinInterface";
import {MedecinService} from "./_services/Medecin.service";
import {co} from "@fullcalendar/core/internal-common";

@Component({
  selector: 'app-gestion-medecins',
  templateUrl: './gestion-medecin.component.html'
})
export class GestionMedecinComponent implements OnInit, OnDestroy {


  // PROPERTIES
  medecins: MedecinInterface[] = [];
  viewTarget: MedecinInterface | null = null;
  editTarget: MedecinInterface | null = null;
  @ViewChild('searchInput') searchInputValue: ElementRef | undefined;
  editForm : FormGroup = this.formBuilder.group({
    medecin_id: [this.editTarget?.medecin_id],
    nom: [this.editTarget?.nom],
    prenom: [this.editTarget?.prenom],
    cin: [this.editTarget?.cin],
    email: [this.editTarget?.email],
    telephone: [this.editTarget?.telephone],
    specialite: [this.editTarget?.specialite],
    diplome: [this.editTarget?.diplome],

  });

  addForm: FormGroup = this.formBuilder.group({
      medecin_id: [''],
      nom: [''],
      prenom: [''],
      cin: [''],
      email: [''],
      telephone: [''],
      specialite: [''],
      diplome: [''],
    }
  );

  // CONSTRUCTOR
  constructor(
    private httpClient: HttpClient,
    private GestionMedecins: MedecinService,
    private formBuilder: FormBuilder,
  ) {
  }


  // LIFECYCLE HOOKS
  ngOnInit(): void {
    this.GestionMedecins.getAllMedecins().subscribe(
      (data) => {
        this.medecins = data.medecins;
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
          this.GestionMedecins.searchMedecin(this.searchInputValue?.nativeElement.value).subscribe(
            (data) => {
              this.medecins = data.medecins;
            }
          )
        }
      );
  }
  ngOnDestroy(): void {
    this.viewTarget = null;
    this.editTarget = null;
    this.medecins = [];
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

  openViewModal(medecin_id: number): void {
    const modal = document.getElementById('viewMedecinModal');
    modal?.classList.remove('hidden');
    this.toggleBackgroundBlur(true);
    this.viewTarget = this.medecins.find(medecin => medecin.medecin_id == medecin_id) as MedecinInterface;
    console.log(this.viewTarget);

  }

  closeViewModal() {
    const modal = document.getElementById('viewMedecinModal');
    modal?.classList.add('hidden');
    this.toggleBackgroundBlur(false);
    this.viewTarget = null;
  }

  openEditModal(medecin: MedecinInterface): void {
    this.editTarget = this.medecins.find(p => p.medecin_id == medecin.medecin_id) as MedecinInterface;
    const modal = document.getElementById('editMedecinModal');
    modal?.classList.remove('hidden');
    this.toggleBackgroundBlur(true);
  }

  closeEditModal() {
    const modal = document.getElementById('editMedecinModal');
    modal?.classList.add('hidden');
    this.toggleBackgroundBlur(false);
    this.editTarget = null;
  }

  deleteMedecin(medecin_id: number) {
    let medecin = this.medecins.find(medecin => medecin.medecin_id == medecin_id) as MedecinInterface;

      this.GestionMedecins.deleteMedecinById(medecin_id).subscribe(
        (data) => {
          console.log(data);
          this.GestionMedecins.getAllMedecins().subscribe(
            (data) => {
              this.medecins = data.medecins;
            }
          );
        }
      );
  }

  onEditFormSubmit(medecinId: number | undefined) {
    console.log(medecinId);
    console.log("lol");
    console.log(this.editForm.value);
    let medecinData = {
      medecin_id: this.editForm.value.medecin_id,
      nom : this.editForm.value.nom,
      prenom: this.editForm.value.prenom,
      cin: this.editForm.value.cin,
      email: this.editForm.value.email,
      telephone: this.editForm.value.telephone,
      specialite: this.editForm.value.specialite,
      diplome: this.editForm.value.diplome,
    }

    this.GestionMedecins.updateMedecin(medecinId, medecinData).subscribe(
      () => {
        this.GestionMedecins.getAllMedecins().subscribe(
          (data) => {
            this.medecins = data.medecins;
          }
        )
      }
    );
    this.closeEditModal();
  }

  onAddFormSubmit() {
    let medecinData = {
      medecin_id: this.addForm.value.medecin_id,
      nom : this.addForm.value.nom,
      prenom: this.addForm.value.prenom,
      cin: this.addForm.value.cin,
      email: this.addForm.value.email,
      telephone: this.addForm.value.telephone,
      specialite: this.addForm.value.specialite,
      diplome: this.addForm.value.diplome,

    }
    this.GestionMedecins.addMedecin(medecinData).subscribe(
      (data) => {
        console.log(data);
        this.GestionMedecins.getAllMedecins().subscribe(
          (data) => {
            this.medecins = data.medecins;
          }
        )
      }
    );
    this.closeAddModal();
  }

  closeAddModal() {
    const modal = document.getElementById('addMedecinModal');
    modal?.classList.add('hidden');
    this.toggleBackgroundBlur(false);
  }

  openAddModal() {
    const modal = document.getElementById('addMedecinModal');
    modal?.classList.remove('hidden');
    this.toggleBackgroundBlur(true);
  }
}

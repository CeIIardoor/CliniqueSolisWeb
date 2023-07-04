import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, fromEvent, tap} from "rxjs";
import {rendezVousInterface} from "../Models/RendezVousInterface";
import {RendezVousService} from "../services/rendezVous.service";

@Component({
  selector: 'app-gestion-rendezVous',
  templateUrl: './gestion-rendezVous.component.html'
})
export class GestionRendezVousComponent implements OnInit, OnDestroy {
  rendezVous: rendezVousInterface[] = [];
  viewTarget: rendezVousInterface | null = null;
  editTarget: rendezVousInterface | null = null;
  @ViewChild('searchInput') searchInputValue: ElementRef | undefined;
  editForm : FormGroup = this.formBuilder.group({
    rendezVous_id: [this.editTarget?.rendezVous_id],
    date: [this.editTarget?.date],
    heure: [this.editTarget?.heure],
    patient_id: [this.editTarget?.patient_id],
    medecin_id: [this.editTarget?.medecin_id],
    duree: [this.editTarget?.duree],

  });
addForm: FormGroup = this.formBuilder.group({
      rendezVous_id: [''],
      date: [''],
      heure: [''],
      patient_id: [''],
      medecin_id: [''],
      duree: [''],
  }
);
constructor(
  private httpClient: HttpClient,
  private GestionRendezVous: RendezVousService,
  private formBuilder: FormBuilder,
) {
}
ngOnInit(): void {
  this.GestionRendezVous.getAllRendezVous().subscribe(
    (data) => {
      this.rendezVous = data.rendezVous;
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
        this.GestionRendezVous.searchRendezVous(this.searchInputValue?.nativeElement.value).subscribe(
          (data) => {
            this.rendezVous = data.rendezVous;
          }
        )
      }
    );
}
ngOnDestroy(): void {
  this.viewTarget = null;
  this.editTarget = null;
  this.rendezVous = [];
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

openViewModal(rendezVous_id: number): void {
  const modal = document.getElementById('viewRendezVousModal');
  modal?.classList.remove('hidden');
this.toggleBackgroundBlur(true);
this.viewTarget = this.rendezVous.find(rendezVous => rendezVous.rendezVous_id == rendezVous_id) as rendezVousInterface;
console.log(this.viewTarget);

}

closeViewModal() {
  const modal = document.getElementById('viewRendezVousModal');
  modal?.classList.add('hidden');
  this.toggleBackgroundBlur(false);
  this.viewTarget = null;
}

openEditModal(rendezVous: rendezVousInterface): void {
  this.editTarget = this.rendezVous.find(rdv => rdv.rendezVous_id == rendezVous.rendezVous_id) as rendezVousInterface;
  const modal = document.getElementById('editRendezVousModal');
  modal?.classList.remove('hidden');
this.toggleBackgroundBlur(true);
}

closeEditModal() {
  const modal = document.getElementById('editRendezVousModal');
  modal?.classList.add('hidden');
  this.toggleBackgroundBlur(false);
  this.editTarget = null;
}

deleteRendezVous(rendezVous_id: number) {
  let rendezVous = this.rendezVous.find(rendezVous => rendezVous.rendezVous_id == rendezVous_id) as rendezVousInterface;

  this.GestionRendezVous.deleteRendezVousById(rendezVous_id).subscribe(
    (data) => {
      console.log(data);
      this.GestionRendezVous.getAllRendezVous().subscribe(
        (data) => {
          this.rendezVous = data.rendezVous;
        }
      );
    }
  );
}

onEditFormSubmit(RendezVousId: number | undefined) {
  console.log(RendezVousId);
  console.log("lol");
  console.log(this.editForm.value);
  let rendezVousData = {
    rendezVous_id: this.editForm.value.rendezVous_id,
    date: this.editForm.value.date,
    heure: this.editForm.value.heure,
    patient_id: this.editForm.value.patient_id,
    medecin_id: this.editForm.value.medecin_id,
    duree: this.editForm.value.duree,
  }

  this.GestionRendezVous.updateRendezVous(RendezVousId, rendezVousData).subscribe(
    () => {
      this.GestionRendezVous.getAllRendezVous().subscribe(
        (data) => {
          this.rendezVous = data.rendezVous;
        }
      )
    }
  );
  this.closeEditModal();
}

onAddFormSubmit() {
  let rendezVousData = {
    rendezVous_id: this.addForm.value.rendezVous_id,
    date: this.addForm.value.date,
    heure: this.addForm.value.heure,
    patient_id: this.addForm.value.patient_id,
    medecin_id: this.addForm.value.medecin_id,
    duree: this.addForm.value.duree,
  }
  this.GestionRendezVous.addRendezVous(rendezVousData).subscribe(
    (data) => {
      console.log(data);
      this.GestionRendezVous.getAllRendezVous().subscribe(
        (data) => {
          this.rendezVous = data.rendezVous;
        }
      )
    }
  );
  this.closeAddModal();
}

closeAddModal() {
  const modal = document.getElementById('addRendezVousModal');
  modal?.classList.add('hidden');
  this.toggleBackgroundBlur(false);
}

openAddModal() {
  const modal = document.getElementById('addRendezVousModal');
  modal?.classList.remove('hidden');
  this.toggleBackgroundBlur(true);
}
}

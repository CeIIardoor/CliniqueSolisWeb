import {Patient_sexe} from "../Enums/patient_sexe";

export interface PatientInterface {
  patient_id: number;
  nom: string;
  prenom: string;
  cin: string;
  email: string;
  date_naissance: string;
  sexe: Patient_sexe;
  telephone: string;
  age: number;
  antecedents : {
    allergies: string;
    antecedentsFamiliaux: string;
    chirurgies: string;
    groupeSanguin: string;
    maladiesChroniques: string;
  }
}

import {Medecin_sexe} from "../Enums/medecin_sexe";

export interface MedecinInterface {
  medecin_id: number;
  nom: string;
  prenom: string;
  email: string;
  cin: string;
  specialite: string;
  diplome: string;
  telephone: string;

}

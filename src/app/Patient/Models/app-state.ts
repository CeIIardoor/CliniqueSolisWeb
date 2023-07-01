import {DataState} from "../Enums/DataState";

export interface AppState <T>{
  dataState: DataState;
  appData?: T;
  errorMessage?: string;
}

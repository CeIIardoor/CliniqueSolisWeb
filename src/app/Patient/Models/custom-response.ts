import {Patient} from "./Patient";

export interface CustomResponse {
    status: number;
    message: string;
    data: {patients?: Patient[],patient?: Patient};
}

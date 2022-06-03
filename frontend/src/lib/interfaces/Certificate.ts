import { IProgram, ITraining } from "./Training";

export interface ICertificate {
    id: string;
    intitule: string;
    code: string;
    objectif: string;
    competence_atteste: string;
    modalite_evaluation: string;
    allouer: ITraining[];
    programmes: IProgram[];
}

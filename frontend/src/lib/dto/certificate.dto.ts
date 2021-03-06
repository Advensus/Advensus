import { ICertificate } from "../interfaces/Certificate";
import { ITrainingProgram } from "../interfaces/TrainingProgram";

export interface NewCertificateDtoIn {
    intitule: string;
    code: string;
    objectif: string;
    competence_atteste: string;
    modalite_evaluation: string;
    allouer: string[];
    description?: string;
    certificate?: string;
}
export interface NewTrainingProgramDtoIn {
    libelle: string;
    description: string;
    attribue: string;
    training: string;
}

export interface NewCertificateDtoOut {
    certificate: ICertificate;
}

export interface NewTrainingProgramDtoOut {
    training_program: ITrainingProgram;
}

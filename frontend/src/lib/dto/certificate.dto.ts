import { ICertificate } from "../interfaces/Certificate";
import { ITrainingProgram } from "../interfaces/TrainingProgram";

export interface NewCertificateDtoIn {
    intitule: string;
    code: string;
    objectifs: string;
    competences_tester: string;
    modaliter_evaluation: string;
    formations: string[];
    description?: string;
    certificate?: string;
}
export interface NewTrainingProgramDtoIn {
    intitule: string;
    description: string;
    certificate: string;
}

export interface NewCertificateDtoOut {
    certificate: ICertificate;
}

export interface NewTrainingProgramDtoOut {
    training_program: ITrainingProgram;
}

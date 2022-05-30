import { ICertificate } from "../interfaces/Certificate";

export interface NewCertificateDtoIn {
    intitule: string;
    code: string;
    objectifs: string;
    competences_tester: string;
    modaliter_evaluation: string;
    formations: string[];
}

export interface NewCertificateDtoOut {
    certificate: ICertificate;
}

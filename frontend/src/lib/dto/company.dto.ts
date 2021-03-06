import { IDropdownOption } from "@fluentui/react";
import { ICompany } from "../interfaces/Company";

export interface NewCompanyDtoOut {
    company_name: string;
    company_adress: string;
    company_phone_number: string;
    fix_number?: string;
    company_stamp: string | Blob;
    company_logo: string | Blob;

    username?: string;
    first_name?: string;
    email?: string;
    phone_number?: string;
    adress?: string;
    password?: string;
    societe: string;
}
export interface NewCompanyDtoIn {
    id: string;
    company_name: string;
    company_adress: string;
    company_phone_number: string;
    fix_number: string;
    // societe?: string;
    company_stamp: string;
    company_logo: string;
    // societe_formation?: string;
}

export interface TrainingCompanyDtoIn {
    trainingCompany: ICompany[];
}

export interface NewOrganizationDtoOut {
    company_name: string;
    company_adress: string;
    company_phone_number: string;
    password_connexion: string;
    password_messagerie: string;
    email: string;
    fix_number?: string;
    company_stamp: string | Blob;
    company_logo: string | Blob;
    societe_formation: string;
}
export interface TrainingOrganizationDtoIn {
    trainingOrganization: ICompany[];
}

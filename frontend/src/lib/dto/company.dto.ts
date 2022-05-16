import { IDropdownOption } from "@fluentui/react";
import { ICompany } from "../interfaces/Company";

export interface NewCompanyDtoOut {
    company_name: string;
    company_adress: string;
    company_phone_number: string;
    fix_number?: string;
    company_stamp?: File;
    company_logo?: File;

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
    phone_number: string;
    fix_number: string;
    societe?: string;
}

export interface TrainingCompanyDtoIn {
    trainingCompany: ICompany[];
}

export interface NewOrganizationDtoOut {
    company_name: string;
    company_adress: string;
    company_phone_number: string;
    fix_number?: string;
    company_stamp?: File;
    company_logo: string;
    societe_formation:
        | IDropdownOption<string>
        | string
        | number
        | string[]
        | number[]
        | null
        | undefined;
}
export interface TrainingOrganizationDtoIn {
    trainingOrganization: ICompany[];
}

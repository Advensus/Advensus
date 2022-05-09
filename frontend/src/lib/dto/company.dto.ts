export interface NewTrainingCompanyDtoOut {
    company_name: string;
    company_adress: string;
    company_phone_number: string;
    fix_number?: string;
    company_stamp?: File;
    company_logo?: File;

    username: string;
    first_name: string;
    email: string;
    phone_number: string;
    adress: string;
    password: string;
    societe_formation_id: string;
}
export interface NewTrainingCompanyDtoIn {
    id: string;
    company_name: string;
    company_adress: string;
    phone_number: string;
    fix_number: string;
}

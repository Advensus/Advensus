export interface NewTrainingCompanyDtoOut {
    company_name: string;
    company_adress: string;
    phone_number: string;
    fix_number?: string;
    company_stamp?: File;
    company_logo?: File;
}
export interface NewTrainingCompanyDtoIn {
    id: string;
    company_name: string;
    company_adress: string;
    phone_number: string;
}

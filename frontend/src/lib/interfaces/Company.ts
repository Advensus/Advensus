import { IUser } from "./User";

export interface ICompany {
    id: string;
    company_name: string;
    company_adress: string;
    company_phone_number: string;
    fix_number: string;
    company_stamp: string;
    company_logo: string;
    societe_admin?: IUser;
}

export interface IOrg {
    societe_formation: ICompany;
    id: string;
    company_name: string;
    company_adress: string;
    company_phone_number: string;
    fix_number: string;
    company_stamp: string;
    company_logo: string;
    email: string;
}

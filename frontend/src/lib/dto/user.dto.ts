import { IDropdownOption } from "@fluentui/react";
import { IUser } from "../interfaces/User";

interface IFromUntil {
    from: string | number;
    until: string | number;
    break?: IBreakOfDay[];
}

interface IBreakOfDay {
    from: string;
    to: string;
}

export interface NewUserDto {
    username: string;
    first_name: string;
    email: string;
    phone_number: string;
    adress: string;
    password: string;
    horaire?: string;
    competence: string[];
    appartenir_societe?: string | number | undefined;
    cv?: string | Blob;
    organisme_formation?: string | number | undefined;

    daysOfWeek?: {
        monday: IFromUntil;
        tuesday: IFromUntil;
        wednesday: IFromUntil;
        thursday: IFromUntil;
        friday: IFromUntil;
        saturday: IFromUntil;
        sunday: IFromUntil;
        attached: string;
    };
    // daysOfWeekToStok?: {
    //     monday: string;
    //     tuesday: string;
    //     wednesday: string;
    //     thursday: string;
    //     friday: string;
    //     saturday: string;
    //     sonday: string;
    // };
}

export interface NewUserDtoOut {
    username: string;
    first_name: string;
    email: string;
    phone_number: string;
    adress: string;
    horaire?: string;
    competence?: string[];
    cv?: string | Blob;
    organisme?: string;
}

export interface NewUserDtoIn {
    user: IUser;
}

export interface UserDtoIn {
    user: IUser[];
}

import { IDropdownOption } from "@fluentui/react";
import { IUser } from "../interfaces/User";

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

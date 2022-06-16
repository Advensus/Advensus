import { IUser } from "../interfaces/User";

export interface NewDocDto {
    doc_categorie: string;
    appartenir: IUser;
    path?: string | Blob;
}
export interface NewDocDtoIn {
    id: string;
    doc_categorie: string;
    appartenir: IUser;
    partager: IUser;
    sign: string | Blob;
    path: string | Blob;
}

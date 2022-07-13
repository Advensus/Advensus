import { IUser } from "./User";

export interface IDocument {
    id: string;
    doc_categorie: string;
    appartenir: IUser;
    partager: IUser;
    sign: string | Blob;
    path: string;
}

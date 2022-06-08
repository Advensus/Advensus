import { ITraining } from "./Training";
import { IUser } from "./User";

export interface ICourses {
    id: string;
    superviser: IUser;
    assister: IUser;
    lier: ITraining;
}

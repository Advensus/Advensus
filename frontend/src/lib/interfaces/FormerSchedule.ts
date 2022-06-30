import { IUser } from "./User";

export interface IFormerSchedule {
    id: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    attached: IUser;
}

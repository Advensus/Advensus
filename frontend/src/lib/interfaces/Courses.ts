import { IBooking } from "./Booking";
import { ITraining } from "./Training";
import { IUser } from "./User";

export interface ICourses {
    id: string;
    superviser: IUser;
    assister: IUser;
    lier: ITraining;
    reservation: IBooking;
}

// export interface IAssiterCourses {
//     id: string;
//     reservation: IBooking;
//     superviser: IUser;
//     lier: ITraining;
// }

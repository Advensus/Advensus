import { ICompany, IOrg } from "./Company";
import { ICourses } from "./Courses";
import { IDocument } from "./Doc";
import { IFormerSchedule } from "./FormerSchedule";
import { ISubscription, ITraining } from "./Training";

export interface IUser {
    id: string;
    username: string;
    first_name: string;
    email: string;
    phone_number: string;
    adress: string;

    is_active?: true;
    avatar?: null;
    signature_former?: null;
    user_type: string;
    session_token?: string;
    horaire?: string;
    cv?: File;
    competence?: ITraining[];
    trainee_level?: string;
    organisme?: IOrg;
    societe?: ICompany;
    appartenir_societe?: ICompany[];
    organisme_formation?: ICompany[];
    is_superuser?: string;
    tokens: string;
    appartenir_content_type: IDocument[];
    souscrirs?: ISubscription[];
    assister: ICourses[];
    superviser: ICourses[];
    trainer_related_schedule: IFormerSchedule;
}

import { IUser } from "../interfaces/User";

export interface NewTraineeDto {
    username: string;
    first_name: string;
    email: string;
    phone_number: string;
    adress: string;
    password: string;
    organisme_formation: string | number | undefined;
    Rp_Stagiaire: string | number | undefined;

    edof: string;
    training_status: string | number | undefined;
    hour_worked: string;
    duration: string;
    start_session: Date | null | undefined | string;
    end_session: Date | null | undefined | string;
    formation: string | number | undefined;
    stagiaire: string;

    // certification: string;
    // programme_formation: string;
    // objectifs_formation: string;
    level_start: string;
    level_end: string;
    lieu_formation: string;
    montant_formation: string;
    solde: string;

    // For docs
    doc_categorie: string;
    appartenir: string;
}

export interface NewTrainingFolderDto {
    edof: string;
    training_status: string | number | undefined;
    hour_worked: string;
    duration: string;
    start_session: Date | null | undefined | string;
    end_session: Date | null | undefined | string;
    formation: string | number | undefined;
    stagiaire: string;
    level_start: string;
    level_end: string;
    lieu_formation: string;
    montant_formation: string;
    solde: string;
}

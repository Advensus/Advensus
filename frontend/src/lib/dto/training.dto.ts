import { ITraining } from "../interfaces/Training";

export interface NewTrainingDtoIn {
    edof: string;
    intitule: string;
    duration: string;
    start_session: string;
    end_session: string;
}

export interface NewTrainingDtoOut {
    training: ITraining;
}

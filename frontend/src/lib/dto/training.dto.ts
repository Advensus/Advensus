import { ITraining } from "../interfaces/Training";

export interface NewTrainingDtoIn {
    // edof: string;
    intitule: string;
}

export interface NewTrainingDtoOut {
    training: ITraining;
}

export interface TrainingDtoIn {
    training: ITraining[];
}

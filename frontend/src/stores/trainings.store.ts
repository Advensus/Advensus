import { ITraining, TrainingDtoIn } from "../lib";
import create, { SetState } from "zustand";

const TRAININGS_KEY = "trainings";
const TRAINING_BY_EDOF_KEY = "edof_training";

type TrainingsStore = {
    trainings: TrainingDtoIn;
    updateCurrentTrainings: (trainings: TrainingDtoIn) => void;
    trainingByEdof: ITraining[];
    updateCurrentEdofTraining: (trainingByEdof: ITraining[]) => void;
};

export const useTrainingsStore = create<TrainingsStore>(
    (set: SetState<TrainingsStore>) => {
        const current_trainings = localStorage.getItem(TRAININGS_KEY);
        const current_training_by_edof =
            localStorage.getItem(TRAINING_BY_EDOF_KEY);

        return {
            trainings: current_trainings ? JSON.parse(current_trainings) : null,
            trainingByEdof: current_training_by_edof
                ? JSON.parse(current_training_by_edof)
                : null,

            updateCurrentTrainings: (trainings): void => {
                set({ trainings });
            },

            updateCurrentEdofTraining: (trainingByEdof): void => {
                set({ trainingByEdof });
                console.log({ trainingByEdof });
            },
        };
    }
);

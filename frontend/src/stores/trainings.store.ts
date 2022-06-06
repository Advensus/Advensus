import { TrainingDtoIn } from "../lib";
import create, { SetState } from "zustand";

const TRAININGS_KEY = "trainings";

type TrainingsStore = {
    trainings: TrainingDtoIn;
    updateCurrentTrainings: (trainings: TrainingDtoIn) => void;
};

export const useTrainingsStore = create<TrainingsStore>(
    (set: SetState<TrainingsStore>) => {
        const current_trainings = localStorage.getItem(TRAININGS_KEY);

        return {
            trainings: current_trainings ? JSON.parse(current_trainings) : null,

            updateCurrentTrainings: (trainings): void => {
                set({ trainings });
            },
        };
    }
);

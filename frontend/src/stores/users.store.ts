import { IUser, LoginDtoOut, UserDtoIn } from "../lib";
import create, { SetState } from "zustand";

const USERS_KEY = "users";
const TRAINEE_SCH_KEY = "trainee_schedule";

interface IItemDrop {
    id: string;
    name: string;
}

type UsersStore = {
    users: UserDtoIn;
    trainee_schedule: string;
    updateCurrentUsers: (users: UserDtoIn) => void;
    updateViewTraineeSchedule: (trainee: string) => void;
};

export const useUsersStore = create<UsersStore>((set: SetState<UsersStore>) => {
    const current_users = localStorage.getItem(USERS_KEY);
    const current_trainee_schedule = localStorage.getItem(TRAINEE_SCH_KEY);

    return {
        users: current_users ? JSON.parse(current_users) : null,
        trainee_schedule: current_trainee_schedule
            ? JSON.parse(current_trainee_schedule)
            : null,

        updateCurrentUsers: (users): void => {
            set({ users });
        },

        updateViewTraineeSchedule: (trainee_schedule): void => {
            set({ trainee_schedule });
        },
    };
});

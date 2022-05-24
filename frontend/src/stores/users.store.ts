import { IUser, LoginDtoOut, UserDtoIn } from "../lib";
import create, { SetState } from "zustand";

const USERS_KEY = "users";

type UsersStore = {
    users: UserDtoIn;
    updateCurrentUsers: (users: UserDtoIn) => void;
};

export const useUsersStore = create<UsersStore>((set: SetState<UsersStore>) => {
    const current_users = localStorage.getItem(USERS_KEY);

    return {
        users: current_users ? JSON.parse(current_users) : null,

        updateCurrentUsers: (users): void => {
            set({ users });
            console.log("le users dans useUsers store:", users);
        },
    };
});

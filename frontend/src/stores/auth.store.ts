import { LoginDtoOut } from "../lib";
import create, { SetState } from "zustand";

const USER_KEY = "user";
const TOKEN_KEY = "access_token";
// const USER_TYPE = "user_type";

// export interface theToken {
//     refresh: string;
//     access: string;
// }

type AuthStore = {
    user: LoginDtoOut["user"];
    // user_type: LoginDtoOut["user_type"];
    token: string;
    updateCurrentUser: (user: LoginDtoOut["user"]) => void;
    updateToken: (token: string) => void;
    // updateCurrentUserType: (user_type: LoginDtoOut["user_type"]) => void;
};

export const useAuthStore = create<AuthStore>((set: SetState<AuthStore>) => {
    const current_user = localStorage.getItem(USER_KEY);
    const current_token = localStorage.getItem(TOKEN_KEY);
    // const current_user_type = localStorage.getItem(USER_TYPE);

    return {
        user: current_user ? JSON.parse(current_user) : null,
        token: current_token ? JSON.parse(current_token) : null,
        // user_type: current_user_type ? JSON.parse(current_user_type) : null,

        updateCurrentUser: (user): void => {
            set({ user });
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        },
        // updateCurrentUserType: (user_type: any): void => {
        //     set({ user_type });
        //     localStorage.setItem(USER_TYPE, JSON.stringify(user_type));
        // },

        updateToken: (token): void => {
            set({ token });
            localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
            // if (token) console.log('le token stocké :', JSON.parse(token));
            console.log("le token stocké :", JSON.stringify(token));
        },
    };
});

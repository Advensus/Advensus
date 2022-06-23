import { ISubscription, IUser, LoginDtoOut, UserDtoIn } from "../lib";
import create, { SetState } from "zustand";

const USERS_KEY = "subscriptions";

type SubscriptionStore = {
    subscriptions: ISubscription[];
    updateCurrentSubscriptions: (subscriptions: ISubscription[]) => void;
};

export const useSubscriptionStore = create<SubscriptionStore>(
    (set: SetState<SubscriptionStore>) => {
        const current_subscriptions = localStorage.getItem(USERS_KEY);

        return {
            subscriptions: current_subscriptions
                ? JSON.parse(current_subscriptions)
                : null,

            updateCurrentSubscriptions: (subscriptions): void => {
                set({ subscriptions });
            },
        };
    }
);

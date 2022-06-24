import { ISubscription, IUser, LoginDtoOut, UserDtoIn } from "../lib";
import create, { SetState } from "zustand";

const USERS_KEY = "subscriptions";
const NEW_SUBSCRIPTION_KEY = "new_subscription";
const NEW_USER_SUBSCRIPTION_KEY = "user_subscribe";

type SubscriptionStore = {
    subscriptions: ISubscription[];
    newSubscription: ISubscription;
    user: IUser;
    updateCurrentSubscriptions: (subscriptions: ISubscription[]) => void;
    getTraineeNewSubscription: (
        newSubscription: ISubscription,
        user: IUser
    ) => void;
};

export const useSubscriptionStore = create<SubscriptionStore>(
    (set: SetState<SubscriptionStore>) => {
        const current_subscriptions = localStorage.getItem(USERS_KEY);
        const current_subscription = localStorage.getItem(NEW_SUBSCRIPTION_KEY);
        const current_subscription_user = localStorage.getItem(
            NEW_USER_SUBSCRIPTION_KEY
        );

        return {
            subscriptions: current_subscriptions
                ? JSON.parse(current_subscriptions)
                : null,
            newSubscription: current_subscription
                ? JSON.parse(current_subscription)
                : null,
            user: current_subscription_user
                ? JSON.parse(current_subscription_user)
                : null,

            updateCurrentSubscriptions: (subscriptions): void => {
                set({ subscriptions });
            },
            getTraineeNewSubscription: (newSubscription, user): void => {
                set({ newSubscription, user });
            },
        };
    }
);

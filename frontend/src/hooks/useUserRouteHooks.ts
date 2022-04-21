import { useEffect, useState } from "react";
import {
    AccountComponent,
    IRoute,
    SettingsComponent,
    StatisticsComponent,
    TrainingOrganizationComponent,
} from "../components";
import { ADMIN_OF, RP, SUPER_RP, SUPER_USER, TEACHEAR, TRAINEE } from "../lib";
import { UsersPage } from "../pages";
import { useAuthStore } from "../stores";

export function useUserRouteHooks() {
    const [userRoutes, setUserRoutes] = useState<IRoute[]>([]);
    const { user_type } = useAuthStore();

    console.log({ user_type });

    const menuRoutes: IRoute[] = [
        {
            path: `account`,
            label: "Account",
            icon: "la-id-badge",
            component: AccountComponent,
            roles: [SUPER_USER, ADMIN_OF, SUPER_RP, RP, TEACHEAR, TRAINEE],
        },
        {
            path: `stat`,
            label: "Statistics",
            icon: "la-id-badge",
            component: StatisticsComponent,
            roles: [SUPER_USER, ADMIN_OF],
        },
        {
            path: `customer`,
            label: "Stagiaire",
            icon: "la-id-badge",
            component: UsersPage,
            roles: [SUPER_USER, ADMIN_OF, SUPER_RP, RP, TEACHEAR],
        },
        {
            path: `path3`,
            label: "Ressources",
            icon: "la-id-badge",
            component: UsersPage,
            roles: [SUPER_USER, ADMIN_OF],
        },
        {
            path: `of`,
            label: "Organismes",
            icon: "la-id-badge",
            component: TrainingOrganizationComponent,
            roles: [SUPER_USER, ADMIN_OF],
        },
        // {
        //     path: `path3`,
        //     label: "Ressources",
        //     icon: "la-id-badge",
        //     component: UsersPage,
        //     roles: [SUPER_USER, ADMIN_OF],
        // },
        {
            path: `settings`,
            label: "Paramétrer",
            icon: "la-id-badge",
            component: SettingsComponent,
            roles: [SUPER_USER, ADMIN_OF],
        },
    ];

    useEffect(() => {
        if (!user_type) {
            setUserRoutes([]);
            return;
        }
        // const role_currentUser = user_type;
        console.log({ user_type });
        const filteredRoutes = menuRoutes.filter((route) => {
            return route.roles.includes(user_type);
        });
        setUserRoutes(filteredRoutes);
        console.log({ filteredRoutes });
        // return userRoutes;
    }, [user_type]);

    return userRoutes;
}

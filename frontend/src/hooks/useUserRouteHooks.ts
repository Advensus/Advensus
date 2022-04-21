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
            label: "Statistiques",
            icon: "la-id-badge",
            component: StatisticsComponent,
            roles: [SUPER_USER, TEACHEAR, ADMIN_OF],
        },
        {
            path: `of`,
            label: "Organismes",
            icon: "la-id-badge",
            component: TrainingOrganizationComponent,
            roles: [SUPER_USER],
        },

        // Super Rp & Rp
        {
            path: `customer`,
            label: "Stagiaire",
            icon: "la-id-badge",
            component: UsersPage,
            roles: [SUPER_USER, ADMIN_OF, SUPER_RP, RP],
        },
        {
            path: `path3`,
            label: "Ressources",
            icon: "la-id-badge",
            component: UsersPage,
            roles: [SUPER_USER, ADMIN_OF, SUPER_RP, RP],
        },

        // Teacher
        {
            path: `planne`,
            label: "Planning",
            icon: "la-id-badge",
            component: TrainingOrganizationComponent,
            roles: [SUPER_USER, TEACHEAR, SUPER_RP, RP],
        },
        {
            path: `visio`,
            label: "Visio",
            icon: "la-id-badge",
            component: TrainingOrganizationComponent,
            roles: [SUPER_USER, TEACHEAR],
        },
        {
            path: `doc`,
            label: "Documents admin",
            icon: "la-id-badge",
            component: TrainingOrganizationComponent,
            roles: [SUPER_USER, TEACHEAR],
        },
        {
            path: `mod_form`,
            label: "Modules de formation",
            icon: "la-id-badge",
            component: TrainingOrganizationComponent,
            roles: [SUPER_USER, TEACHEAR],
        },

        // Stagiaire
        {
            path: `bord`,
            label: "Tabela de bord",
            icon: "la-id-badge",
            component: TrainingOrganizationComponent,
            roles: [TRAINEE],
        },
        {
            path: `planninn`,
            label: "Programme de formation",
            icon: "la-id-badge",
            component: TrainingOrganizationComponent,
            roles: [TRAINEE],
        },
        {
            path: `planninn`,
            label: "Test de niveau",
            icon: "la-id-badge",
            component: TrainingOrganizationComponent,
            roles: [TRAINEE],
        },
        {
            path: `reserv`,
            label: "Réservation de cours",
            icon: "la-id-badge",
            component: TrainingOrganizationComponent,
            roles: [TRAINEE],
        },
        {
            path: `nextcours`,
            label: "Prochaine cours",
            icon: "la-id-badge",
            component: TrainingOrganizationComponent,
            roles: [TRAINEE],
        },
        {
            path: `hist`,
            label: "Historique",
            icon: "la-id-badge",
            component: TrainingOrganizationComponent,
            roles: [TRAINEE],
        },
        {
            path: `nextcours`,
            label: "Mes documents",
            icon: "la-id-badge",
            component: TrainingOrganizationComponent,
            roles: [TRAINEE],
        },
        {
            path: `test`,
            label: "Test vidéoconférence",
            icon: "la-id-badge",
            component: TrainingOrganizationComponent,
            roles: [TRAINEE],
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

import { useEffect, useState } from "react";
import {
    AccountComponent,
    IRoute,
    SettingsComponent,
    StatisticsComponent,
    TrainingOrganizationCardComponent,
} from "../components";
import {
    ADMIN_OF,
    CUSTOMER,
    PATH_LABEL_CUSTOMER,
    PATH_LABEL_ORGANIZATION,
    PATH_LABEL_RESOURCES,
    PATH_LABEL_SERVICES,
    RESOURCES,
    RP,
    SERVICES,
    SUPER_RP,
    SUPER_USER,
    TEACHEAR,
    TRAINEE,
} from "../lib";
import { UsersPage } from "../pages";
import { useAuthStore } from "../stores";

export function useUserRouteHooks() {
    const [userRoutes, setUserRoutes] = useState<IRoute[]>([]);
    const { user_type } = useAuthStore();

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
            label: `${PATH_LABEL_ORGANIZATION}`,
            icon: "la-id-badge",
            component: UsersPage,
            roles: [SUPER_USER],
        },

        //  Super Rp & Rp
        {
            path: `${user_type}/${CUSTOMER}`,
            label: `${PATH_LABEL_CUSTOMER}`,
            icon: "la-id-badge",
            component: UsersPage,
            roles: [SUPER_USER, ADMIN_OF, SUPER_RP, RP],
        },
        {
            path: `${user_type}/${RESOURCES}`,
            label: `${PATH_LABEL_RESOURCES}`,
            icon: "la-id-badge",
            component: UsersPage,
            roles: [SUPER_USER, ADMIN_OF, SUPER_RP, RP],
        },
        {
            path: `${user_type}/${SERVICES}`,
            label: `${PATH_LABEL_SERVICES}`,
            icon: "la-id-badge",
            component: UsersPage,
            roles: [SUPER_USER, ADMIN_OF, SUPER_RP, RP],
        },

        // Teacher
        {
            path: `planne`,
            label: "Planning",
            icon: "la-id-badge",
            component: TrainingOrganizationCardComponent,
            roles: [SUPER_USER, TEACHEAR, SUPER_RP, RP],
        },
        {
            path: `visio`,
            label: "Visio",
            icon: "la-id-badge",
            component: TrainingOrganizationCardComponent,
            roles: [SUPER_USER, TEACHEAR],
        },
        {
            path: `doc`,
            label: "Documents admin",
            icon: "la-id-badge",
            component: TrainingOrganizationCardComponent,
            roles: [SUPER_USER, TEACHEAR],
        },
        {
            path: `mod_form`,
            label: "Modules de formation",
            icon: "la-id-badge",
            component: TrainingOrganizationCardComponent,
            roles: [SUPER_USER, TEACHEAR],
        },

        // Stagiaire
        {
            path: `bord`,
            label: "Tabela de bord",
            icon: "la-id-badge",
            component: TrainingOrganizationCardComponent,
            roles: [TRAINEE],
        },
        {
            path: `planninn`,
            label: "Programme de formation",
            icon: "la-id-badge",
            component: TrainingOrganizationCardComponent,
            roles: [TRAINEE],
        },
        {
            path: `planninn`,
            label: "Test de niveau",
            icon: "la-id-badge",
            component: TrainingOrganizationCardComponent,
            roles: [TRAINEE],
        },
        {
            path: `reserv`,
            label: "Réservation de cours",
            icon: "la-id-badge",
            component: TrainingOrganizationCardComponent,
            roles: [TRAINEE],
        },
        {
            path: `nextcours`,
            label: "Prochaine cours",
            icon: "la-id-badge",
            component: TrainingOrganizationCardComponent,
            roles: [TRAINEE],
        },
        {
            path: `hist`,
            label: "Historique",
            icon: "la-id-badge",
            component: TrainingOrganizationCardComponent,
            roles: [TRAINEE],
        },
        {
            path: `nextcours`,
            label: "Mes documents",
            icon: "la-id-badge",
            component: TrainingOrganizationCardComponent,
            roles: [TRAINEE],
        },
        {
            path: `test`,
            label: "Test vidéoconférence",
            icon: "la-id-badge",
            component: TrainingOrganizationCardComponent,
            roles: [TRAINEE],
        },
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
        const filteredRoutes = menuRoutes.filter((route) => {
            return route.roles.includes(user_type);
        });
        setUserRoutes(filteredRoutes);
    }, [user_type]);

    return userRoutes;
}

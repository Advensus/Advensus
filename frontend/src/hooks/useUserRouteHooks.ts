import { useEffect, useState } from "react";
import {
    AccountComponent,
    IRoute,
    SettingsComponent,
    TrainingOrganizationCardComponent,
    TrainingProgramComponent,
} from "../components";
import {
    ADMIN_OF,
    CALL_CENTER,
    CUSTOMER,
    PATH_LABEL_CALL_CENTER,
    PATH_LABEL_COMPANY,
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
import {
    AdministrativeDocsPage,
    HistoricalPage,
    LessonBookingPage,
    LevelTestPage,
    NextLessonPage,
    ResourcesPage,
    SchedulerPage,
    StatisticsPage,
    TraineeDocsPage,
    TraineesPage,
    TrainingCompanyPage,
    TrainingModulePage,
    TrainingOrganisationPage,
    TrainingsPage,
    UsersPage,
    VisioPage,
} from "../pages";
import { useAuthStore } from "../stores";

export function useUserRouteHooks() {
    const [userRoutes, setUserRoutes] = useState<IRoute[]>([]);
    const { user } = useAuthStore();

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
            label: "Tableaux de bord",
            icon: "la-id-badge",
            component: StatisticsPage,
            roles: [SUPER_USER, TEACHEAR, ADMIN_OF, TRAINEE],
        },
        {
            path: `company`,
            label: `${PATH_LABEL_COMPANY}`,
            icon: "la-id-badge",
            component: TrainingCompanyPage,
            roles: [SUPER_USER],
        },
        {
            path: `of`,
            label: `${PATH_LABEL_ORGANIZATION}`,
            icon: "la-id-badge",
            component: TrainingOrganisationPage,
            roles: [SUPER_USER],
        },

        //  Super Rp & Rp
        {
            path: `${user?.id}/${CUSTOMER}`,
            label: `${PATH_LABEL_CUSTOMER}`,
            icon: "la-id-badge",
            component: TraineesPage,
            roles: [SUPER_USER, ADMIN_OF, SUPER_RP, RP],
        },
        {
            path: `${user?.id}/${RESOURCES}`,
            label: `${PATH_LABEL_RESOURCES}`,
            icon: "la-id-badge",
            component: ResourcesPage,
            roles: [SUPER_USER, ADMIN_OF, SUPER_RP, RP],
        },
        {
            path: `${user?.id}/${SERVICES}`,
            label: `${PATH_LABEL_SERVICES}`,
            icon: "la-id-badge",
            component: TrainingsPage,
            roles: [SUPER_USER, ADMIN_OF, SUPER_RP, RP],
        },
        {
            path: `${user?.id}/${CALL_CENTER}`,
            label: `${PATH_LABEL_CALL_CENTER}`,
            icon: "la-id-badge",
            component: TrainingsPage,
            roles: [SUPER_USER, ADMIN_OF, SUPER_RP, RP],
        },

        // Teacher
        {
            path: `planne`,
            label: "Planning",
            icon: "la-id-badge",
            component: SchedulerPage,
            roles: [SUPER_USER, TEACHEAR, SUPER_RP, RP],
        },
        {
            path: `visio`,
            label: "Visio",
            icon: "la-id-badge",
            component: VisioPage,
            roles: [SUPER_USER, TEACHEAR],
        },
        {
            path: `doc`,
            label: "Documents admin",
            icon: "la-id-badge",
            component: AdministrativeDocsPage,
            roles: [SUPER_USER, TEACHEAR],
        },
        {
            path: `mod_form`,
            label: "Modules de formation",
            icon: "la-id-badge",
            component: TrainingModulePage,
            roles: [SUPER_USER, TEACHEAR],
        },

        // Stagiaire
        // {
        //     path: `bord`,
        //     label: "Tabela de bord",
        //     icon: "la-id-badge",
        //     component: TrainingOrganizationCardComponent,
        //     roles: [TRAINEE],
        // },
        {
            path: `programm`,
            label: "Programme de formation",
            icon: "la-id-badge",
            component: TrainingProgramComponent,
            roles: [TRAINEE],
        },
        {
            path: `testlevel`,
            label: "Test de niveau",
            icon: "la-id-badge",
            component: LevelTestPage,
            roles: [TRAINEE],
        },
        {
            path: `reserv`,
            label: "Réservation de cours",
            icon: "la-id-badge",
            component: LessonBookingPage,
            roles: [TRAINEE],
        },
        {
            path: `nextcours`,
            label: "Prochaine cours",
            icon: "la-id-badge",
            component: NextLessonPage,
            roles: [TRAINEE],
        },
        {
            path: `hist`,
            label: "Historique",
            icon: "la-id-badge",
            component: HistoricalPage,
            roles: [TRAINEE],
        },
        {
            path: `docs`,
            label: "Mes documents",
            icon: "la-id-badge",
            component: TraineeDocsPage,
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
        if (!user) {
            setUserRoutes([]);
            return;
        }
        const filteredRoutes = menuRoutes.filter((route) => {
            return route.roles.includes(user.user_type);
        });
        setUserRoutes(filteredRoutes);
    }, [user]);

    return userRoutes;
}

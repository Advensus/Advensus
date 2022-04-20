import { useEffect, useState } from "react";
import { IRoute } from "../components";
import { SUPER_USER, TRAINEE } from "../lib";
import { UsersPage } from "../pages";
import { useAuthStore } from "../stores";

export function useUserRouteHooks() {
    const [userRoutes, setUserRoutes] = useState<IRoute[]>([]);
    const { user_type } = useAuthStore();

    console.log({ user_type });

    const menuRoutes: IRoute[] = [
        {
            path: `path1`,
            label: "Label1",
            icon: "icon 1",
            component: "component1",
            roles: [SUPER_USER, TRAINEE],
        },
        {
            path: `path2`,
            label: "Label2",
            icon: "la-id-badge",
            component: "component2",
            roles: [SUPER_USER],
        },
        {
            path: `path3`,
            label: "Label3",
            icon: "icon 3",
            component: "component3",
            roles: [SUPER_USER],
        },
        {
            path: `usersss`,
            label: "user_page",
            icon: "la-id-mail",
            component: UsersPage,
            roles: [SUPER_USER, TRAINEE],
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

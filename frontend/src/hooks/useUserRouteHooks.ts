import { useEffect, useState } from "react";
import { IRoute } from "../components";

export function useUserRouteHooks() {
    const [userRoutes, setUserRoutes] = useState<IRoute[]>([]);

    const menuRoutes: IRoute[] = [
        {
            path: `path1`,
            label: "Label1",
            icon: "icon 1",
            component: "component1",
        },
        {
            path: `path2`,
            label: "Label2",
            icon: "icon 2",
            component: "component2",
        },
        {
            path: `path3`,
            label: "Label3",
            icon: "icon 3",
            component: "component3",
        },
    ];

    // useEffect(() => {
    //     // if(!user) {
    //     //     setUserRoutes([]);
    //     //     return;
    //     // }
    //     setUserRoutes(menuRoutes);
    //     // return userRoutes;
    // }, []);

    return menuRoutes;
}

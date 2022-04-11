import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserRouteHooks } from "../../../hooks";

export interface SideNavBaseProps {
    default_props?: boolean;
}

export interface IRoute {
    path: string;
    icon: string;
    label: string;
    action?: () => void;
    component: any;
    // roles: IRole[];
}

export const SideNavComponent: React.FC<SideNavBaseProps> = () => {
    useEffect(() => {
        console.log(menuRoutes);
    }, []);
    const menuRoutes = useUserRouteHooks();

    return (
        <nav className="sidenav">
            {menuRoutes.map((_) => (
                <NavLink
                    key={_.path}
                    to={_.path}
                    className={({ isActive }) =>
                        [
                            "sidenav__route",
                            isActive ? "sidenav__route--current" : null,
                        ]
                            .filter(Boolean)
                            .join(" ")
                    }
                >
                    {_.icon}
                    <span>{_.label}</span>
                </NavLink>
            ))}
            <div className="sidenav_footer">The nav footer</div>
        </nav>
    );
};

import { DefaultButton } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
    CurrentUserDetailsComponent,
    HeaderDashboardComponent,
    SideNavComponent,
} from "../../../components";
import { useUserRouteHooks } from "../../../hooks";
// import { RouteProps } from "react-router";

export interface IDashboardShellPageProps {
    default_props?: boolean;
}

export const DashboardShellPage: React.FC<IDashboardShellPageProps> = () => {
    const accessRoutes = useUserRouteHooks();

    useEffect(() => {
        console.log({ accessRoutes });
    }, []);

    return (
        <main className="dashboard_shell_container">
            <HeaderDashboardComponent />
            <div className="dashboard_shell_content">
                <div id="sidenav_panel">
                    <SideNavComponent />
                </div>
                <section id="section">
                    <Routes>
                        {accessRoutes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<route.component />}
                            />
                        ))}
                    </Routes>
                </section>
            </div>
        </main>
    );
};

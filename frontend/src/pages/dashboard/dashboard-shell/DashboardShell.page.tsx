import React from "react";
import { Route, Routes } from "react-router-dom";
import {
    HeaderDashboardComponent,
    SideNavComponent,
} from "../../../components";
import { useUserRouteHooks } from "../../../hooks";

export interface IDashboardShellPageProps {
    default_props?: boolean;
}

export const DashboardShellPage: React.FC<IDashboardShellPageProps> = () => {
    const accessRoutes = useUserRouteHooks();

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

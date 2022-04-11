import { DefaultButton } from "@fluentui/react";
import React, { useEffect } from "react";
import {
    HeaderDashboardComponent,
    SideNavComponent,
} from "../../../components";
// import { RouteProps } from "react-router";

export interface IDashboardShellPageProps {
    default_props?: boolean;
}

export const DashboardShellPage: React.FC<IDashboardShellPageProps> = () => {
    useEffect(() => {
        console.log(
            "the test:",
            (document.getElementById("sidenav_panel") as HTMLInputElement)
                .offsetWidth
        );
    }, []);

    return (
        <main className="dashboard_shell_container">
            <HeaderDashboardComponent />
            <div className="dashboard_shell_content">
                <div id="sidenav_panel">
                    <SideNavComponent />
                </div>
                <section className="dashboard_shell_body" id="section">
                    Routes map here
                </section>
            </div>
        </main>
    );
};

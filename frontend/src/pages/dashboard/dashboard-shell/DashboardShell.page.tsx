import { DefaultButton } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import {
    CurrentUserDetailsComponent,
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
                <section id="section">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sed, neque quo ea aspernatur quisquam reprehenderit harum
                    amet et mollitia dolor necessitatibus? Molestias
                    exercitationem ab placeat reiciendis a voluptatem iste
                    aspernatur! Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Qui officia molestias aspernatur laborum
                    corrupti sed, magnam quis rem repudiandae praesentium minus!
                    Maiores eaque aliquid molestiae magnam ducimus eos corporis
                    numquam. Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit. Nesciunt distinctio repellendus illum accusamus illo
                    at ab fugiat, aliquid consequuntur nostrum esse adipisci
                    vel, ea, quisquam facere deleniti fugit mollitia ipsam?
                </section>
            </div>
        </main>
    );
};

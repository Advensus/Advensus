import { DefaultButton } from "@fluentui/react";
import React, { useEffect, useState } from "react";
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

    // Handle media query
    const [isMobile, setIsMobile] = useState<Boolean>(false);
    function mqChange(mq: any) {
        setIsMobile(mq.matches);
    }
    useEffect(() => {
        const mq = window.matchMedia("screen and (max-width: 748px)");
        mq.addListener(mqChange);
        mqChange(mq);

        return () => {
            mq.removeListener(mqChange);
        };
    }, []);

    return (
        <main className="dashboard_shell_container">
            <HeaderDashboardComponent />
            <div className="dashboard_shell_content">
                <div id="sidenav_panel">
                    {isMobile ? (
                        <div className="user_action_mobile">
                            User profil Mobile
                        </div>
                    ) : null}
                    <SideNavComponent />
                </div>
                <section className="dashboard_shell_body" id="section">
                    Routes map here
                </section>
            </div>
        </main>
    );
};

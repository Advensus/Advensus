import { DefaultButton } from "@fluentui/react";
import React, { useState } from "react";

export interface IHeaderDashboardProps {
    default_props?: boolean;
}

export const HeaderDashboardComponent: React.FC<IHeaderDashboardProps> = () => {
    const openNav = () => {
        (
            document.getElementById("sidenav_panel") as HTMLInputElement
        ).style.width = "250px";
        console.log(
            "the test:",
            (document.getElementById("section") as HTMLInputElement).offsetWidth
        );
    };

    const toggleNav = () => {
        let sidenavBar = document.getElementById(
            "sidenav_panel"
        ) as HTMLInputElement;

        if (sidenavBar.offsetWidth >= 200) {
            closeNav();
        } else {
            openNav();
        }
    };

    const closeNav = () => {
        (
            document.getElementById("sidenav_panel") as HTMLInputElement
        ).style.width = "60px";
        (
            document.getElementById("section") as HTMLInputElement
        ).style.marginLeft = "0";
    };

    return (
        <div className="header_dashboard_container">
            <div className="header_left">
                <DefaultButton text="Menu" onClick={toggleNav} />
                <div>User profil</div>
            </div>
            <div className="header_center">Center div</div>
            <div className="header_right">Right div Logo</div>
        </div>
    );
};

import React from "react";
// import { RouteProps } from "react-router";

export interface IUsersPageProps {
    default_props?: boolean;
}

export const UsersPage: React.FC<IUsersPageProps> = () => {
    const openNav = () => {
        (
            document.getElementById("display_content") as HTMLInputElement
        ).style.width = "170px";
    };
    const closeNav = () => {
        (
            document.getElementById("display_content") as HTMLInputElement
        ).style.width = "0";
        console.log("closeNav was clicked");
    };

    return (
        <div className="users_container">
            <div id="users_content_display" className="users_content_display">
                Ce qui ne me vient pas en tête..
            </div>
        </div>
    );
};

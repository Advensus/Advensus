import { Text } from "@fluentui/react";
import React, { useState } from "react";
import { UsersDisplayComponent, UserInfosComponent } from "../../";

export interface IUserDetailsProps {
    default_props?: boolean;
}

export const UserDetailsComponent: React.FC<IUserDetailsProps> = () => {
    return (
        <div className="user_details_container">
            <div className="user_details_header">
                {/* <UsersDisplayComponent /> */}
                <div className="user_details_init">INIT</div>
                <Text variant="large">User full name</Text>
            </div>
            <hr />
            <UserInfosComponent keyWord="Ressource ID" valueWord="Valeur" />
            <UserInfosComponent keyWord="Firstname" valueWord="Valeur" />
            <UserInfosComponent keyWord="Lastname" valueWord="Valeur" />
        </div>
    );
};

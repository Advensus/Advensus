import { Text } from "@fluentui/react";
import React, { useState } from "react";
import { UsersDisplayComponent } from "../default_users/users_display/users_display.component";

export interface IUserDetailsProps {
    default_props?: boolean;
}

export const UserDetailsComponent: React.FC<IUserDetailsProps> = () => {
    return (
        <div className="user_details_container">
            <div className="user_details_header">
                <UsersDisplayComponent />
            </div>
            <hr />
            <div>
                <Text variant="medium" style={{ fontWeight: "bolder" }}>
                    Ressource ID :
                </Text>
                <Text variant="small" style={{ fontWeight: "lighter" }}>
                    {" "}
                    Valeur
                </Text>
                <hr className="hr_dashed_details" />
            </div>
        </div>
    );
};

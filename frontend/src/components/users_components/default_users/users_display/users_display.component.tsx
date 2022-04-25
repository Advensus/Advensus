import { Text } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../../../lib";

export interface IUsersDisplayProps {
    default_props?: boolean;
    detailsInfos: IUser;
    toggleTab?: () => void;
}

export const UsersDisplayComponent: React.FC<IUsersDisplayProps> = ({
    toggleTab,
    detailsInfos,
}) => {
    useEffect(() => {
        console.log({ detailsInfos });
    }, []);

    return (
        <Link to="#" onClick={toggleTab} className="users_display_container">
            <div className="users_display_item">
                <div className="action_icon">icon</div>
                <Text style={{ alignSelf: "center" }}>Abrégé</Text>
            </div>
            <div className="users_display_text">
                <Text variant="small" style={{ fontWeight: "bold" }}>
                    Full name
                </Text>
                <Text variant="tiny" className="users_status">
                    ONLINE
                </Text>
            </div>
        </Link>
    );
};

import { Text } from "@fluentui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export interface IUsersDisplayProps {
    default_props?: boolean;
    toggleTab?: () => void;
}

export const UsersDisplayComponent: React.FC<IUsersDisplayProps> = ({
    toggleTab,
}) => {
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

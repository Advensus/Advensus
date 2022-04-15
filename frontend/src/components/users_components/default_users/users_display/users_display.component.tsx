import { Text } from "@fluentui/react";
import React, { useState } from "react";

export interface IUsersDisplayProps {
    default_props?: boolean;
}

export const UsersDisplayComponent: React.FC<IUsersDisplayProps> = () => {
    return (
        <div className="users_display_container">
            <div className="users_display_item">
                <Text style={{ alignSelf: "center" }}>Abrégé</Text>
                <div className="action_icon">icon</div>
            </div>
            <div className="users_display_text">
                <Text variant="small" style={{ fontWeight: "bold" }}>
                    Full name
                </Text>
                <Text variant="tiny" className="users_status">
                    ONLINE
                </Text>
            </div>
        </div>
    );
};

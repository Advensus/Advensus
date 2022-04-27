import { Text } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../../../lib";

export interface IUsersDisplayProps {
    default_props?: boolean;
    detailsInfos: IUser;
    toggleTab: (id: string) => void;
}

export const UsersDisplayComponent: React.FC<IUsersDisplayProps> = ({
    toggleTab,
    detailsInfos,
}) => {
    useEffect(() => {
        console.log({ detailsInfos });
    }, []);

    return (
        <Link
            to="#"
            onClick={() => toggleTab(detailsInfos.id)}
            className="users_display_container"
        >
            <div className="users_display_item">
                <div className="action_icon">icon</div>
                <Text style={{ alignSelf: "center" }}>
                    {detailsInfos.username}
                </Text>
            </div>
            <div className="users_display_text">
                <Text variant="small" style={{ fontWeight: "bold" }}>
                    {detailsInfos.first_name} {detailsInfos.username}
                </Text>
                <Text variant="tiny" className="users_status">
                    ONLINE
                </Text>
            </div>
        </Link>
    );
};

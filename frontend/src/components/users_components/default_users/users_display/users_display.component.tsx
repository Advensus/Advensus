import { Text } from "@fluentui/react";
import { Icon, IIconStyles } from "@fluentui/react/lib/Icon";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../../../lib";

export interface IUsersDisplayProps {
    default_props?: boolean;
    detailsInfos: IUser;
    toggleTab: (id: IUser) => void;
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
            onClick={() => toggleTab(detailsInfos)}
            className="users_display_container"
        >
            <div className="users_display_item">
                <div className="action_icon">
                    <Icon
                        iconName="ContactCardSettings"
                        styles={trainingOrgCardIconStyles}
                    />
                </div>
                <Text
                    style={{
                        alignSelf: "center",
                        color: "#fff",
                        fontWeight: "bolder",
                    }}
                >
                    {detailsInfos &&
                        detailsInfos.first_name.toLocaleUpperCase()}
                </Text>
            </div>
            <div className="users_display_text">
                <Text variant="small" style={{ fontWeight: "bold" }}>
                    {detailsInfos && detailsInfos.first_name}{" "}
                    {detailsInfos && detailsInfos.username}
                </Text>
                <Text variant="tiny" className="users_status">
                    ONLINE
                </Text>
            </div>
        </Link>
    );
};

const trainingOrgCardIconStyles: Partial<IIconStyles> = {
    root: { fontSize: "16px", color: "#fff", marginRight: "4px" },
};

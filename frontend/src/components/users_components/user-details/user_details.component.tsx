import { Text } from "@fluentui/react";
import React, { useState } from "react";
import { UsersDisplayComponent, UserInfosComponent } from "../../";
import { IUser } from "../../../lib";

export interface IUserDetailsProps {
    default_props?: boolean;
    contentToDetail?: IUser;
    firstname?: string;
}

export const UserDetailsComponent: React.FC<IUserDetailsProps> = ({
    contentToDetail,
    firstname,
}) => {
    return (
        <div className="user_details_container">
            <div className="user_details_header">
                {/* <UsersDisplayComponent /> */}
                <div className="user_details_init">INIT</div>
                <Text variant="large">
                    {contentToDetail?.first_name} {contentToDetail?.username}
                </Text>
            </div>
            <hr />
            <UserInfosComponent
                keyWord="Ressource ID"
                valueWord={contentToDetail?.id}
            />
            <UserInfosComponent
                keyWord="Firstname"
                valueWord={contentToDetail?.first_name}
            />
            <UserInfosComponent
                keyWord="Lastname"
                valueWord={contentToDetail?.username}
            />
        </div>
    );
};

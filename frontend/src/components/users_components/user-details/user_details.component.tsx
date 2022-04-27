import { Text } from "@fluentui/react";
import React, { useState } from "react";
import { AttributeDisplayComponent } from "../../";
import { IUser } from "../../../lib";

export interface IUserDetailsProps {
    default_props?: boolean;
    contentToDetail?: IUser;
}

export const UserDetailsComponent: React.FC<IUserDetailsProps> = ({
    contentToDetail,
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
            <AttributeDisplayComponent
                keyWord="Ressource ID"
                valueWord={contentToDetail?.id}
            />
            <AttributeDisplayComponent
                keyWord="Firstname"
                valueWord={contentToDetail?.first_name}
            />
            <AttributeDisplayComponent
                keyWord="Lastname"
                valueWord={contentToDetail?.username}
            />
        </div>
    );
};

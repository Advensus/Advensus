import { IconButton, IIconProps, Text } from "@fluentui/react";
import React, { useState } from "react";
import { AttributeDisplayComponent } from "../../";
import { IUser } from "../../../lib";
import { TrainingFolderCardComponent } from "../../trainings_components/training_folder_card/training_folder_card.component";

export interface IUserDetailsProps {
    default_props?: boolean;
    contentToDetail?: IUser;
}

const addFolderIcon: IIconProps = { iconName: "AddToShoppingList" };

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
                keyWord="User ID"
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
            <AttributeDisplayComponent
                keyWord="Email"
                valueWord={contentToDetail?.email}
            />
            <AttributeDisplayComponent
                keyWord="Téléphone"
                valueWord={contentToDetail?.phone_number}
            />
            <div className="user_details_training_folder">
                <div className="user_details_training_folder_head">
                    <Text>Dossier(s) de Formation(s)</Text>
                    <IconButton
                        iconProps={addFolderIcon}
                        // menuIconProps={{ iconName: "ClipboardListAdd" }}
                        ariaLabel="add"
                        title="Nouvelle Formation"
                    />
                </div>
                <hr className="hr_user_details_training_folder" />
                <TrainingFolderCardComponent />
                <TrainingFolderCardComponent />
                <TrainingFolderCardComponent />
            </div>
        </div>
    );
};

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IIconProps, SearchBox, Text } from "@fluentui/react";
import { IUser } from "../../../lib";

export interface ITrainingOrgTraineesDisplayProps {
    default_props?: boolean;
    openPanel: () => void;
    trainee: IUser;
}

const filterIcon: IIconProps = { iconName: "Filter" };

export const TrainingOrgTraineesDisplayComponent: React.FC<
    ITrainingOrgTraineesDisplayProps
> = ({ openPanel, trainee }) => {
    return (
        <Link
            to="#"
            onClick={openPanel}
            className="training_org_trainees_display_container"
        >
            <SearchBox
                placeholder="Filter"
                iconProps={filterIcon}
                className="training_org_trainees_display_searchbar"
            />
            <div className="training_org_trainees_display_content">
                <div
                    // onClick={() => toggleTab(detailsInfosTrainee.id)}
                    className="trainee_diplay_container"
                >
                    <div className="training_org_trainees_display_txt">
                        <Text variant="large" style={{ fontWeight: "bolder" }}>
                            {trainee.first_name + " " + trainee.username}
                        </Text>
                        <Text variant="tiny">{trainee.phone_number}</Text>
                        <Text variant="tiny">{trainee.email}</Text>
                    </div>
                    <div className="training_org_trainees_display_square">
                        <Text variant="large" style={{ fontWeight: "bold" }}>
                            0
                        </Text>
                        <Text variant="tiny">Total</Text>
                        <Text variant="tiny">Réservations</Text>
                    </div>
                </div>
            </div>
        </Link>
    );
};

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IIconProps, SearchBox, Text } from "@fluentui/react";

export interface ITrainingOrgTraineesDisplayProps {
    default_props?: boolean;
    openPanel: () => void;
}

const filterIcon: IIconProps = { iconName: "Filter" };

export const TrainingOrgTraineesDisplayComponent: React.FC<
    ITrainingOrgTraineesDisplayProps
> = ({ openPanel }) => {
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
                <Link
                    to="#"
                    // onClick={() => toggleTab(detailsInfosTrainee.id)}
                    className="trainee_diplay_container"
                >
                    <div className="training_org_trainees_display_txt">
                        <Text variant="large" style={{ fontWeight: "bolder" }}>
                            First name Last name
                        </Text>
                        <Text variant="tiny">Phone number</Text>
                        <Text variant="tiny">Email</Text>
                    </div>
                    <div className="training_org_trainees_display_square">
                        <Text variant="large" style={{ fontWeight: "bold" }}>
                            0
                        </Text>
                        <Text variant="tiny">Total</Text>
                        <Text variant="tiny">Réservations</Text>
                    </div>
                </Link>
            </div>
        </Link>
    );
};

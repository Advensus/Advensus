import { Text } from "@fluentui/react";
import { Icon, IIconStyles } from "@fluentui/react/lib/Icon";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ITraining } from "../../../lib";

export interface ITrainingCardProps {
    default_props?: boolean;
    trainingDetails: ITraining;
    toggleTab: (id: ITraining) => void;
}

export const TrainingCardComponent: React.FC<ITrainingCardProps> = ({
    trainingDetails,
    toggleTab,
}) => {
    return (
        <Link
            to="#"
            onClick={() => toggleTab(trainingDetails)}
            className="training_card_container"
        >
            <div className="training_card_subtitle">
                <Text variant="large" style={{ fontWeight: "initial" }}>
                    {trainingDetails.intitule}
                </Text>
                <div>
                    <Icon iconName="Group" styles={trainingCardIconStyles} />
                    <Text variant="tiny">49 Resources</Text>
                </div>
                {/* <Icon iconName="HourGlass" styles={trainingCardIconStyles} /> */}
            </div>
            <div className="training_card_details">
                <Text variant="tiny">- Certif 1</Text>
                <Text variant="tiny">- Certif 2</Text>
                <Text variant="tiny">- Certif 3</Text>
                <Text variant="tiny">...</Text>
            </div>
        </Link>
    );
};

const trainingCardIconStyles: Partial<IIconStyles> = {
    root: { fontSize: "10px", color: "gray" },
};

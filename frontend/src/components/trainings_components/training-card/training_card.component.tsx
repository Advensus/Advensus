import { Text } from "@fluentui/react";
import { Icon, IIconStyles } from "@fluentui/react/lib/Icon";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ITraining } from "../../../lib";

export interface ITrainingCardProps {
    default_props?: boolean;
    trainingDetails: ITraining;
    toggleTab: (id: string) => void;
}

export const TrainingCardComponent: React.FC<ITrainingCardProps> = ({
    trainingDetails,
    toggleTab,
}) => {
    return (
        <Link
            to="#"
            onClick={() => toggleTab(trainingDetails.id)}
            className="training_card_container"
        >
            <Text variant="large" style={{ fontWeight: "initial" }}>
                {trainingDetails.intitule}
            </Text>
            <div className="training_card_subtitle">
                <Icon iconName="Group" styles={trainingCardIconStyles} />
                <Text variant="tiny" style={{ margin: "0 6px" }}>
                    49 Resources
                </Text>
                <Icon iconName="HourGlass" styles={trainingCardIconStyles} />
                <Text variant="tiny" style={{ margin: "0 6px" }}>
                    4
                </Text>
            </div>
        </Link>
    );
};

const trainingCardIconStyles: Partial<IIconStyles> = {
    root: { fontSize: "10px", color: "gray" },
};

import { Text } from "@fluentui/react";
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
            className="training_container"
        >
            <Text variant="large" style={{ fontWeight: "initial" }}>
                {trainingDetails.intitule}
            </Text>
            <div>
                <span style={{ color: "gray", fontSize: "10px" }}>icon</span>
                <Text variant="tiny" style={{ margin: "0 6px" }}>
                    49 Resources
                </Text>
                <span style={{ color: "gray", fontSize: "10px" }}>icon</span>
                <Text variant="tiny" style={{ margin: "0 6px" }}>
                    {trainingDetails.duration}
                </Text>
            </div>
        </Link>
    );
};

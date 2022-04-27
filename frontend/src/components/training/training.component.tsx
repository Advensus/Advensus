import { Text } from "@fluentui/react";
import React, { useState } from "react";
import { ITraining } from "../../lib";

export interface ITrainingProps {
    default_props?: boolean;
    trainingDetails: ITraining;
}

export const TrainingComponent: React.FC<ITrainingProps> = ({
    trainingDetails,
}) => {
    return (
        <div className="training_container">
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
        </div>
    );
};

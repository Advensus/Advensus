import { Text } from "@fluentui/react";
import React, { useState } from "react";

export interface ITrainingProps {
    default_props?: boolean;
}

export const TrainingComponent: React.FC<ITrainingProps> = () => {
    return (
        <div className="training_container">
            <Text variant="large" style={{ fontWeight: "initial" }}>
                Intitulé
            </Text>
            <div>
                <span style={{ color: "gray", fontSize: "10px" }}>icon</span>
                <Text variant="tiny" style={{ margin: "0 6px" }}>
                    49 Resources
                </Text>
                <span style={{ color: "gray", fontSize: "10px" }}>icon</span>
                <Text variant="tiny" style={{ margin: "0 6px" }}>
                    1 Hour(s)
                </Text>
            </div>
        </div>
    );
};

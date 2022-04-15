import { Text } from "@fluentui/react";
import React, { useState } from "react";

export interface ITraineeDisplayProps {
    default_props?: boolean;
}

export const TraineeDisplayComponent: React.FC<ITraineeDisplayProps> = () => {
    return (
        <div className="trainee_diplay_container">
            <div className="text_displaying">
                <Text variant="large" style={{ fontWeight: "bolder" }}>
                    Full name
                </Text>
                <Text variant="tiny">Phonenumber</Text>
                <Text variant="tiny">Email</Text>
            </div>
            <div className="square_displaying">
                <Text variant="large" style={{ fontWeight: "bold" }}>
                    0
                </Text>
                <Text variant="tiny">Total</Text>
                <Text variant="tiny">Réservations</Text>
            </div>
        </div>
    );
};

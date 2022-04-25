import { Text } from "@fluentui/react";
import React, { useState } from "react";
import { IUser } from "../../../../lib";

export interface ITraineeDisplayProps {
    default_props?: boolean;
    detailsInfosTrainee: IUser;
    toggleTab?: () => void;
}

export const TraineeDisplayComponent: React.FC<ITraineeDisplayProps> = ({
    detailsInfosTrainee,
}) => {
    return (
        <div className="trainee_diplay_container">
            <div className="text_displaying">
                <Text variant="large" style={{ fontWeight: "bolder" }}>
                    {detailsInfosTrainee.first_name}{" "}
                    {detailsInfosTrainee.username}
                </Text>
                <Text variant="tiny">{detailsInfosTrainee.phone_number}</Text>
                <Text variant="tiny">{detailsInfosTrainee.email}</Text>
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

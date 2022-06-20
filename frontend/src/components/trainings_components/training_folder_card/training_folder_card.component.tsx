import React, { useState } from "react";
import { Text } from "@fluentui/react";
import { Link } from "react-router-dom";
import { ISubscription } from "../../../lib";

export interface ITrainingFolderCardProps {
    default_props?: boolean;
    openPanel: () => void;
    subscriptionDetails: ISubscription;
}

export const TrainingFolderCardComponent: React.FC<
    ITrainingFolderCardProps
> = ({ openPanel, subscriptionDetails }) => {
    return (
        <Link
            to="#"
            onClick={openPanel}
            className="training_folder_card_container"
        >
            <div className="training_folder_card_body">
                <div className="training_folder_card_body_infos">
                    <Text variant="small" style={{ fontWeight: "bold" }}>
                        EDOF: {subscriptionDetails.edof}
                    </Text>
                    <Text variant="tiny">
                        Début: {subscriptionDetails.start_session}
                    </Text>
                    <Text variant="tiny">
                        Fin: {subscriptionDetails.end_session}
                    </Text>
                </div>
                <div className="training_folder_card_body_squares">
                    <div className="training_folder_card_body_squares_item">
                        <Text variant="small" style={{ fontWeight: "bold" }}>
                            {subscriptionDetails.hour_worked}
                        </Text>
                        <Text variant="tiny">Réalisé</Text>
                    </div>
                    <div className="training_folder_card_body_squares_item">
                        <Text variant="small" style={{ fontWeight: "bold" }}>
                            2
                        </Text>
                        <Text variant="tiny">Réservé</Text>
                    </div>
                    <div className="training_folder_card_body_squares_item">
                        <Text variant="small" style={{ fontWeight: "bold" }}>
                            7
                        </Text>
                        <Text variant="tiny">Solde</Text>
                    </div>
                </div>
            </div>
            <div className="training_folder_card_footer">
                <Text variant="tiny" style={{ fontWeight: "bold" }}>
                    {subscriptionDetails.training_status}
                </Text>
            </div>
        </Link>
    );
};

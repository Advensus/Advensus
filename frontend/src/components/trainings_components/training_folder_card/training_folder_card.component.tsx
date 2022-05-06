import React, { useState } from "react";
import { Text } from "@fluentui/react";
import { Link } from "react-router-dom";

export interface ITrainingFolderCardProps {
    default_props?: boolean;
    openPanel: () => void;
}

export const TrainingFolderCardComponent: React.FC<
    ITrainingFolderCardProps
> = ({ openPanel }) => {
    return (
        <Link
            to="#"
            onClick={openPanel}
            className="training_folder_card_container"
        >
            <div className="training_folder_card_body">
                <div className="training_folder_card_body_infos">
                    <Text variant="small" style={{ fontWeight: "bold" }}>
                        EDOF
                    </Text>
                    <Text variant="tiny">Session Start</Text>
                    <Text variant="tiny">Session End</Text>
                </div>
                <div className="training_folder_card_body_squares">
                    <div className="training_folder_card_body_squares_item">
                        <Text variant="small" style={{ fontWeight: "bold" }}>
                            9
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
                    Statut
                </Text>
            </div>
        </Link>
    );
};

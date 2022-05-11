import { Text } from "@fluentui/react";
import React from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../../../lib";

export interface ITraineeDisplayProps {
    default_props?: boolean;
    detailsInfosTrainee: IUser;
    toggleTab: (id: string) => void;
}

export const TraineeDisplayComponent: React.FC<ITraineeDisplayProps> = ({
    detailsInfosTrainee,
    toggleTab,
}) => {
    return (
        <Link
            to="#"
            onClick={() => toggleTab(detailsInfosTrainee.id)}
            className="trainee_diplay_container"
        >
            <div className="text_displaying">
                <Text variant="large" style={{ fontWeight: "bolder" }}>
                    {detailsInfosTrainee.username}
                </Text>
                <Text variant="tiny">{detailsInfosTrainee.phone_number}</Text>
                <Text variant="tiny">{detailsInfosTrainee.email}</Text>
            </div>
            <div className="trainee_display_squares">
                <div className="square_displaying">
                    <Text variant="medium" style={{ fontWeight: "bold" }}>
                        10
                    </Text>
                    <Text variant="tiny">H(s)</Text>
                    <Text variant="tiny">Réalisé</Text>
                </div>
                <div className="square_displaying">
                    <Text variant="medium" style={{ fontWeight: "bold" }}>
                        0
                    </Text>
                    <Text variant="tiny">H(s)</Text>
                    <Text variant="tiny">Réservé</Text>
                </div>
                <div className="square_displaying">
                    <Text variant="medium" style={{ fontWeight: "bold" }}>
                        0
                    </Text>
                    <Text variant="tiny">H(s)</Text>
                    <Text variant="tiny">Solde</Text>
                </div>
            </div>
        </Link>
    );
};

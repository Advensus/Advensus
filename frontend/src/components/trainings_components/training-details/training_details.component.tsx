import { Text } from "@fluentui/react";
import React, { useState } from "react";
import { AttributeDisplayComponent } from "../..";
import { ITraining } from "../../../lib";

export interface ITrainingDetailsProps {
    detailTraining?: ITraining;
}

export const TrainingDetailsComponent: React.FC<ITrainingDetailsProps> = ({
    detailTraining,
}) => {
    return (
        <div className="training_details_container">
            <div className="training_details_header">
                <div className="training_details_init">ANG</div>
                <Text variant="large">{detailTraining?.intitule}</Text>
            </div>
            <hr />
            <AttributeDisplayComponent
                keyWord="Formation ID"
                valueWord={detailTraining?.id}
            />
            <AttributeDisplayComponent
                keyWord="Intitulé"
                valueWord={detailTraining?.intitule}
            />
        </div>
    );
};

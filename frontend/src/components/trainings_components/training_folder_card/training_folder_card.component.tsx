import React, { useEffect, useState } from "react";
import { Separator, Text } from "@fluentui/react";
import { Link } from "react-router-dom";
import { ICourses, ISubscription } from "../../../lib";

export interface ITrainingFolderCardProps {
    default_props?: boolean;
    openPanel: () => void;
    subscriptionDetails: ISubscription;
    userIsBooking: ICourses[];
}

export const TrainingFolderCardComponent: React.FC<
    ITrainingFolderCardProps
> = ({ openPanel, subscriptionDetails, userIsBooking }) => {
    const [bookingIsTrainings, setBookingIsTrainings] = useState<ICourses[]>(
        []
    );

    useEffect(() => {
        console.log("la souscription:", subscriptionDetails.formation.intitule);
        console.log(
            "le cours qui est en mm temps la réservation",
            userIsBooking
        );
        const bookingRelatedToTraining = userIsBooking.filter(
            (_) =>
                // console.log("dans la réservation mm", _.lier.intitule)
                _.lier.intitule === subscriptionDetails.formation.intitule
        );
        console.log({ bookingRelatedToTraining });
        setBookingIsTrainings(bookingRelatedToTraining);
    }, [userIsBooking]);

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
                            {bookingIsTrainings && bookingIsTrainings.length}
                        </Text>
                        <Text variant="tiny">Réservé</Text>
                    </div>
                    <div className="training_folder_card_body_squares_item">
                        <Text variant="small" style={{ fontWeight: "bold" }}>
                            {subscriptionDetails.solde}
                        </Text>
                        <Text variant="tiny">Solde</Text>
                    </div>
                </div>
            </div>
            <div className="training_folder_card_footer">
                <Text variant="tiny" style={{ fontWeight: "bold" }}>
                    {subscriptionDetails.formation.intitule +
                        " - " +
                        subscriptionDetails.certification.intitule}
                </Text>
                <Separator vertical={true} />
                <Text variant="tiny" style={{ fontWeight: "bold" }}>
                    {subscriptionDetails.training_status}
                </Text>
            </div>
        </Link>
    );
};

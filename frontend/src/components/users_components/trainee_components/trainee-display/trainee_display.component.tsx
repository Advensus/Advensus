import { Text } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ISubscription, IUser } from "../../../../lib";
import { useSubscriptionStore } from "../../../../stores/subscription.store";

export interface ITraineeDisplayProps {
    default_props?: boolean;
    detailsInfosTrainee: IUser;
    toggleTab: (id: string) => void;
}

export const TraineeDisplayComponent: React.FC<ITraineeDisplayProps> = ({
    detailsInfosTrainee,
    toggleTab,
}) => {
    const { newSubscription, user } = useSubscriptionStore();
    const [traineeBalance, setTraineeBalance] = useState<number>();
    const [traineeIsSubscriptions, setTraineeIsSubscriptions] = useState<
        ISubscription[]
    >([]);

    useEffect(() => {
        if (detailsInfosTrainee) {
            const balanceArray = detailsInfosTrainee.souscrirs?.map((_) =>
                parseInt(_.solde)
            );
            const traineeTotalBalance =
                balanceArray &&
                balanceArray.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                );
            setTraineeBalance(traineeTotalBalance);
            if (detailsInfosTrainee.souscrirs)
                setTraineeIsSubscriptions(detailsInfosTrainee.souscrirs);
        }

        console.log(
            "taille tableu souscription:",
            traineeIsSubscriptions.length
        );
    }, [detailsInfosTrainee.souscrirs]);
    useEffect(() => {
        // update went new subscription
        if (user) {
            if (detailsInfosTrainee.id === user.id) {
                traineeBalance &&
                    setTraineeBalance(
                        traineeBalance + parseInt(newSubscription.solde)
                    );
                setTraineeIsSubscriptions([
                    newSubscription,
                    ...traineeIsSubscriptions,
                ]);
            }
        }
    }, [newSubscription, user]);

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
                {/* <div className="square_displaying">
                    <Text variant="medium" style={{ fontWeight: "bold" }}>
                        10
                    </Text>
                    <Text variant="tiny">H(s)</Text> 
                    <Text variant="tiny">Réalisé</Text>
                </div> */}
                <div className="square_displaying">
                    <Text variant="medium" style={{ fontWeight: "bold" }}>
                        {traineeIsSubscriptions.length}
                    </Text>
                    <Text variant="tiny">Dossier(s)</Text>
                </div>
                <div className="square_displaying">
                    <Text variant="medium" style={{ fontWeight: "bold" }}>
                        {traineeBalance}
                    </Text>
                    <Text variant="tiny">Total</Text>
                    <Text variant="tiny">Solde</Text>
                </div>
            </div>
        </Link>
    );
};

import { ITextStyles, Text } from "@fluentui/react";
import React, { useState } from "react";
import { Icon, IIconStyles } from "@fluentui/react/lib/Icon";

export interface IBookingCardProps {
    default_props?: boolean;
}

export const BookingCardComponent: React.FC<IBookingCardProps> = () => {
    return (
        <div className="booking_card_container">
            <div className="booking_card_avatar">
                <Text
                    variant="medium"
                    style={{ color: "#fff", fontWeight: "bolder" }}
                >
                    ABC
                </Text>
            </div>
            <div className="booking_card_infos">
                <Text variant="mediumPlus">Inititulé</Text>
                <div className="booking_card_duration">
                    {/* BOOKING STARTER DAY */}
                    <>
                        <Icon
                            iconName="Calendar"
                            styles={bookingCardDurationIconStyles}
                        />
                        <Text variant="tiny" style={{ margin: "0 5px" }}>
                            17/02/2022
                        </Text>
                    </>
                    {/* BOOKING STARTER HOUR */}
                    <>
                        <Icon
                            iconName="SkypeCircleClock"
                            styles={bookingCardDurationIconStyles}
                        />
                        <Text variant="tiny" style={{ margin: "0 5px" }}>
                            14:00
                        </Text>
                    </>
                    {/* BOOKING STARTER MINUTES */}
                    <>
                        <Icon
                            iconName="HourGlass"
                            styles={bookingCardDurationIconStyles}
                        />
                        <Text variant="tiny" style={{ margin: "0 5px" }}>
                            45 minute(s)
                        </Text>
                    </>
                </div>
                <div className="booking_card_creation">
                    {/* CREATION AUTOR */}
                    <>
                        <Text variant="tiny">crée par </Text>
                        <Text
                            variant="tiny"
                            styles={bookingCardCreationTextStyles}
                        >
                            TEST
                        </Text>
                    </>
                    {/* CREATION DAY */}
                    <>
                        <Text variant="tiny"> le</Text>
                        <Text
                            variant="tiny"
                            styles={bookingCardCreationTextStyles}
                        >
                            03/02/2022
                        </Text>
                    </>
                    {/* CREATION HOUR */}
                    <>
                        <Text variant="tiny">à</Text>
                        <Text
                            variant="tiny"
                            styles={bookingCardCreationTextStyles}
                        >
                            15:52
                        </Text>
                    </>
                    <div>
                        <Text>Annuler</Text>
                        <Text>Editer</Text>
                        <Text>Reporter</Text>
                    </div>
                </div>
            </div>
        </div>
    );
};
const bookingCardDurationIconStyles: Partial<IIconStyles> = {
    root: { fontSize: "10px", color: "gray" },
};
const bookingCardCreationTextStyles: Partial<ITextStyles> = {
    root: { fontWeight: "bold", margin: "0 5px" },
};

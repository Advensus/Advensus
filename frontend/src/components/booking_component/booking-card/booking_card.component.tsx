import { IconButton, ITextStyles, Text } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { Icon, IIconStyles } from "@fluentui/react/lib/Icon";
import { Link } from "react-router-dom";
import { ICourses } from "../../../lib";

export interface IBookingCardProps {
    default_props?: boolean;
    openPanel: () => void;
    BookingInfos: ICourses;
}

export const BookingCardComponent: React.FC<IBookingCardProps> = ({
    openPanel,
    BookingInfos,
}) => {
    const [startDay, setStartDay] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");

    useEffect(() => {
        console.log("the time:", BookingInfos.reservation);

        const indexOfT = `${
            BookingInfos.reservation && BookingInfos.reservation.start_date
        }`.lastIndexOf("T");
        const bookingStartDay = `${
            BookingInfos.reservation && BookingInfos.reservation.start_date
        }`.substring(0, indexOfT);
        const bookingStartTime = `${
            BookingInfos.reservation && BookingInfos.reservation.start_date
        }`.substring(indexOfT + 1);
        setStartDay(bookingStartDay);
        setStartTime(bookingStartTime);
    }, []);

    return (
        <Link to="#" onClick={openPanel} className="booking_card_container">
            <div className="booking_card_avatar">
                <Text
                    variant="medium"
                    style={{ color: "#fff", fontWeight: "bolder" }}
                >
                    ABC
                </Text>
            </div>
            <div className="booking_card_infos">
                <div className="booing_card_infos_header">
                    <Text variant="mediumPlus">
                        {BookingInfos.reservation &&
                            BookingInfos.reservation.title}
                    </Text>
                    <div className="booking_card_container_hide">
                        <IconButton
                            menuIconProps={{ iconName: "Cancel" }}
                            title="Annuler"
                        />
                        <IconButton
                            menuIconProps={{ iconName: "Edit" }}
                            title="Editer"
                        />
                        <IconButton
                            menuIconProps={{ iconName: "ChangeEntitlements" }}
                            title="Reporter"
                        />
                    </div>
                </div>
                <div className="booking_card_duration">
                    {/* BOOKING STARTER DAY */}
                    <>
                        <Icon
                            iconName="Calendar"
                            styles={bookingCardDurationIconStyles}
                        />
                        <Text variant="tiny" style={{ margin: "0 5px" }}>
                            {startDay}
                        </Text>
                    </>
                    {/* BOOKING STARTER HOUR */}
                    <>
                        <Icon
                            iconName="SkypeCircleClock"
                            styles={bookingCardDurationIconStyles}
                        />
                        <Text variant="tiny" style={{ margin: "0 5px" }}>
                            {startTime}
                        </Text>
                    </>
                </div>
                <div className="booking_card_creation">
                    {/* CREATION AUTOR */}
                    {/* <>
                        <Text variant="tiny">crée par </Text>
                        <Text
                            variant="tiny"
                            styles={bookingCardCreationTextStyles}
                        >
                            TEST
                        </Text>
                    </> */}
                    {/* CREATION DAY */}
                    {/* <>
                        <Text variant="tiny"> le</Text>
                        <Text
                            variant="tiny"
                            styles={bookingCardCreationTextStyles}
                        >
                            03/02/2022
                        </Text>
                    </> */}
                    {/* CREATION HOUR */}
                    {/* <>
                        <Text variant="tiny">à</Text>
                        <Text
                            variant="tiny"
                            styles={bookingCardCreationTextStyles}
                        >
                            15:52
                        </Text>
                    </> */}
                </div>
            </div>
        </Link>
    );
};
const bookingCardDurationIconStyles: Partial<IIconStyles> = {
    root: { fontSize: "10px", color: "gray" },
};
const bookingCardCreationTextStyles: Partial<ITextStyles> = {
    root: { fontWeight: "bold", margin: "0 5px" },
};

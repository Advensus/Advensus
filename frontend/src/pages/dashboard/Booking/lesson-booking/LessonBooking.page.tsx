import { Separator, Text } from "@fluentui/react";
import React from "react";
// import { RouteProps } from "react-router";

export interface ILessonBookingPageProps {
    default_props?: boolean;
}

export const LessonBookingPage: React.FC<ILessonBookingPageProps> = () => {
    return (
        <div className="lesson_booking_container">
            <div className="lesson_booking_box">
                <div className="lesson_booking_box_header">
                    <Text variant="medium" style={{ fontWeight: "bolder" }}>
                        Réservation de cours
                    </Text>
                </div>
                <div className="lesson_booking_box_body">
                    <Separator />
                    Body
                </div>
            </div>
        </div>
    );
};

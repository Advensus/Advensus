import { Separator, Text } from "@fluentui/react";
import React from "react";

export interface INextLessonPageProps {
    default_props?: boolean;
}

export const NextLessonPage: React.FC<INextLessonPageProps> = () => {
    return (
        <div className="next_lesson_container">
            <div className="next_lesson_box">
                <div className="next_lesson_box_header">
                    <Text variant="medium" style={{ fontWeight: "bolder" }}>
                        Cours à venir
                    </Text>
                </div>
                <div className="next_lesson_box_body">
                    <Separator />
                    Body
                </div>
            </div>
        </div>
    );
};

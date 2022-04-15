import { FontIcon, Text } from "@fluentui/react";
import React, { useEffect, useState } from "react";

export interface ICurrentUserDetailsProps {
    default_props?: boolean;
}

export const CurrentUserDetailsComponent: React.FC<
    ICurrentUserDetailsProps
> = () => {
    // Handle media query
    const [isMobile, setIsMobile] = useState<Boolean>(false);
    function mqChange(mq: any) {
        setIsMobile(mq.matches);
    }
    useEffect(() => {
        const mq = window.matchMedia("screen and (max-width: 748px)");
        mq.addListener(mqChange);
        mqChange(mq);

        return () => {
            mq.removeListener(mqChange);
        };
    }, []);

    return (
        <div
            className={
                isMobile
                    ? "currentuserdetails_container_mobile"
                    : "currentuserdetails_container"
            }
        >
            <div
                className={
                    isMobile
                        ? "currentuserdetails_pict_mobile"
                        : "currentuserdetails_pict"
                }
            >
                img
                <FontIcon
                    aria-label="EditSolid"
                    iconName="EditSolid12"
                    className={
                        isMobile
                            ? "currentuserdetails_edit_icon_mobile"
                            : "currentuserdetails_edit_icon"
                    }
                />
            </div>
            <Text variant="xSmall" id={isMobile ? "username" : ""}>
                User name
            </Text>
        </div>
    );
};

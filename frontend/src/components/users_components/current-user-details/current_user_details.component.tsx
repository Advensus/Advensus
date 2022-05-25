import { FontIcon, Text } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { Icon, IIconStyles } from "@fluentui/react/lib/Icon";
import { Image, IImageProps, ImageFit } from "@fluentui/react/lib/Image";
import { IUser } from "../../../lib";

import {
    IPersonaSharedProps,
    Persona,
    PersonaSize,
    PersonaPresence,
    IPersonaProps,
    PersonaInitialsColor,
} from "@fluentui/react/lib/Persona";
import { TestImages } from "@fluentui/example-data";

export interface ICurrentUserDetailsProps {
    default_props?: boolean;
    user?: IUser;
}

const imageProps: IImageProps = {
    imageFit: ImageFit.cover,
    width: "100%",
    height: "100%",
    // Show a border around the image (just for demonstration purposes)
    styles: (props) => ({
        root: {},
    }),
};

const noPicturePersonaProps: IPersonaProps = {
    size: PersonaSize.size48,
    styles: {
        root: {
            width: 200,
            // margin: 5,
        },
        primaryText: {
            color: "#fff",
            fontWeight: "bold",
        },
    },
};

export const CurrentUserDetailsComponent: React.FC<
    ICurrentUserDetailsProps
> = ({ user }) => {
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

    const picturePersona: IPersonaSharedProps = {
        imageUrl: TestImages.personaFemale,
        // imageInitials: "AL",
    };

    return (
        <div
            className={
                isMobile
                    ? "currentuserdetails_container_mobile"
                    : "currentuserdetails_container"
            }
        >
            {user?.avatar ? (
                <>
                    <Persona
                        {...picturePersona}
                        size={PersonaSize.size48}
                        presence={PersonaPresence.online}
                        imageAlt={`${user?.username} advensus profile`}
                    />
                    <Text
                        variant="medium"
                        id={isMobile ? "username" : ""}
                        style={{ color: "#fff", fontWeight: "bold" }}
                    >
                        {user?.username}
                    </Text>
                </>
            ) : (
                <Persona
                    initialsColor={PersonaInitialsColor.gray}
                    {...noPicturePersonaProps}
                    text={user?.username}
                    presence={PersonaPresence.online}
                    imageAlt={`${user?.username} advensus profile`}
                />
            )}
        </div>
    );
};

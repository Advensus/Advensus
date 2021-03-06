import React, { useState } from "react";
import { Icon, IIconStyles, Text } from "@fluentui/react";
import { Image, IImageProps, ImageFit } from "@fluentui/react/lib/Image";
import { Link } from "react-router-dom";
import { ICompany } from "../../../lib/interfaces/Company";
import { prefixer } from "../../../services/urls";

export interface ISmallCompanyCardProps {
    default_props?: boolean;
    openPanel: () => void;
    org: ICompany;
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

export const SmallCompanyCardComponent: React.FC<ISmallCompanyCardProps> = ({
    openPanel,
    org,
}) => {
    return (
        <Link
            to="#"
            onClick={openPanel}
            className="small_company_card_container"
        >
            <div className="small_company_card_logo">
                <Image
                    {...imageProps}
                    src={
                        org
                            ? prefixer + org.company_logo
                            : "https://images.unsplash.com/photo-1555596899-d634257b55bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                    }
                    alt='Example of the image fit value "center" on an image larger than the frame.'
                />
            </div>
            <div className="small_company_card_infos">
                <div className="small_company_card_infos_more">
                    <Text variant="medium" style={{ fontWeight: "bold" }}>
                        {org.company_name}
                    </Text>
                    <div>
                        <Icon
                            iconName="Phone"
                            styles={bookingCardDurationIconStyles}
                        />
                        <Text variant="tiny">{org.company_phone_number}</Text>
                    </div>
                    <div>
                        <Icon
                            iconName="Location"
                            styles={bookingCardDurationIconStyles}
                        />
                        <Text variant="tiny">{org.company_adress}</Text>
                    </div>
                </div>
                <div className="small_company_card_infos_once">
                    <Text variant="medium" style={{ fontWeight: "bold" }}>
                        10
                    </Text>
                    <Text variant="tiny">Stagiaire(s)</Text>
                </div>
            </div>
        </Link>
    );
};

const bookingCardDurationIconStyles: Partial<IIconStyles> = {
    root: { fontSize: "10px", color: "black", marginRight: "2px" },
};

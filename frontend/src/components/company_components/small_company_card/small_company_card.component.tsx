import React, { useState } from "react";
import { Icon, IIconStyles, Text } from "@fluentui/react";
import { Link } from "react-router-dom";

export interface ISmallCompanyCardProps {
    default_props?: boolean;
    openPanel: () => void;
}

export const SmallCompanyCardComponent: React.FC<ISmallCompanyCardProps> = ({
    openPanel,
}) => {
    return (
        <Link
            to="#"
            onClick={openPanel}
            className="small_company_card_container"
        >
            <div className="small_company_card_logo">Logo</div>
            <div className="small_company_card_infos">
                <div className="small_company_card_infos_more">
                    <Text variant="medium" style={{ fontWeight: "bold" }}>
                        Nom
                    </Text>
                    <div>
                        <Icon
                            iconName="Phone"
                            styles={bookingCardDurationIconStyles}
                        />
                        <Text variant="tiny">Tel</Text>
                    </div>
                    <div>
                        <Icon
                            iconName="Location"
                            styles={bookingCardDurationIconStyles}
                        />
                        <Text variant="tiny">Adresse</Text>
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

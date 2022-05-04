import { Text } from "@fluentui/react";
import { Icon, IIconStyles } from "@fluentui/react/lib/Icon";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export interface ITrainingOrganizationCardProps {
    default_props?: boolean;
    toggleTab: (id: string) => void;
}

export const TrainingOrganizationCardComponent: React.FC<
    ITrainingOrganizationCardProps
> = ({ toggleTab }) => {
    return (
        <Link
            to="#"
            onClick={() => toggleTab("sdfsf")}
            className="training_org_card_container"
        >
            <div className="training_org_card_stamp">Stamp here</div>
            <div className="training_org_card_infos">
                <Text variant="large" style={{ fontWeight: "bolder" }}>
                    OF name
                </Text>
                <div className="training_org_card_infos_txt">
                    <Icon iconName="Phone" styles={trainingOrgCardIconStyles} />
                    <Text variant="tiny">Phone number</Text>
                </div>
                <div className="training_org_card_infos_txt">
                    <Icon
                        iconName="Location"
                        styles={trainingOrgCardIconStyles}
                    />
                    <Text variant="tiny">Adress</Text>
                </div>
            </div>
        </Link>
    );
};

const trainingOrgCardIconStyles: Partial<IIconStyles> = {
    root: { fontSize: "10px", color: "gray", marginRight: "4px" },
};

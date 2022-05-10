import { Text } from "@fluentui/react";
import { Icon, IIconStyles } from "@fluentui/react/lib/Icon";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICompany } from "../../../lib/interfaces/Company";

export interface ITrainingOrganizationCardProps {
    default_props?: boolean;
    company: ICompany;
    toggleTab: (comp: ICompany) => void;
}

export const TrainingOrganizationCardComponent: React.FC<
    ITrainingOrganizationCardProps
> = ({ toggleTab, company }) => {
    useEffect(() => {
        console.log({ company });
    }, []);

    return (
        <Link
            to="#"
            onClick={() => toggleTab(company)}
            className="training_org_card_container"
        >
            <div className="training_org_card_stamp">Stamp here</div>
            <div className="training_org_card_infos">
                <Text variant="large" style={{ fontWeight: "bolder" }}>
                    {company.company_name}
                </Text>
                <div className="training_org_card_infos_txt">
                    <Icon iconName="Phone" styles={trainingOrgCardIconStyles} />
                    <Text variant="tiny">{company.company_phone_number}</Text>
                </div>
                <div className="training_org_card_infos_txt">
                    <Icon
                        iconName="Location"
                        styles={trainingOrgCardIconStyles}
                    />
                    <Text variant="tiny">{company.company_adress}</Text>
                </div>
            </div>
        </Link>
    );
};

const trainingOrgCardIconStyles: Partial<IIconStyles> = {
    root: { fontSize: "10px", color: "gray", marginRight: "4px" },
};

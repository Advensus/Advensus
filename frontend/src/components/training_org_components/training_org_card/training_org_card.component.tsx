import { Text } from "@fluentui/react";
import { Icon, IIconStyles } from "@fluentui/react/lib/Icon";
import { Image, IImageProps, ImageFit } from "@fluentui/react/lib/Image";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICompany } from "../../../lib/interfaces/Company";
import { prefixer } from "../../../services/urls";

// import immmm from "../../../../../Backend/media/company_logo/Capture1.PNG";

export interface ITrainingOrganizationCardProps {
    default_props?: boolean;
    company: ICompany;
    toggleTab: (comp: ICompany) => void;
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
            <div className="training_org_card_stamp">
                <Image
                    {...imageProps}
                    // src="https://images.unsplash.com/photo-1555596899-d634257b55bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                    src={
                        company.company_logo
                            ? `${prefixer}${company.company_logo}`
                            : "https://images.unsplash.com/photo-1555596899-d634257b55bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                    }
                    alt='Example of the image fit value "center" on an image larger than the frame.'
                />
            </div>
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

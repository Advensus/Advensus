import React, { useState } from "react";
import { AttributeDisplayComponent } from "../..";
import { ICompany, IOrg } from "../../../lib/interfaces/Company";
import { Image, IImageProps, ImageFit } from "@fluentui/react/lib/Image";
import { prefixer } from "../../../services/urls";
import { PATH_LABEL_COMPANY, PATH_LABEL_ORGANIZATION } from "../../../lib";

export interface ICompanyDetailsProps {
    default_props?: boolean;
    company?: ICompany;
    org?: IOrg;
    currentPath: string;
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

export const CompanyDetailsComponent: React.FC<ICompanyDetailsProps> = ({
    company,
    org,
    currentPath,
}) => {
    return (
        <div className="company_details_container">
            <div className="company_details_head">
                <div className="company_details_head_log">
                    <Image
                        {...imageProps}
                        // src="http://via.placeholder.com/150x100"
                        src={
                            company?.company_logo
                                ? prefixer + company.company_logo
                                : org?.company_logo
                                ? prefixer + org.company_logo
                                : "https://images.unsplash.com/photo-1555596899-d634257b55bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                        }
                        alt='Example of the image fit value "center" on an image larger than the frame.'
                    />
                </div>
            </div>
            <hr className="hr_solid_company_details" />
            {currentPath === PATH_LABEL_COMPANY && (
                <div className="company_details_infos">
                    <AttributeDisplayComponent
                        keyWord="Soci??t?? ID"
                        valueWord={company?.id}
                    />
                    <AttributeDisplayComponent
                        keyWord="Nom Soci??t??"
                        valueWord={company?.company_name}
                    />
                    <AttributeDisplayComponent
                        keyWord="Addresse Soci??t??"
                        valueWord={company?.company_adress}
                    />
                    <AttributeDisplayComponent
                        keyWord="Num??ro de T??l??phone"
                        valueWord={company?.company_phone_number}
                    />
                    {company?.fix_number && (
                        <AttributeDisplayComponent
                            keyWord="Fix"
                            valueWord={company?.fix_number}
                        />
                    )}
                </div>
            )}
            {/* FOR ORGANISATION */}
            {currentPath === PATH_LABEL_ORGANIZATION && (
                <div className="company_details_infos">
                    <AttributeDisplayComponent
                        keyWord="Soci??t??"
                        valueWord={org?.societe_formation.company_name}
                    />
                    <AttributeDisplayComponent
                        keyWord="Organisation ID"
                        valueWord={org?.id}
                    />
                    <AttributeDisplayComponent
                        keyWord="Nom Organisation"
                        valueWord={org?.company_name}
                    />
                    <AttributeDisplayComponent
                        keyWord="Addresse Organisation"
                        valueWord={org?.company_adress}
                    />
                    <AttributeDisplayComponent
                        keyWord="Num??ro de T??l??phone"
                        valueWord={org?.company_phone_number}
                    />
                    {org?.fix_number && (
                        <AttributeDisplayComponent
                            keyWord="Fix"
                            valueWord={org?.fix_number}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

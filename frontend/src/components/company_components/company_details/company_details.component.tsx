import React, { useState } from "react";
import { AttributeDisplayComponent } from "../..";
import { ICompany } from "../../../lib/interfaces/Company";
import { Image, IImageProps, ImageFit } from "@fluentui/react/lib/Image";

export interface ICompanyDetailsProps {
    default_props?: boolean;
    company?: ICompany;
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
                                ? "../../../../../Backend/media/company_logo/Capture1.PNG"
                                : "https://images.unsplash.com/photo-1555596899-d634257b55bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                        }
                        alt='Example of the image fit value "center" on an image larger than the frame.'
                    />
                </div>
            </div>
            <hr className="hr_solid_company_details" />
            <div className="company_details_infos">
                <AttributeDisplayComponent
                    keyWord="Société ID"
                    valueWord={company?.id}
                />
                <AttributeDisplayComponent
                    keyWord="Nom Société"
                    valueWord={company?.company_name}
                />
                <AttributeDisplayComponent
                    keyWord="Addresse Société"
                    valueWord={company?.company_adress}
                />
                <AttributeDisplayComponent
                    keyWord="Numéro de Téléphone"
                    valueWord={company?.company_phone_number}
                />
                {company?.fix_number && (
                    <AttributeDisplayComponent
                        keyWord="Fix"
                        valueWord={company?.fix_number}
                    />
                )}
            </div>
        </div>
    );
};

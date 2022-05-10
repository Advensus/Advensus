import React, { useState } from "react";
import { AttributeDisplayComponent } from "../..";
import { ICompany } from "../../../lib/interfaces/Company";

export interface ICompanyDetailsProps {
    default_props?: boolean;
    company?: ICompany;
}

export const CompanyDetailsComponent: React.FC<ICompanyDetailsProps> = ({
    company,
}) => {
    return (
        <div className="company_details_container">
            <div className="company_details_head">
                <div className="company_details_head_log">Logo</div>
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

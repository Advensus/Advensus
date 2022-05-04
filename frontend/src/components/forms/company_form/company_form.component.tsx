import { DefaultButton, Text, TextField } from "@fluentui/react";
import React, { useState } from "react";
import { CustomDropDownComponent } from "../../custom_dropdown_component/custom_dropdown.component";

export interface ICompanyFormProps {
    default_props?: boolean;
    cancel?: () => void;
}

export const CompanyFormComponent: React.FC<ICompanyFormProps> = ({
    cancel,
}) => {
    return (
        <form className="company_form_container">
            <Text className="company_form_txt_divide_mov">Société</Text>
            <hr className="company_form_hr_solid" />
            <div className="of_company_form_sect">
                <div className="company_form_pict">Logo</div>
                <div className="of_company_form_fields">
                    <TextField
                        type="text"
                        // value={values.first_name}
                        // onChange={handleChange}
                        placeholder="Nom O-F"
                        name="first_name"
                    />
                    <TextField
                        type="text"
                        // value={values.first_name}
                        // onChange={handleChange}
                        placeholder="Email O-F"
                        name="first_name"
                    />
                    <TextField
                        type="text"
                        // value={values.username}
                        // onChange={handleChange}
                        placeholder="Adress O-F"
                        name="username"
                    />
                    <TextField
                        type="text"
                        // value={values.email}
                        // onChange={handleChange}
                        placeholder="Téléphone Portable"
                        name="email"
                    />
                    <TextField
                        type="text"
                        // value={values.email}
                        // onChange={handleChange}
                        placeholder="Téléphone Fixe"
                        name="email"
                    />
                    <div className="company_form_stamp">Cachet</div>
                </div>
            </div>
            <Text className="company_form_txt_divide_mov">Admin</Text>{" "}
            <hr className="company_form_hr_solid" />
            <div className="head_company_form">
                <div className="head_company_form_fields">
                    <div className="head_company_form_align_fields">
                        <CustomDropDownComponent
                            thePlaceHolder="Civilité"
                            dropdownOptions={Civility}
                        />
                        <TextField
                            type="text"
                            // label="text"
                            // value={values.text}
                            // onChange={handleChange}
                            placeholder="Titre"
                            name="text"
                        />
                    </div>
                    <TextField
                        type="text"
                        // value={values.competence}
                        // onChange={handleChange}
                        placeholder="Prénom"
                        name="competence"
                    />
                    <TextField
                        type="text"
                        // value={values.horaire}
                        // onChange={handleChange}
                        placeholder="Nom"
                        name="horaire"
                    />
                    <TextField
                        type="email"
                        // value={values.horaire}
                        // onChange={handleChange}
                        placeholder="Email"
                        name="horaire"
                    />
                    <TextField
                        type="text"
                        // value={values.horaire}
                        // onChange={handleChange}
                        placeholder="Téléphone"
                        name="horaire"
                    />
                    <TextField
                        type="text"
                        // value={values.horaire}
                        // onChange={handleChange}
                        placeholder="Adresse"
                        name="horaire"
                    />
                    <TextField
                        type="password"
                        // value={values.password}
                        // onChange={handleChange}
                        placeholder="Password"
                        name="password"
                        canRevealPassword
                        revealPasswordAriaLabel="Show password"
                    />
                </div>
                <div className="company_form_pict">Pict</div>
            </div>
            <div className="company_form_form_btns">
                <DefaultButton text="Annuler" onClick={cancel} />
                <DefaultButton
                    style={{ marginLeft: "10px" }}
                    text="Sauvegarder"
                    type="submit"
                />
            </div>
        </form>
    );
};

const Civility = [
    { key: "Male", text: "Mr" },
    // { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "Female", text: "Mme" },
];

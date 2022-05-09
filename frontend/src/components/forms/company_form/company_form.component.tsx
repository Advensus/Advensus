import { DefaultButton, Text, TextField } from "@fluentui/react";
import { useFormik } from "formik";
import React from "react";
import {
    NewTrainingCompanyDtoIn,
    NewTrainingCompanyDtoOut,
} from "../../../lib/dto/company.dto";
import CompanyService from "../../../services/company.service";
import { CustomDropDownComponent } from "../../custom_dropdown_component/custom_dropdown.component";

export interface ICompanyFormProps {
    default_props?: boolean;
    cancel?: () => void;
}

export const CompanyFormComponent: React.FC<ICompanyFormProps> = ({
    cancel,
}) => {
    const onSubmit = (val: NewTrainingCompanyDtoOut) => {
        console.log({ val });
        CompanyService.new_company(val)
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log({ response });
                }
                const data = (await response.json()) as NewTrainingCompanyDtoIn;
                console.log("the current adding company:", data);
                // onCreate(data);
            })
            .catch((err) => {
                console.log("error while adding new company:", err);
            });
    };

    const { values, handleChange, handleSubmit } =
        useFormik<NewTrainingCompanyDtoOut>({
            initialValues: {
                company_name: "",
                company_adress: "",
                phone_number: "",
            },
            onSubmit,
        });

    return (
        <form onSubmit={handleSubmit} className="company_form_container">
            <Text className="company_form_txt_divide_mov">Société</Text>
            <hr className="company_form_hr_solid" />
            <div className="of_company_form_sect">
                <div className="company_form_pict">Logo</div>
                <div className="of_company_form_fields">
                    <TextField
                        type="text"
                        value={values.company_name}
                        onChange={handleChange}
                        placeholder="Nom Société"
                        name="company_name"
                    />
                    <TextField
                        type="text"
                        value={values.company_adress}
                        onChange={handleChange}
                        placeholder="Adresse de la Société"
                        name="company_adress"
                    />
                    <TextField
                        type="text"
                        value={values.phone_number}
                        onChange={handleChange}
                        placeholder="Numéro de la Société"
                        name="phone_number"
                    />
                    <TextField
                        type="text"
                        // value={values.email}
                        // onChange={handleChange}
                        placeholder="Numéro 2 de la Société"
                        name="fix_number"
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

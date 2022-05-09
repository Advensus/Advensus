import { DefaultButton, Text, TextField } from "@fluentui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { NewUserDto } from "../../../lib";
import {
    NewCompanyDtoIn,
    NewCompanyDtoOut,
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
    const [companyId, setCompanyId] = useState<string>("");
    // useEffect(() => {}, [companyId]);

    const onSubmit = (val: NewCompanyDtoOut) => {
        console.log({ val });
        CompanyService.new_company(val)
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log({ response });
                }
                const data = (await response.json()) as NewCompanyDtoIn;
                console.log("the current adding company:", data.id);
                setCompanyId(data.id);
                const inputElement = document.getElementById(
                    "societe_formation_id"
                ) as HTMLInputElement;
                inputElement.defaultValue = "dfsdfsdfsfsdfsdfsdff";

                setTimeout(() => {
                    if (data) {
                        addCompanyAdmin(val);
                        console.log({ inputElement });
                    }
                }, 1000);
                // onCreate(data);
            })
            .catch((err) => {
                console.log("error while adding new company:", err);
            });
    };

    const addCompanyAdmin = (infos: NewCompanyDtoOut) => {
        console.log({ infos });
    };

    const { values, handleChange, handleSubmit } = useFormik<NewCompanyDtoOut>({
        initialValues: {
            company_name: "",
            company_adress: "",
            phone_number: "",
            fix_number: "",
            username: "",
            first_name: "",
            email: "",
            company_phone_number: "",
            adress: "",
            password: "",
            societe_formation_id: "",
        },
        onSubmit,
    });

    return (
        <form
            name="new_comp"
            onSubmit={handleSubmit}
            className="company_form_container"
        >
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
                        value={values.company_phone_number}
                        onChange={handleChange}
                        placeholder="Numéro de la Société"
                        name="company_phone_number"
                    />
                    <TextField
                        type="text"
                        value={values.fix_number}
                        onChange={handleChange}
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
                        value={values.societe_formation_id}
                        onChange={handleChange}
                        placeholder="Société"
                        name="societe_formation_id"
                        id="societe_formation_id"
                    />
                    <TextField
                        type="text"
                        value={values.first_name}
                        onChange={handleChange}
                        placeholder="Prénom"
                        name="first_name"
                    />
                    <TextField
                        type="text"
                        value={values.username}
                        onChange={handleChange}
                        placeholder="Nom"
                        name="username"
                    />
                    <TextField
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="Email"
                        name="email"
                    />
                    <TextField
                        type="text"
                        value={values.phone_number}
                        onChange={handleChange}
                        placeholder="Téléphone"
                        name="phone_number"
                    />
                    <TextField
                        type="text"
                        value={values.adress}
                        onChange={handleChange}
                        placeholder="Adresse"
                        name="adress"
                    />
                    <TextField
                        type="password"
                        value={values.password}
                        onChange={handleChange}
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

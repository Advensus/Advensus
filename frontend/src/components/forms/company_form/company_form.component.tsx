import { DefaultButton, Text, TextField } from "@fluentui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ICompany, NewUserDto } from "../../../lib";
import {
    NewCompanyDtoIn,
    NewCompanyDtoOut,
} from "../../../lib/dto/company.dto";
import CompanyService from "../../../services/company.service";
import UserService from "../../../services/user.service";
import { CustomDropDownComponent } from "../../custom_dropdown_component/custom_dropdown.component";

export interface ICompanyFormProps {
    default_props?: boolean;
    onCreate: (data: NewCompanyDtoIn) => void;
    cancel?: () => void;
    company?: ICompany;
}

export const CompanyFormComponent: React.FC<ICompanyFormProps> = ({
    cancel,
    onCreate,
    company,
}) => {
    const [companyId, setCompanyId] = useState<string>("");
    // useEffect(() => {}, [companyId]);
    useEffect(() => {
        console.log({ company });
    }, [company]);

    const onSubmit = (val: NewCompanyDtoOut) => {
        // console.log({ val });
        let companpyiiiid = "";
        const formData = new FormData();
        formData.append("company_name", val.company_name);
        formData.append("company_adress", val.company_adress);
        formData.append("phone_number", `${val.phone_number}`);
        formData.append("fix_number", `${val.fix_number}`);
        formData.append("username", `${val.username}`);
        formData.append("first_name", `${val.first_name}`);
        formData.append("email", `${val.email}`);
        formData.append("company_phone_number", val.company_phone_number);
        formData.append("adress", `${val.adress}`);
        formData.append("password", `${val.password}`);
        formData.append("societe", val.societe);
        formData.append("company_logo", val.company_logo);
        formData.append("company_stamp", val.company_stamp);
        CompanyService.new_company(formData)
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log({ response });
                }
                const data = (await response.json()) as NewCompanyDtoIn;
                console.log("the current adding company:", data.id);
                companpyiiiid = data.id;
                setCompanyId(data.id);
                val.societe = companpyiiiid;
                setTimeout(() => {
                    if (data) {
                        addCompanyAdmin(val);
                    }
                }, 1000);
                onCreate(data);
            })
            .catch((err) => {
                console.log("error while adding new company:", err);
            });
    };

    const addCompanyAdmin = (infos: NewCompanyDtoOut) => {
        console.log({ infos });
        UserService.new_company_admin(infos)
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log({ response });
                }
                const data = (await response.json()) as NewCompanyDtoIn;
                console.log("the current adding company admin:", data);
            })
            .catch((err) => {
                console.log("error while adding new company admin:", err);
            });
    };

    const {
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
    } = useFormik<NewCompanyDtoOut>({
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
            societe: "",
            company_logo: "",
            company_stamp: "",
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
                <div className="company_form_pict">
                    {" "}
                    <TextField
                        label="Logo"
                        type="file"
                        name="company_logo"
                        onChange={(event: any) => {
                            setFieldValue(
                                "company_logo",
                                event.target.files[0]
                            );
                            setFieldTouched("company_logo", true);
                        }}
                    />
                </div>
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
                    <div className="company_form_stamp">
                        <TextField
                            label="Cachet"
                            type="file"
                            name="company_stamp"
                            onChange={(event: any) => {
                                setFieldValue(
                                    "company_stamp",
                                    event.target.files[0]
                                );
                                setFieldTouched("company_stamp", true);
                            }}
                        />
                    </div>
                </div>
            </div>
            <Text className="company_form_txt_divide_mov">Admin</Text>{" "}
            <hr className="company_form_hr_solid" />
            <div className="head_company_form">
                <div className="head_company_form_fields">
                    {/* Hidden field for society_id */}
                    <TextField
                        type="hidden"
                        value={values.societe}
                        onChange={handleChange}
                        placeholder="Société"
                        name="societe"
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
                <div className="company_form_pict">
                    {/* User picture */}
                    <TextField
                        label="Photo de profile"
                        type="file"
                        // name="company_stamp"
                        // onChange={(event: any) => {
                        //     setFieldValue(
                        //         "company_stamp",
                        //         event.target.files[0]
                        //     );
                        //     setFieldTouched("company_stamp", true);
                        // }}
                    />
                </div>
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

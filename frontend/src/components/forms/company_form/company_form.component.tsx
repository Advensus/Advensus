import { DefaultButton, Text, TextField } from "@fluentui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ICompany } from "../../../lib";
import {
    NewCompanyDtoIn,
    NewCompanyDtoOut,
} from "../../../lib/dto/company.dto";
import CompanyService from "../../../services/company.service";
import UserService from "../../../services/user.service";
import * as Yup from "yup";

export interface ICompanyFormProps {
    default_props?: boolean;
    onCreate: (data: NewCompanyDtoIn) => void;
    cancel?: () => void;
    company?: ICompany;
}

const validationSchema = Yup.object().shape({
    company_name: Yup.string().required("Ce champ est requis!"),
    company_adress: Yup.string().required("Ce champ est requis!"),
    phone_number: Yup.string().required("Ce champ est requis!"),
    fix_number: Yup.string().required("Ce champ est requis!"),
    username: Yup.string().required("Ce champ est requis!"),
    first_name: Yup.string().required("Ce champ est requis!"),
    email: Yup.string()
        .email("Format email invalide!")
        .required("Ce champ est requis!"),
    company_phone_number: Yup.string().required("Ce champ est requis!"),
    adress: Yup.string().required("Ce champ est requis!"),
    password: Yup.string().required("Ce champ est requis!"),
    societe: Yup.string().required("Ce champ est requis!"),
    company_logo: Yup.string().required("Ce champ est requis!"),
    company_stamp: Yup.string().required("Ce champ est requis!"),
});

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
        handleBlur,
        errors,
        touched,
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
            societe: "default_value",
            company_logo: "",
            company_stamp: "",
        },
        onSubmit,
        validationSchema,
    });

    console.log("Form errors:", errors);
    console.log("Form visited fields:", touched);

    return (
        <form
            name="new_comp"
            onSubmit={handleSubmit}
            className="company_form_container"
        >
            <Text className="company_form_txt_divide_mov">Société</Text>
            <hr className="company_form_hr_solid" />
            <div className="of_company_form_sect">
                <div>
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
                    {touched.company_logo && errors.company_logo ? (
                        <Text className="errors_message">
                            {errors.company_logo}
                        </Text>
                    ) : null}
                </div>
                <div className="of_company_form_fields">
                    <div>
                        <TextField
                            type="text"
                            value={values.company_name}
                            onChange={handleChange}
                            placeholder="Nom Société"
                            name="company_name"
                            onBlur={handleBlur}
                        />
                        {touched.company_name && errors.company_name ? (
                            <Text className="errors_message">
                                {errors.company_name}
                            </Text>
                        ) : null}
                    </div>
                    <div>
                        <TextField
                            type="text"
                            value={values.company_adress}
                            onChange={handleChange}
                            placeholder="Adresse de la Société"
                            name="company_adress"
                            onBlur={handleBlur}
                        />
                        {touched.company_adress && errors.company_adress ? (
                            <Text className="errors_message">
                                {errors.company_adress}
                            </Text>
                        ) : null}
                    </div>
                    <div>
                        <TextField
                            type="text"
                            value={values.company_phone_number}
                            onChange={handleChange}
                            placeholder="Numéro de la Société"
                            name="company_phone_number"
                            onBlur={handleBlur}
                        />
                        {touched.company_phone_number &&
                        errors.company_phone_number ? (
                            <Text className="errors_message">
                                {errors.company_phone_number}
                            </Text>
                        ) : null}
                    </div>
                    <div>
                        <TextField
                            type="text"
                            value={values.fix_number}
                            onChange={handleChange}
                            placeholder="Numéro 2 de la Société"
                            name="fix_number"
                        />
                        {touched.fix_number && errors.fix_number ? (
                            <Text className="errors_message">
                                {errors.fix_number}
                            </Text>
                        ) : null}
                    </div>
                    <div>
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
                                onBlur={handleBlur}
                            />
                        </div>
                        {touched.company_stamp && errors.company_stamp ? (
                            <Text className="errors_message">
                                {errors.company_stamp}
                            </Text>
                        ) : null}
                    </div>
                </div>
            </div>
            <Text className="company_form_txt_divide_mov">Admin</Text>{" "}
            <hr className="company_form_hr_solid" />
            <div className="head_company_form">
                <div className="head_company_form_fields">
                    {/* Hidden field for society_id */}
                    <div>
                        <TextField
                            type="hidden"
                            value={values.societe}
                            onChange={handleChange}
                            placeholder="Société"
                            name="societe"
                            onBlur={handleBlur}
                        />
                        {touched.societe && errors.societe ? (
                            <Text className="errors_message">
                                {errors.societe}
                            </Text>
                        ) : null}
                    </div>
                    <div>
                        <TextField
                            type="text"
                            value={values.first_name}
                            onChange={handleChange}
                            placeholder="Prénom"
                            name="first_name"
                            onBlur={handleBlur}
                        />
                        {touched.first_name && errors.first_name ? (
                            <Text className="errors_message">
                                {errors.first_name}
                            </Text>
                        ) : null}
                    </div>
                    <div>
                        <TextField
                            type="text"
                            value={values.username}
                            onChange={handleChange}
                            placeholder="Nom"
                            name="username"
                            onBlur={handleBlur}
                        />
                        {touched.username && errors.username ? (
                            <Text className="errors_message">
                                {errors.username}
                            </Text>
                        ) : null}
                    </div>
                    <div>
                        <TextField
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="Email"
                            name="email"
                            onBlur={handleBlur}
                        />
                        {touched.email && errors.email ? (
                            <Text className="errors_message">
                                {errors.email}
                            </Text>
                        ) : null}
                    </div>
                    <div>
                        <TextField
                            type="text"
                            value={values.phone_number}
                            onChange={handleChange}
                            placeholder="Téléphone"
                            name="phone_number"
                            onBlur={handleBlur}
                        />
                        {touched.phone_number && errors.phone_number ? (
                            <Text className="errors_message">
                                {errors.phone_number}
                            </Text>
                        ) : null}
                    </div>
                    <div>
                        <TextField
                            type="text"
                            value={values.adress}
                            onChange={handleChange}
                            placeholder="Adresse"
                            name="adress"
                            onBlur={handleBlur}
                        />
                        {touched.adress && errors.adress ? (
                            <Text className="errors_message">
                                {errors.adress}
                            </Text>
                        ) : null}
                    </div>
                    <div>
                        <TextField
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="Password"
                            name="password"
                            canRevealPassword
                            revealPasswordAriaLabel="Show password"
                            onBlur={handleBlur}
                        />
                        {touched.password && errors.password ? (
                            <Text className="errors_message">
                                {errors.password}
                            </Text>
                        ) : null}
                    </div>
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

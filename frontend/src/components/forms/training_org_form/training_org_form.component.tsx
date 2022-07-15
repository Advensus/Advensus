import {
    DefaultButton,
    Dropdown,
    IDropdownOption,
    IDropdownStyles,
    Text,
    TextField,
} from "@fluentui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { NewOrganizationDtoOut } from "../../../lib/dto/company.dto";
import { IOrg } from "../../../lib/interfaces/Company";
import CompanyService from "../../../services/company.service";
import * as Yup from "yup";

export interface ITrainingOrganizationFormProps {
    default_props?: boolean;
    onCreate: (data: IOrg) => void;
    cancel?: () => void;
    org?: IOrg;
}

const validationSchema = Yup.object().shape({
    company_name: Yup.string().required("Ce champ est requis!"),
    company_adress: Yup.string().required("Ce champ est requis!"),
    company_phone_number: Yup.string().required("Ce champ est requis!"),
    fix_number: Yup.string().required("Ce champ est requis!"),
    societe_formation: Yup.string().required("Ce champ est requis!"),
    company_stamp: Yup.string().required("Ce champ est requis!"),
    company_logo: Yup.string().required("Ce champ est requis!"),
    password_connexion: Yup.string().required("Ce champ est requis!"),
    // password_messagerie: Yup.string().required("Ce champ est requis!"),
    email: Yup.string()
        .email("Format email invalide!")
        .required("Ce champ est requis!"),
});

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: {} };

export const TrainingOrganizationFormComponent: React.FC<
    ITrainingOrganizationFormProps
> = ({ cancel, onCreate, org }) => {
    const [trainingsCompanies, setTrainingsCompanies] = useState<
        IDropdownOption[]
    >([]);

    // const [selectedSociety, setSelectedSociety] =
    //     React.useState<IDropdownOption>();

    useEffect(() => {
        getSociete();
        console.log({ org });
    }, []);

    const getSociete = async () => {
        await CompanyService.get_all_societe()
            .then(async (response) => {
                if (response.status !== 200) {
                    //@TODO #4
                    // alert('error getting users');
                    console.log("the error resp", response);
                    return [];
                }
                return response.json();
            })
            .then((respCompanies: IOrg[]) => {
                const companies = respCompanies.map((_) => {
                    return { key: _.id, text: _.company_name };
                });
                setTrainingsCompanies(companies);
            })
            .catch((err) => {
                console.log("error while getting tainings companies");
            });
    };

    const onSubmit = (val: NewOrganizationDtoOut) => {
        // val.societe_formation = selectedSociety ? selectedSociety.key : "";
        console.log({ val });
        const formData = new FormData();
        formData.append("company_name", val.company_name);
        formData.append("company_adress", val.company_adress);
        formData.append("company_phone_number", val.company_phone_number);
        formData.append("fix_number", `${val.fix_number}`);
        formData.append("societe_formation", `${val.societe_formation}`);
        formData.append("company_stamp", val.company_stamp);
        formData.append("company_logo", val.company_logo);
        formData.append("password_messagerie", val.password_messagerie);
        formData.append("password_connexion", val.password_connexion);
        // formData.append("password_connexion", ORG + val.password_connexion);
        formData.append("email", val.email);
        CompanyService.new_organization(formData)
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log({ response });
                }
                const data = (await response.json()) as IOrg;
                onCreate(data);
            })
            .catch((err) => {
                console.log("error while adding new organization:", err);
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
    } = useFormik<NewOrganizationDtoOut>({
        initialValues: {
            company_name: "",
            company_adress: "",
            company_phone_number: "",
            fix_number: "",
            societe_formation: "",
            company_stamp: "",
            company_logo: "",
            password_connexion: "",
            password_messagerie: "",
            email: "",
        },
        onSubmit,
        validationSchema,
    });

    return (
        <div className="training_org_form_container">
            <form onSubmit={handleSubmit}>
                <Text className="training_org_form_txt_divide_mov">O-F</Text>
                <hr className="training_org_form_hr_solid" />
                <div className="of_training_org_form_sect">
                    <div className="training_org_form_pict">
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
                            placeholder="Logo de l'organisme"
                        />
                    </div>
                    <div className="of_training_org_form_fields">
                        <div>
                            <Dropdown
                                selectedKey={values.societe_formation}
                                onChange={(
                                    event: React.FormEvent<HTMLDivElement>,
                                    item?: IDropdownOption
                                ): void => {
                                    setFieldValue(
                                        "societe_formation",
                                        item?.key
                                    );
                                }}
                                // onChange={onChangeCompany}
                                placeholder="Société(s)"
                                options={trainingsCompanies}
                            />
                            {touched.societe_formation &&
                            errors.societe_formation ? (
                                <Text className="errors_message">
                                    {errors.societe_formation}
                                </Text>
                            ) : null}
                        </div>

                        <div>
                            <TextField
                                type="text"
                                placeholder="Nom O-F"
                                name="company_name"
                                onChange={handleChange}
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
                                name="company_adress"
                                onChange={handleChange}
                                placeholder="Adress O-F"
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
                                placeholder="Téléphone O-F"
                                name="company_phone_number"
                                onChange={handleChange}
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
                                placeholder="Fixe O-F"
                                name="fix_number"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.fix_number && errors.fix_number ? (
                                <Text className="errors_message">
                                    {errors.fix_number}
                                </Text>
                            ) : null}
                        </div>
                        <hr />
                        <div>
                            <TextField
                                type="email"
                                placeholder="Email O-F"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.email && errors.email ? (
                                <Text className="errors_message">
                                    {errors.email}
                                </Text>
                            ) : null}
                        </div>

                        {/* <TextField type="text" placeholder="Serveur sortant" />

                        <TextField type="text" placeholder="Port" /> */}

                        <TextField
                            type="password"
                            placeholder="Mot de pass d'emailing"
                            canRevealPassword
                            revealPasswordAriaLabel="Show password"
                            name="password_messagerie"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <div>
                            <TextField
                                type="password"
                                placeholder="Mot de passe de connexion"
                                canRevealPassword
                                revealPasswordAriaLabel="Show password"
                                name="password_connexion"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.password_connexion &&
                            errors.password_connexion ? (
                                <Text className="errors_message">
                                    {errors.password_connexion}
                                </Text>
                            ) : null}
                        </div>

                        <hr />

                        <TextField
                            type="text"
                            placeholder="Identifiant mon compte formation"
                            name="identifiant"
                        />

                        <TextField
                            type="password"
                            placeholder="Mot de passe Mon compte formation"
                            canRevealPassword
                            revealPasswordAriaLabel="Show password"
                        />

                        <div className="training_org_form_stamp">
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
                    </div>
                </div>

                <div className="training_org_form_form_btns">
                    <DefaultButton text="Annuler" onClick={cancel} />
                    <DefaultButton
                        style={{ marginLeft: "10px" }}
                        text="Sauvegarder"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    );
};

import {
    DefaultButton,
    Dropdown,
    IDropdownOption,
    IDropdownStyles,
    Text,
    TextField,
} from "@fluentui/react";
import { Formik, Field, Form, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ORG } from "../../../lib";
import {
    NewCompanyDtoIn,
    NewCompanyDtoOut,
    NewOrganizationDtoOut,
} from "../../../lib/dto/company.dto";
import { ICompany } from "../../../lib/interfaces/Company";
import CompanyService from "../../../services/company.service";

export interface ITrainingOrganizationFormProps {
    default_props?: boolean;
    onCreate: (data: NewCompanyDtoIn) => void;
    cancel?: () => void;
}

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: {} };

export const TrainingOrganizationFormComponent: React.FC<
    ITrainingOrganizationFormProps
> = ({ cancel, onCreate }) => {
    const [trainingsCompanies, setTrainingsCompanies] = useState<
        IDropdownOption[]
    >([]);

    const [selectedSociety, setSelectedSociety] =
        React.useState<IDropdownOption>();

    const onChangeCompany = (
        event: React.FormEvent<HTMLDivElement>,
        item?: IDropdownOption
    ): void => {
        setSelectedSociety(item);
    };

    useEffect(() => {
        getSociete();
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
            .then((respCompanies: ICompany[]) => {
                console.log("the companies datas:", respCompanies);
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
        val.societe_formation = selectedSociety ? selectedSociety.key : "";
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
                const data = (await response.json()) as NewCompanyDtoIn;
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
    } = useFormik<NewOrganizationDtoOut>({
        initialValues: {
            company_name: "",
            company_adress: "",
            company_phone_number: "",
            fix_number: "",
            societe_formation: selectedSociety
                ? selectedSociety.key
                : "dfqfqds",
            company_stamp: "",
            company_logo: "",
            password_connexion: "",
            password_messagerie: "",
            email: "",
        },
        onSubmit,
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
                        <Dropdown
                            selectedKey={
                                selectedSociety
                                    ? selectedSociety.key
                                    : undefined
                            }
                            onChange={onChangeCompany}
                            placeholder="Société(s)"
                            options={trainingsCompanies}
                        />

                        <TextField
                            type="text"
                            placeholder="Nom O-F"
                            name="company_name"
                            onChange={handleChange}
                        />

                        <TextField
                            type="text"
                            name="company_adress"
                            onChange={handleChange}
                            placeholder="Adress O-F"
                        />

                        <TextField
                            type="text"
                            placeholder="Téléphone O-F"
                            name="company_phone_number"
                            onChange={handleChange}
                        />

                        <TextField
                            type="text"
                            placeholder="Fixe O-F"
                            name="fix_number"
                            onChange={handleChange}
                        />
                        <hr />
                        <TextField
                            type="email"
                            placeholder="Email O-F"
                            name="email"
                            onChange={handleChange}
                        />

                        {/* <TextField type="text" placeholder="Serveur sortant" />

                        <TextField type="text" placeholder="Port" /> */}

                        <TextField
                            type="password"
                            placeholder="Mot de pass d'emailing"
                            canRevealPassword
                            revealPasswordAriaLabel="Show password"
                            name="password_messagerie"
                            onChange={handleChange}
                        />
                        <TextField
                            type="password"
                            placeholder="Mot de passe de connexion"
                            canRevealPassword
                            revealPasswordAriaLabel="Show password"
                            name="password_connexion"
                            onChange={handleChange}
                        />

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

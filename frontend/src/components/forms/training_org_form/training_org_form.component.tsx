import {
    DefaultButton,
    Dropdown,
    IDropdownOption,
    IDropdownStyles,
    Text,
    TextField,
} from "@fluentui/react";
import { Formik, Field, Form } from "formik";
import React, { useEffect, useState } from "react";
import {
    NewCompanyDtoIn,
    NewCompanyDtoOut,
    NewOrganizationDtoOut,
} from "../../../lib/dto/company.dto";
import { ICompany } from "../../../lib/interfaces/Company";
import CompanyService from "../../../services/company.service";

export interface ITrainingOrganizationFormProps {
    default_props?: boolean;
    cancel?: () => void;
}

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: {} };

export const TrainingOrganizationFormComponent: React.FC<
    ITrainingOrganizationFormProps
> = ({ cancel }) => {
    const [trainingsCompanies, setTrainingsCompanies] = useState<
        IDropdownOption[]
    >([]);
    // const [trainingsCompanies, setTrainingsCompanies] = useState<ICompany[]>(
    //     []
    // );

    const [selectedSociety, setSelectedSociety] =
        React.useState<IDropdownOption<string>>();

    const onChange = (
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
        console.log({ val });
        if (val) {
            const logoPath = val.company_logo.lastIndexOf("\\");
            val.company_logo = val.company_logo.substring(logoPath + 2);
            console.log("logo path", val.company_logo);
        }
        CompanyService.new_organization(val)
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log({ response });
                }
                const data = (await response.json()) as NewCompanyDtoIn;
                console.log("the current adding organization:", data);
                // onCreate(data);
            })
            .catch((err) => {
                console.log("error while adding new organization:", err);
            });
    };

    const initialValues = {
        company_name: "",
        company_adress: "",
        company_phone_number: "",
        fix_number: "",
        societe_formation: selectedSociety?.key ? selectedSociety.key : "",
        company_stamp: undefined,
        company_logo: "",
    };

    return (
        <div className="training_org_form_container">
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <Form>
                    <Text className="training_org_form_txt_divide_mov">
                        O-F
                    </Text>
                    <hr className="training_org_form_hr_solid" />
                    <div className="of_training_org_form_sect">
                        <Field name="company_logo">
                            {(props: { field: any; meta: any; form: any }) => {
                                const { field, meta, form } = props;
                                return (
                                    <div className="training_org_form_pict">
                                        <TextField
                                            type="file"
                                            id="company_logo"
                                            placeholder="Logo de l'organisme"
                                            {...field}
                                        />
                                    </div>
                                );
                            }}
                        </Field>
                        <div className="of_training_org_form_fields">
                            <Field as="select" name="societe_formation">
                                {trainingsCompanies.map((_) => {
                                    return (
                                        <option key={_.key} value={_.key}>
                                            {_.text}
                                        </option>
                                    );
                                })}
                            </Field>
                            <Field name="company_name">
                                {(props: {
                                    field: any;
                                    meta: any;
                                    form: any;
                                }) => {
                                    const { field, meta, form } = props;
                                    return (
                                        <TextField
                                            type="text"
                                            placeholder="Nom O-F"
                                            {...field}
                                        />
                                    );
                                }}
                            </Field>
                            <Field name="company_adress">
                                {(props: {
                                    field: any;
                                    meta: any;
                                    form: any;
                                }) => {
                                    const { field, meta, form } = props;
                                    return (
                                        <TextField
                                            type="text"
                                            id="company_adress"
                                            placeholder="Adress O-F"
                                            {...field}
                                        />
                                    );
                                }}
                            </Field>
                            <Field name="company_phone_number">
                                {(props: {
                                    field: any;
                                    meta: any;
                                    form: any;
                                }) => {
                                    const { field, meta, form } = props;
                                    return (
                                        <TextField
                                            type="text"
                                            id="company_phone_number"
                                            placeholder="Téléphone O-F"
                                            {...field}
                                        />
                                    );
                                }}
                            </Field>
                            <Field name="fix_number">
                                {(props: {
                                    field: any;
                                    meta: any;
                                    form: any;
                                }) => {
                                    const { field, meta, form } = props;
                                    return (
                                        <TextField
                                            type="text"
                                            id="fix_number"
                                            placeholder="Fixe O-F"
                                            {...field}
                                        />
                                    );
                                }}
                            </Field>
                            <Field name="password">
                                {() => {
                                    return (
                                        <TextField
                                            type="password"
                                            placeholder="Password"
                                            canRevealPassword
                                            revealPasswordAriaLabel="Show password"
                                        />
                                    );
                                }}
                            </Field>
                            <hr />
                            {/* <Field
                            type="text"
                            // value={props.values.password}
                            // onChange={props.handleChange}
                            placeholder="Identifiant mon compte formation"
                            name="identifiant"
                        /> */}
                            <Field name="password">
                                {() => {
                                    return (
                                        <TextField
                                            type="password"
                                            placeholder="Mot de passe Mon compte formation"
                                            canRevealPassword
                                            revealPasswordAriaLabel="Show password"
                                        />
                                    );
                                }}
                            </Field>
                            <Field name="company_stamp">
                                {(props: {
                                    field: any;
                                    meta: any;
                                    form: any;
                                }) => {
                                    const { field, meta, form } = props;
                                    return (
                                        <div className="training_org_form_stamp">
                                            <TextField
                                                type="file"
                                                placeholder="Cachet de l'organisme"
                                                {...field}
                                            />
                                        </div>
                                    );
                                }}
                            </Field>
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
                </Form>
            </Formik>
        </div>
    );
};

const Cachet = () => {
    <div>Cachet</div>;
};

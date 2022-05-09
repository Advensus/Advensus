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
        // CompanyService.new_organization(val)
        //     .then(async (response) => {
        //         if (response.status !== 200) {
        //             console.log({ response });
        //         }
        //         const data = (await response.json()) as NewCompanyDtoIn;
        //         console.log("the current adding organization:", data.id);
        //         // onCreate(data);
        //     })
        //     .catch((err) => {
        //         console.log("error while adding new organization:", err);
        //     });
    };

    const { values, handleChange, handleSubmit } =
        useFormik<NewOrganizationDtoOut>({
            initialValues: {
                company_name: "",
                company_adress: "",
                company_phone_number: "",
                societe_formation_id: selectedSociety ? selectedSociety : "",
            },
            onSubmit,
        });

    return (
        <form onSubmit={handleSubmit} className="training_org_form_container">
            <Text className="training_org_form_txt_divide_mov">O-F</Text>
            <hr className="training_org_form_hr_solid" />
            <div className="of_training_org_form_sect">
                <div className="training_org_form_pict">Logo</div>
                <div className="of_training_org_form_fields">
                    {/* <TextField
                        type="text"
                        // value={values.first_name}
                        // onChange={handleChange}
                        placeholder="Société"
                        name="societe_formation_id"
                    /> */}
                    <Dropdown
                        selectedKey={
                            selectedSociety ? selectedSociety.key : undefined
                        }
                        onChange={onChange}
                        placeholder="Société"
                        options={trainingsCompanies}
                        styles={dropdownStyles}
                    />
                    <TextField
                        type="text"
                        value={values.company_name}
                        onChange={handleChange}
                        placeholder="Nom O-F"
                        name="company_name"
                    />
                    <TextField
                        type="text"
                        value={values.company_adress}
                        onChange={handleChange}
                        placeholder="Adress O-F"
                        name="company_adress"
                    />
                    <TextField
                        type="text"
                        value={values.company_phone_number}
                        onChange={handleChange}
                        placeholder="Téléphone O-F"
                        name="company_phone_number"
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
                    <hr />
                    <TextField
                        type="text"
                        // value={values.password}
                        // onChange={handleChange}
                        placeholder="Identifiant mon compte formation"
                        name="password"
                        canRevealPassword
                        revealPasswordAriaLabel="Show password"
                    />
                    <TextField
                        type="password"
                        // value={values.password}
                        // onChange={handleChange}
                        placeholder="Mot de passe Mon compte formation"
                        name="password"
                        canRevealPassword
                        revealPasswordAriaLabel="Show password"
                    />
                    <div className="training_org_form_stamp">Cachet</div>
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
    );
};

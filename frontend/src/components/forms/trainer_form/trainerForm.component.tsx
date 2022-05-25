import {
    DefaultButton,
    Dropdown,
    IDropdownOption,
    Text,
    TextField,
} from "@fluentui/react";
import { Field, Form, Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
    BASIC_RP_FORM,
    ITraining,
    IUser,
    NewUserDto,
    NewUserDtoIn,
    SERVICES_FORM,
    SUPER_RP_FORM,
    TEACHEAR_FORM,
} from "../../../lib";
import { ICompany } from "../../../lib/interfaces/Company";
import CompanyService from "../../../services/company.service";
import UserService from "../../../services/user.service";

export interface ITrainerFormProps {
    default_props?: boolean;
    cancel?: () => void;
    onCreate: (data: IUser) => void;
    formToDisplay?: string;
    trainings: ITraining[];
}

export const TrainerFormComponent: React.FC<ITrainerFormProps> = ({
    cancel,
    onCreate,
    formToDisplay,
    trainings,
}) => {
    const [trainingAvailable, setTrainingAvailable] = useState<
        IDropdownOption[]
    >([]);
    const [societies, setSocieties] = useState<IDropdownOption[]>([]);

    useEffect(() => {
        if (trainings) {
            const dropTraining = trainings.map((_) => {
                let Civility = {
                    key: _.id,
                    text: _.intitule,
                };
                return Civility;
            });
            setTrainingAvailable(dropTraining);
        }
        getOrganization();
    }, [formToDisplay]);

    const getOrganization = async () => {
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
            .then((respOSocieties: ICompany[]) => {
                console.log("the Organisations datas:", respOSocieties);
                if (respOSocieties) {
                    const dropOrgs = respOSocieties.map((_) => {
                        let orgs = {
                            key: _.id,
                            text: _.company_name,
                        };
                        return orgs;
                    });
                    setSocieties(dropOrgs);
                }
            })
            .catch((err) => {
                console.log("error while getting tainings organisations");
            });
    };

    const onSubmit = (value: NewUserDto) => {
        console.log({ value });
        const formData = new FormData();
        formData.append("username", value.username);
        formData.append("first_name", value.first_name);
        formData.append("email", value.email);
        formData.append("phone_number", value.phone_number);
        formData.append("adress", value.adress);
        formData.append("password", value.password);
        formData.append("horaire", `${value.horaire}`);
        formData.append("competence[0]", value.competence as any);
        formData.append("competence[1]", value.competence as any);
        formData.append("competence[2]", value.competence as any);
        formData.append("competence[3]", value.competence as any);
        formData.append("appartenir_societe", `${value.appartenir_societe}`);
        formData.append("cv", value.cv ? value.cv : "");
        if (formToDisplay === TEACHEAR_FORM) {
            UserService.new_trainer(formData)
                .then(async (response) => {
                    if (response.status !== 200) {
                        console.log({ response });
                    }
                    const data = (await response.json()) as IUser;
                    console.log("the user just added:", data);
                    onCreate(data);
                })
                .catch((err) => {
                    console.log("error while adding new trainer:", err);
                });
        }
        if (formToDisplay === SUPER_RP_FORM) {
            UserService.new_super_rp(value)
                .then(async (response) => {
                    if (response.status !== 200) {
                        console.log({ response });
                    }
                    const data = (await response.json()) as IUser;
                    onCreate(data);
                })
                .catch((err) => {
                    console.log("error while adding new super rp:", err);
                });
        }
        if (formToDisplay === BASIC_RP_FORM) {
            UserService.new_basic_rp(value)
                .then(async (response) => {
                    if (response.status !== 200) {
                        console.log({ response });
                    }
                    const data = (await response.json()) as IUser;
                    onCreate(data);
                })
                .catch((err) => {
                    console.log("error while adding new basic rp:", err);
                });
        }
    };

    const {
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
    } = useFormik<NewUserDto>({
        initialValues: {
            username: "",
            first_name: "",
            email: "",
            phone_number: "",
            adress: "",
            password: "",
            horaire: "",
            competence: [],
            appartenir_societe: "",
            cv: "",
        },
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit} className="trainer_form_container">
            {formToDisplay === TEACHEAR_FORM && (
                <Text className="trainer_txt_divide_mov">Formateur</Text>
            )}
            {formToDisplay === SUPER_RP_FORM && (
                <Text className="trainer_txt_divide_mov">
                    Super Responsable Pédagogique
                </Text>
            )}
            {formToDisplay === BASIC_RP_FORM && (
                <Text className="trainer_txt_divide_mov">
                    Responsable Pédagogique Normal
                </Text>
            )}
            <hr className="trainer_hr_solid" />
            <div className="own_trainer_sect">
                <div className="own_trainer_pict">
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
                <div className="own_trainer_fields">
                    <TextField
                        type="text"
                        placeholder="Fist name"
                        name="first_name"
                        value={values.first_name}
                        onChange={handleChange}
                    />

                    <TextField
                        type="text"
                        placeholder="Last name"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                    />

                    <TextField
                        type="email"
                        placeholder="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />

                    <TextField
                        type="text"
                        placeholder="Phonenumber"
                        name="phone_number"
                        value={values.phone_number}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <Text className="trainer_txt_divide_mov">Adress</Text>{" "}
            <hr className="trainer_hr_solid" />
            <div className="addr_trainer">
                <TextField
                    type="text"
                    placeholder="Adresse"
                    name="adress"
                    value={values.adress}
                    onChange={handleChange}
                />
            </div>
            <Text className="trainer_txt_divide_mov">Other</Text>{" "}
            <hr className="trainer_hr_solid" />
            <div className="oth_trainer">
                {formToDisplay === TEACHEAR_FORM && (
                    <>
                        <Dropdown
                            selectedKeys={values.competence}
                            onChange={(
                                event: React.FormEvent<HTMLDivElement>,
                                item?: IDropdownOption
                            ): void => {
                                console.log("item selected:", item?.key);
                                if (item) {
                                    const selected = item.selected
                                        ? [
                                              ...values.competence,
                                              item.key as string,
                                          ]
                                        : values.competence.filter(
                                              (key) => key !== item.key
                                          );
                                    setFieldValue("competence", selected);
                                    setFieldTouched("selected", true);
                                }
                            }}
                            placeholder="Competences"
                            multiSelect
                            options={trainingAvailable}
                        />

                        <TextField
                            type="text"
                            id="horaire"
                            placeholder="Horaire"
                            name="horaire"
                            value={values.horaire}
                            onChange={handleChange}
                        />
                    </>
                )}

                <Dropdown
                    selectedKey={values.appartenir_societe}
                    onChange={(
                        event: React.FormEvent<HTMLDivElement>,
                        item?: IDropdownOption
                    ): void => {
                        setFieldValue("appartenir_societe", item?.key);
                    }}
                    placeholder="SOCIETÉ(S) DE FORMATION(S)"
                    options={societies}
                />

                <TextField
                    type="password"
                    id="password"
                    placeholder="Password"
                    canRevealPassword
                    revealPasswordAriaLabel="Show password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                />

                <TextField
                    label="CV"
                    type="file"
                    name="cv"
                    onChange={(event: any) => {
                        setFieldValue("company_logo", event.target.files[0]);
                        setFieldTouched("company_logo", true);
                    }}
                />
            </div>
            <div className="trainer_form_btns">
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

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
    onCreate: (data: NewUserDtoIn) => void;
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
    const [selectedSkill, setSelectedSkill] = React.useState<string[]>([]);
    const [selectedSociety, setSelectedSociety] =
        React.useState<IDropdownOption>();
    const [societies, setSocieties] = useState<IDropdownOption[]>([]);

    const onChangeSkills = (
        event: React.FormEvent<HTMLDivElement>,
        item?: IDropdownOption
    ): void => {
        console.log("item selected:", item?.key);
        // setSelectedSkill(item);
        if (item) {
            setSelectedSkill(
                item.selected
                    ? [...selectedSkill, item.key as string]
                    : selectedSkill.filter((key) => key !== item.key)
            );
        }
    };

    const onChangeOrgs = (
        event: React.FormEvent<HTMLDivElement>,
        item?: IDropdownOption
    ): void => {
        setSelectedSociety(item);
    };

    useEffect(() => {
        console.log({ selectedSkill });
    }, [selectedSkill]);

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
        console.log("the skills:", selectedSkill);
        console.log({ value });
        if (formToDisplay === TEACHEAR_FORM) {
            value.appartenir_societe = selectedSociety
                ? selectedSociety.key
                : undefined;
            UserService.new_trainer(value)
                .then(async (response) => {
                    if (response.status !== 200) {
                        console.log({ response });
                    }
                    const data = (await response.json()) as NewUserDtoIn;
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
                    const data = (await response.json()) as NewUserDtoIn;
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
                    const data = (await response.json()) as NewUserDtoIn;
                    onCreate(data);
                })
                .catch((err) => {
                    console.log("error while adding new basic rp:", err);
                });
        }
    };

    const initialValues: NewUserDto = {
        username: "",
        first_name: "",
        email: "",
        phone_number: "",
        adress: "",
        password: "",
        horaire: "",
        // competence: selectedSkill,
        competence: [...selectedSkill],
        appartenir_societe: "",
        cv: undefined,
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validateOnChange={false}
        >
            <Form className="trainer_form_container">
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
                    <div className="own_trainer_pict">Img part</div>
                    <div className="own_trainer_fields">
                        <Field name="first_name">
                            {(props: { field: any; meta: any; form: any }) => {
                                const { field, meta, form } = props;
                                return (
                                    <TextField
                                        type="text"
                                        id="first_name"
                                        placeholder="Fist name"
                                        {...field}
                                    />
                                );
                            }}
                        </Field>
                        <Field name="username">
                            {(props: { field: any; meta: any; form: any }) => {
                                const { field, meta, form } = props;
                                return (
                                    <TextField
                                        type="text"
                                        // id="username"
                                        placeholder="Last name"
                                        {...field}
                                    />
                                );
                            }}
                        </Field>
                        <Field name="email">
                            {(props: { field: any; meta: any; form: any }) => {
                                const { field, meta, form } = props;
                                return (
                                    <TextField
                                        type="email"
                                        id="email"
                                        placeholder="email"
                                        {...field}
                                    />
                                );
                            }}
                        </Field>
                        <Field name="phone_number">
                            {(props: { field: any; meta: any; form: any }) => {
                                const { field, meta, form } = props;
                                return (
                                    <TextField
                                        type="text"
                                        id="Phonenumber"
                                        placeholder="Phonenumber"
                                        {...field}
                                    />
                                );
                            }}
                        </Field>
                    </div>
                </div>
                <Text className="trainer_txt_divide_mov">Adress</Text>{" "}
                <hr className="trainer_hr_solid" />
                <div className="addr_trainer">
                    <Field name="adress">
                        {(props: { field: any; meta: any; form: any }) => {
                            const { field, meta, form } = props;
                            return (
                                <TextField
                                    type="text"
                                    id="adress"
                                    placeholder="Adresse"
                                    {...field}
                                />
                            );
                        }}
                    </Field>
                </div>
                <Text className="trainer_txt_divide_mov">Other</Text>{" "}
                <hr className="trainer_hr_solid" />
                <div className="oth_trainer">
                    {formToDisplay === TEACHEAR_FORM && (
                        <>
                            {/* <Field as="select" multiSelect name="competence">
                                {trainingAvailable.map((_) => {
                                    return (
                                        <option key={_.key} value={_.key}>
                                            {_.text}
                                        </option>
                                    );
                                })}
                            </Field> */}
                            <Field name="competence">
                                {(props: {
                                    field: any;
                                    meta: any;
                                    form: any;
                                }) => {
                                    const { field, meta, form } = props;
                                    return (
                                        <Dropdown
                                            selectedKeys={selectedSkill}
                                            onChange={onChangeSkills}
                                            placeholder="Competences"
                                            multiSelect
                                            options={trainingAvailable}
                                            // {...field}
                                        />
                                    );
                                }}
                            </Field>
                            <Field name="horaire">
                                {(props: {
                                    field: any;
                                    meta: any;
                                    form: any;
                                }) => {
                                    const { field, meta, form } = props;
                                    return (
                                        <TextField
                                            type="text"
                                            id="horaire"
                                            placeholder="Horaire"
                                            {...field}
                                        />
                                    );
                                }}
                            </Field>
                        </>
                    )}

                    <Field name="appartenir_societe">
                        {(props: { field: any; meta: any; form: any }) => {
                            const { field, meta, form } = props;
                            return (
                                <Dropdown
                                    selectedKey={
                                        selectedSociety
                                            ? selectedSociety.key
                                            : undefined
                                    }
                                    onChange={onChangeOrgs}
                                    placeholder="SOCIETÉ(S) DE FORMATION(S)"
                                    options={societies}
                                    {...field}
                                />
                            );
                        }}
                    </Field>
                    <Field name="password">
                        {(props: { field: any; meta: any; form: any }) => {
                            const { field, meta, form } = props;
                            return (
                                <TextField
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    canRevealPassword
                                    revealPasswordAriaLabel="Show password"
                                    {...field}
                                />
                            );
                        }}
                    </Field>
                    <Field name="cv">
                        {(props: { field: any; meta: any; form: any }) => {
                            const { field, meta, form } = props;
                            return (
                                <TextField label="CV" type="file" {...field} />
                            );
                        }}
                    </Field>
                </div>
                <div className="trainer_form_btns">
                    <DefaultButton text="Annuler" onClick={cancel} />
                    <DefaultButton
                        style={{ marginLeft: "10px" }}
                        text="Sauvegarder"
                        type="submit"
                    />
                </div>
            </Form>
        </Formik>
    );
};

const Civility = [
    { key: "Male", text: "Mr" },
    // { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "Female", text: "Mme" },
];

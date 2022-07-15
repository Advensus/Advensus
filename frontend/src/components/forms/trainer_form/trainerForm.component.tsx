import {
    DefaultButton,
    Dropdown,
    DropdownMenuItemType,
    IDropdownOption,
    Text,
    TextField,
} from "@fluentui/react";
import { Field, Form, Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@fluentui/react/lib/Checkbox";
import {
    BASIC_RP_FORM,
    IFormerSchedule,
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
import { TrainerTimeTableComponent } from "./trainer_time_table/trainerTimeTable.component";

export interface ITrainerFormProps {
    default_props?: boolean;
    cancel?: () => void;
    onCreate: (data: IUser) => void;
    formToDisplay?: string;
    trainings: ITraining[];
    user?: IUser;
}

export const TrainerFormComponent: React.FC<ITrainerFormProps> = ({
    cancel,
    onCreate,
    formToDisplay,
    trainings,
    user,
}) => {
    const [trainingAvailable, setTrainingAvailable] = useState<
        IDropdownOption[]
    >([]);
    const [societies, setSocieties] = useState<IDropdownOption[]>([]);

    const [isChecked, setIsChecked] = React.useState(false);
    const onChange = React.useCallback(
        (
            ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
            checked?: boolean
        ): void => {
            setIsChecked(!!checked);
        },
        []
    );

    useEffect(() => {
        console.log({ isChecked });
    }, [isChecked]);

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
        console.log({ user });
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
        for (let i = 0; i < value.competence.length; i++) {
            formData.append("competence", value.competence[0 + i]);
        }
        // formData.append("competence", value.competence[2]);
        // formData.append("competence", value.competence[3]);
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
                    // value.daysOfWeek && value.daysOfWeek.attached = data.id;
                    if (data.id && value.daysOfWeek) {
                        value.daysOfWeek.attached = data.id;
                        // value.daysOfWeekToStok.sunday = `${value.daysOfWeek?.monday.from} / ${value.daysOfWeek?.monday.until}`;
                        addFormerIsSchedule(value);
                    }
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

    const addFormerIsSchedule = (theVal: NewUserDto) => {
        console.log({ theVal });
        const formData = new FormData();
        formData.append(
            "attached",
            theVal.daysOfWeek ? theVal.daysOfWeek.attached : ""
        );
        formData.append(
            "monday",
            `${theVal.daysOfWeek?.monday.from} / ${theVal.daysOfWeek?.monday.until}`
        );
        formData.append(
            "tuesday",
            `${theVal.daysOfWeek?.tuesday.from} / ${theVal.daysOfWeek?.tuesday.until}`
        );
        formData.append(
            "wednesday",
            `${theVal.daysOfWeek?.wednesday.from} / ${theVal.daysOfWeek?.wednesday.until}`
        );
        formData.append(
            "thursday",
            `${theVal.daysOfWeek?.thursday.from} / ${theVal.daysOfWeek?.thursday.until}`
        );
        formData.append(
            "friday",
            `${theVal.daysOfWeek?.friday.from} / ${theVal.daysOfWeek?.friday.until}`
        );
        formData.append(
            "saturday",
            `${theVal.daysOfWeek?.saturday.from} / ${theVal.daysOfWeek?.saturday.until}`
        );
        formData.append(
            "sunday",
            `${theVal.daysOfWeek?.sunday.from} / ${theVal.daysOfWeek?.sunday.until}`
        );
        UserService.new_trainer_schedule(formData)
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log({ response });
                }
                const data = (await response.json()) as IFormerSchedule;
                console.log("The current former schedule:", data);
                // onCreated(data, trainee);
            })
            .catch((err) => {
                console.log("error while adding new trainer schedule:", err);
            });
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
            daysOfWeek: {
                monday: { from: "", until: "" },
                tuesday: { from: "", until: "" },
                wednesday: { from: "", until: "" },
                thursday: { from: "", until: "" },
                friday: { from: "", until: "" },
                saturday: { from: "", until: "" },
                sunday: { from: "", until: "" },
                attached: "",
            },
            // daysOfWeekToStok: {
            //     monday: "",
            //     tuesday: "",
            //     wednesday: "",
            //     thursday: "",
            //     friday: "",
            //     saturday: "",
            //     sonday: "",
            // },
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
            {/* TRAINER'S SCHEDULER */}
            {formToDisplay === TEACHEAR_FORM && (
                <>
                    <Text className="trainer_txt_divide_mov">Horraires</Text>{" "}
                    <hr className="trainer_hr_solid" />
                    <div className="trainer_is_scheduler_container">
                        <TextField
                            type="text"
                            id="horaire"
                            placeholder="Horaire"
                            name="horaire"
                            value={values.horaire}
                            onChange={handleChange}
                        />
                        <TrainerTimeTableComponent
                            labelChecbox="Lun"
                            fromKeySelected={values.daysOfWeek?.monday.from}
                            untilKeySelected={values.daysOfWeek?.monday.until}
                            valuesDropdown={workingHours}
                            theChangeOfFrom={(
                                event: React.FormEvent<HTMLDivElement>,
                                item?: IDropdownOption
                            ): void => {
                                setFieldValue(
                                    "daysOfWeek.monday.from",
                                    item?.key
                                );
                            }}
                            theChangeOfUntil={(
                                event: React.FormEvent<HTMLDivElement>,
                                item?: IDropdownOption
                            ): void => {
                                setFieldValue(
                                    "daysOfWeek.monday.until",
                                    item?.key
                                );
                            }}
                        />
                        <TrainerTimeTableComponent
                            labelChecbox="Mar"
                            fromKeySelected={values.daysOfWeek?.tuesday.from}
                            untilKeySelected={values.daysOfWeek?.tuesday.until}
                            valuesDropdown={workingHours}
                            theChangeOfFrom={(
                                event: React.FormEvent<HTMLDivElement>,
                                item?: IDropdownOption
                            ): void => {
                                setFieldValue(
                                    "daysOfWeek.tuesday.from",
                                    item?.key
                                );
                            }}
                            theChangeOfUntil={(
                                event: React.FormEvent<HTMLDivElement>,
                                item?: IDropdownOption
                            ): void => {
                                setFieldValue(
                                    "daysOfWeek.tuesday.until",
                                    item?.key
                                );
                            }}
                        />
                        <TrainerTimeTableComponent
                            labelChecbox="Mer"
                            fromKeySelected={values.daysOfWeek?.wednesday.from}
                            untilKeySelected={
                                values.daysOfWeek?.wednesday.until
                            }
                            valuesDropdown={workingHours}
                            theChangeOfFrom={(
                                event: React.FormEvent<HTMLDivElement>,
                                item?: IDropdownOption
                            ): void => {
                                setFieldValue(
                                    "daysOfWeek.wednesday.from",
                                    item?.key
                                );
                            }}
                            theChangeOfUntil={(
                                event: React.FormEvent<HTMLDivElement>,
                                item?: IDropdownOption
                            ): void => {
                                setFieldValue(
                                    "daysOfWeek.wednesday.until",
                                    item?.key
                                );
                            }}
                        />
                        <TrainerTimeTableComponent
                            labelChecbox="Jeu"
                            fromKeySelected={values.daysOfWeek?.thursday.from}
                            untilKeySelected={values.daysOfWeek?.thursday.until}
                            valuesDropdown={workingHours}
                            theChangeOfFrom={(
                                event: React.FormEvent<HTMLDivElement>,
                                item?: IDropdownOption
                            ): void => {
                                setFieldValue(
                                    "daysOfWeek.thursday.from",
                                    item?.key
                                );
                            }}
                            theChangeOfUntil={(
                                event: React.FormEvent<HTMLDivElement>,
                                item?: IDropdownOption
                            ): void => {
                                setFieldValue(
                                    "daysOfWeek.thursday.until",
                                    item?.key
                                );
                            }}
                        />
                        <TrainerTimeTableComponent
                            labelChecbox="Ven"
                            fromKeySelected={values.daysOfWeek?.friday.from}
                            untilKeySelected={values.daysOfWeek?.friday.until}
                            valuesDropdown={workingHours}
                            theChangeOfFrom={(
                                event: React.FormEvent<HTMLDivElement>,
                                item?: IDropdownOption
                            ): void => {
                                setFieldValue(
                                    "daysOfWeek.friday.from",
                                    item?.key
                                );
                            }}
                            theChangeOfUntil={(
                                event: React.FormEvent<HTMLDivElement>,
                                item?: IDropdownOption
                            ): void => {
                                setFieldValue(
                                    "daysOfWeek.friday.until",
                                    item?.key
                                );
                            }}
                        />
                        <TrainerTimeTableComponent
                            labelChecbox="Sam"
                            fromKeySelected={values.daysOfWeek?.saturday.from}
                            untilKeySelected={values.daysOfWeek?.saturday.until}
                            valuesDropdown={workingHours}
                            theChangeOfFrom={(
                                event: React.FormEvent<HTMLDivElement>,
                                item?: IDropdownOption
                            ): void => {
                                setFieldValue(
                                    "daysOfWeek.saturday.from",
                                    item?.key
                                );
                            }}
                            theChangeOfUntil={(
                                event: React.FormEvent<HTMLDivElement>,
                                item?: IDropdownOption
                            ): void => {
                                setFieldValue(
                                    "daysOfWeek.saturday.until",
                                    item?.key
                                );
                            }}
                        />
                        <TrainerTimeTableComponent
                            labelChecbox="Dim"
                            fromKeySelected={values.daysOfWeek?.sunday.from}
                            untilKeySelected={values.daysOfWeek?.sunday.until}
                            valuesDropdown={workingHours}
                            theChangeOfFrom={(
                                event: React.FormEvent<HTMLDivElement>,
                                item?: IDropdownOption
                            ): void => {
                                setFieldValue(
                                    "daysOfWeek.sunday.from",
                                    item?.key
                                );
                            }}
                            theChangeOfUntil={(
                                event: React.FormEvent<HTMLDivElement>,
                                item?: IDropdownOption
                            ): void => {
                                setFieldValue(
                                    "daysOfWeek.sunday.until",
                                    item?.key
                                );
                            }}
                        />
                    </div>
                </>
            )}
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
                        setFieldValue("cv", event.target.files[0]);
                        setFieldTouched("cv", true);
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

const workingHours = [
    { key: "07:00", text: "07:00" },
    { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "08:00", text: "08:00" },
    { key: "divider_2", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "09:00", text: "09:00" },
    { key: "divider_3", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "10:00", text: "10:00" },
    { key: "divider_4", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "11:00", text: "11:00" },
    { key: "divider_5", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "12:00", text: "12:00" },
    { key: "divider_6", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "13:00", text: "13:00" },
    { key: "divider_7", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "14:00", text: "14:00" },
    { key: "divider_8", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "15:00", text: "15:00" },
    { key: "divider_9", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "16:00", text: "16:00" },
    { key: "divider_10", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "17:00", text: "17:00" },
    { key: "divider_11", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "18:00", text: "18:00" },
    { key: "divider_12", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "19:00", text: "19:00" },
    { key: "divider_13", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "20:00", text: "20:00" },
    { key: "divider_14", text: "-", itemType: DropdownMenuItemType.Divider },
];

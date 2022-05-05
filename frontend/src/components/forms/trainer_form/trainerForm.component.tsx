import {
    DefaultButton,
    Dropdown,
    IDropdownOption,
    Text,
    TextField,
} from "@fluentui/react";
import { useFormik } from "formik";
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
import UserService from "../../../services/user.service";
import { CustomDropDownComponent } from "../../custom_dropdown_component/custom_dropdown.component";

export interface ITrainerFormProps {
    default_props?: boolean;
    cancel?: () => void;
    onCreate: (data: NewUserDtoIn) => void;
    formToDisplay?: string;
    trainings: ITraining[];
}

interface tttt {
    key: string;
    text: string;
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
    const [selectedTraining, setSelectedTraining] =
        React.useState<IDropdownOption<string>>();

    const [selectedSkill, setSelectedSkill] = React.useState<IDropdownOption>();

    const onChangeSkills = (
        event: React.FormEvent<HTMLDivElement>,
        item?: IDropdownOption
    ): void => {
        setSelectedSkill(item);
    };

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
    }, [formToDisplay]);

    const onSubmit = (value: NewUserDto) => {
        console.log("the skills:", selectedSkill?.key);
        console.log({ value });
        if (formToDisplay === TEACHEAR_FORM) {
            // UserService.new_trainer(value)
            //     .then(async (response) => {
            //         if (response.status !== 200) {
            //             console.log({ response });
            //         }
            //         const data = (await response.json()) as NewUserDtoIn;
            //         console.log("the user just added:", data);
            //         onCreate(data);
            //     })
            //     .catch((err) => {
            //         console.log("error while adding new trainer:", err);
            //     });
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

    const { values, handleChange, handleSubmit } = useFormik<NewUserDto>({
        initialValues: {
            username: "",
            first_name: "",
            email: "",
            phone_number: "",
            adress: "",
            password: "",
            horaire: "",
            competence: selectedSkill ? selectedSkill?.key : undefined,
        },
        // validationSchema,
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
                <div className="own_trainer_pict">Img part</div>
                <div className="own_trainer_fields">
                    <div className="own_trainer_align_fields">
                        <CustomDropDownComponent
                            dropdownOptions={Civility}
                            thePlaceHolder="Civilité"
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
                        value={values.first_name}
                        onChange={handleChange}
                        placeholder="Fist name"
                        name="first_name"
                    />
                    <TextField
                        type="text"
                        value={values.username}
                        onChange={handleChange}
                        placeholder="last name"
                        name="username"
                    />
                    <TextField
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="email"
                        name="email"
                    />
                    <TextField
                        type="text"
                        value={values.phone_number}
                        onChange={handleChange}
                        placeholder="Phonenumber"
                        name="phone_number"
                    />
                </div>
            </div>
            <Text className="trainer_txt_divide_mov">Adress</Text>{" "}
            <hr className="trainer_hr_solid" />
            <div className="addr_trainer">
                <TextField
                    type="text"
                    value={values.adress}
                    onChange={handleChange}
                    placeholder="Adresse"
                    name="adress"
                />
            </div>
            <Text className="trainer_txt_divide_mov">Other</Text>{" "}
            <hr className="trainer_hr_solid" />
            <div className="oth_trainer">
                {formToDisplay === TEACHEAR_FORM && (
                    <>
                        {/* <TextField
                            type="text"
                            value={values.competence}
                            onChange={handleChange}
                            placeholder="Competence"
                            name="competence"
                        /> */}
                        {/* <CustomDropDownComponent
                            dropdownOptions={trainingAvailable}
                            thePlaceHolder="Competence"
                            isChange={dropDownChange}
                            keySelected={
                                selectedTraining ? selectedTraining : undefined
                            }
                        /> */}

                        <Dropdown
                            selectedKey={values.competence}
                            onChange={onChangeSkills}
                            placeholder="Competences"
                            options={trainingAvailable}
                        />
                        <TextField
                            type="text"
                            value={values.horaire}
                            onChange={handleChange}
                            placeholder="Horaire"
                            name="horaire"
                        />

                        <CustomDropDownComponent
                            dropdownOptions={Civility}
                            thePlaceHolder="ORGANISME(S) DE FORMATION(S)"
                        />
                    </>
                )}
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

import {
    DefaultButton,
    TextField,
    Text,
    DropdownMenuItemType,
} from "@fluentui/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { NewUserDto, NewUserDtoIn, NewUserDtoOut } from "../../../lib";
import UserService from "../../../services/user.service";
import { CustomDropDownComponent } from "../../custom_dropdown_component/custom_dropdown.component";

export interface ITraineeFormProps {
    default_props?: boolean;
    cancel: () => void;
    onCreate: (data: NewUserDtoIn) => void;
}

export const TraineeFormComponent: React.FC<ITraineeFormProps> = ({
    cancel,
    onCreate,
}) => {
    const onSubmit = (value: NewUserDto) => {
        UserService.new_trainee(value)
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log({ response });
                }
                const data = (await response.json()) as NewUserDtoIn;
                console.log("the current adding trainee:", data);
                onCreate(data);
            })
            .catch((err) => {
                console.log("error while adding new trainee:", err);
            });
    };

    const { values, handleChange, handleSubmit } = useFormik<NewUserDto>({
        initialValues: {
            username: "",
            first_name: "",
            email: "",
            phone_number: "",
            adress: "",
            password: "",
        },
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit} className="trainee_form_container">
            <Text className="trainee_txt_divide_mov">Stagiaire</Text>
            <hr className="trainee_hr_solid" />
            <div className="own_trainee_sect">
                <div className="own_trainee_pict">Img part</div>
                <div className="own_trainee_fields">
                    <div className="own_trainee_align_fields">
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
                    <TextField
                        type="text"
                        // value={values.competence}
                        // onChange={handleChange}
                        placeholder="Date de naissance"
                        name="competence"
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
            </div>
            <Text className="trainee_txt_divide_mov">Adress</Text>{" "}
            <hr className="trainee_hr_solid" />
            <div className="addr_trainee">
                <TextField
                    type="text"
                    value={values.adress}
                    onChange={handleChange}
                    placeholder="Adresse"
                    name="adress"
                />
            </div>
            <Text className="trainee_txt_divide_mov">Dossier Formation</Text>{" "}
            <hr className="trainee_hr_solid" />
            <div className="oth_trainee">
                <TextField
                    type="text"
                    // value={values.horaire}
                    // onChange={handleChange}
                    placeholder="EDOF"
                    name="horaire"
                />
                <CustomDropDownComponent
                    dropdownOptions={Training}
                    thePlaceHolder="Formtion(s)"
                />
                <TextField
                    type="text"
                    // value={values.horaire}
                    // onChange={handleChange}
                    placeholder="Durée de la formation"
                    name="horaire"
                />
                <TextField
                    type="text"
                    // value={values.horaire}
                    // onChange={handleChange}
                    placeholder="Date de début de session"
                    name="horaire"
                />
                <TextField
                    type="text"
                    // value={values.horaire}
                    // onChange={handleChange}
                    placeholder="Date de fin de session"
                    name="horaire"
                />

                <CustomDropDownComponent
                    dropdownOptions={TrainingFolder}
                    thePlaceHolder="Status de dossier"
                />
                <CustomDropDownComponent
                    dropdownOptions={OF}
                    thePlaceHolder="ORGANISME DE FORMATION"
                />
                <CustomDropDownComponent
                    dropdownOptions={OF}
                    thePlaceHolder="RESPONSABLE PEDAGOGIQUE"
                />
            </div>
            <div className="trainee_form_btns">
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

const OF = [
    { key: "OF1", text: "OF1" },
    { key: "OF2", text: "OF2" },
    // { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "OF3", text: "OF3" },
    { key: "OF4", text: "OF4" },
];
const TrainingFolder = [
    { key: "State1", text: "En Formation" },
    // { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "State2", text: "Terminé" },
    { key: "State3", text: "Annulé" },
    { key: "State4", text: "A débuté" },
    { key: "State5", text: "Reporté" },
    { key: "State6", text: "EXPIRÉ" },
];
const Training = [
    { key: "Training1", text: "Français" },
    // { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "Training2", text: "Anglais" },
    { key: "Training3", text: "Web" },
];
const Civility = [
    { key: "Male", text: "Mr" },
    // { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "Female", text: "Mme" },
];

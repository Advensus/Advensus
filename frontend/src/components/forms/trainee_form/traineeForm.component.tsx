import { DefaultButton, TextField, Text } from "@fluentui/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { NewUserDto, NewUserDtoIn, NewUserDtoOut } from "../../../lib";
import UserService from "../../../services/user.service";

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
                    <TextField
                        type="text"
                        // label="text"
                        // value={values.text}
                        // onChange={handleChange}
                        placeholder="Company name"
                        name="text"
                    />
                    <div className="own_trainee_align_fields">
                        <TextField
                            type="text"
                            // label="text"
                            // value={values.text}
                            // onChange={handleChange}
                            placeholder="Civilité"
                            name="text"
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
            <Text className="trainee_txt_divide_mov">Other</Text>{" "}
            <hr className="trainee_hr_solid" />
            <div className="oth_trainee">
                <TextField
                    type="text"
                    // value={values.competence}
                    // onChange={handleChange}
                    placeholder="Date de naissance"
                    name="competence"
                />
                <TextField
                    type="text"
                    // value={values.horaire}
                    // onChange={handleChange}
                    placeholder="EDOF"
                    name="horaire"
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

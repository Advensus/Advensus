import { DefaultButton, Text, TextField } from "@fluentui/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { NewUserDto, NewUserDtoIn } from "../../../lib";
import UserService from "../../../services/user.service";

export interface ITrainerFormProps {
    default_props?: boolean;
    cancel?: () => void;
}

export const TrainerFormComponent: React.FC<ITrainerFormProps> = ({
    cancel,
}) => {
    const onSubmit = (value: NewUserDto) => {
        console.log({ value });
        UserService.new_trainer(value)
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log({ response });
                }
                const data = (await response.json()) as NewUserDtoIn;
                console.log("the user just added:", data);
            })
            .catch((err) => {
                console.log("error while adding new trainer:", err);
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
            horaire: "",
            competence: "",
        },
        // validationSchema,
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit}>
            <div className="trainer_form_container">
                <Text className="trainer_txt_divide_mov">Formateur</Text>
                <hr className="trainer_hr_solid" />
                <div className="own_trainer_sect">
                    <div className="own_trainer_pict">Img part</div>
                    <div className="own_trainer_fields">
                        <div className="own_trainer_align_fields">
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
                    <TextField
                        type="text"
                        value={values.competence}
                        onChange={handleChange}
                        placeholder="Competence"
                        name="competence"
                    />
                    <TextField
                        type="text"
                        value={values.horaire}
                        onChange={handleChange}
                        placeholder="Horaire"
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
                <div className="trainer_form_btns">
                    <DefaultButton text="Annuler" onClick={cancel} />
                    <DefaultButton
                        style={{ marginLeft: "10px" }}
                        text="Sauvegarder"
                        type="submit"
                    />
                </div>
            </div>
        </form>
    );
};

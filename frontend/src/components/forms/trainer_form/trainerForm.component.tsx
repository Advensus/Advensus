import { DefaultButton, Text, TextField } from "@fluentui/react";
import React, { useState } from "react";

export interface ITrainerFormProps {
    default_props?: boolean;
    cancel?: () => void;
}

export const TrainerFormComponent: React.FC<ITrainerFormProps> = ({
    cancel,
}) => {
    return (
        <div className="trainer_form_container">
            <Text className="trainer_txt_divide_mov">Trainer</Text>
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
                        // label="text"
                        // value={values.text}
                        // onChange={handleChange}
                        placeholder="Fist name"
                        name="text"
                    />
                    <TextField
                        type="text"
                        // label="text"
                        // value={values.text}
                        // onChange={handleChange}
                        placeholder="last name"
                        name="text"
                    />
                    <TextField
                        type="text"
                        // label="text"
                        // value={values.text}
                        // onChange={handleChange}
                        placeholder="email"
                        name="text"
                    />
                    <TextField
                        type="text"
                        // label="text"
                        // value={values.text}
                        // onChange={handleChange}
                        placeholder="Phonenumber"
                        name="text"
                    />
                </div>
            </div>
            <Text className="trainer_txt_divide_mov">Adress</Text>{" "}
            <hr className="trainer_hr_solid" />
            <div className="addr_trainer">
                <TextField
                    type="text"
                    // label="text"
                    // value={values.text}
                    // onChange={handleChange}
                    placeholder="Adresse"
                    name="text"
                />
            </div>
            <Text className="trainer_txt_divide_mov">Other</Text>{" "}
            <hr className="trainer_hr_solid" />
            <div className="oth_trainer">
                <TextField type="text" placeholder="Competence" name="text" />
                <TextField type="text" placeholder="Horaire" name="text" />
                <TextField
                    type="password"
                    placeholder="Password"
                    name="password"
                />
            </div>
            <div className="trainer_form_btns">
                <DefaultButton text="Annuler" onClick={cancel} />
                <DefaultButton
                    style={{ marginLeft: "10px" }}
                    text="Sauvegarder"
                />
            </div>
        </div>
    );
};

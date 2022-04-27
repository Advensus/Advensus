import { DefaultButton, Text, TextField } from "@fluentui/react";
import React, { useState } from "react";

export interface ITrainingFormProps {
    default_props?: boolean;
    cancel?: () => void;
}

export const TrainingFormComponent: React.FC<ITrainingFormProps> = ({
    cancel,
}) => {
    return (
        <form className="training_form_container">
            <Text className="training_txt_divide_mov">Formation</Text>
            <hr className="trainer_hr_solid" />
            <div className="training_fields_sect">
                <TextField
                    type="text"
                    // value={values.email}
                    // onChange={handleChange}
                    placeholder="EDOF"
                    name="edof"
                    className="training_input"
                />
                <TextField
                    type="text"
                    // value={values.phone_number}
                    // onChange={handleChange}
                    placeholder="Intitulé"
                    name="intitule"
                    className="training_input"
                />
                <TextField
                    type="text"
                    // value={values.phone_number}
                    // onChange={handleChange}
                    placeholder="Durée"
                    name="duration"
                    className="training_input"
                />
                <TextField
                    type="text"
                    // value={values.phone_number}
                    // onChange={handleChange}
                    placeholder="Début session"
                    name="start_session"
                    className="training_input"
                />
                <TextField
                    type="text"
                    // value={values.phone_number}
                    // onChange={handleChange}
                    placeholder="Fin session"
                    name="end_session"
                    className="training_input"
                />
            </div>
            <div className="training_form_btns">
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

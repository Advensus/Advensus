import { DefaultButton, Text, TextField } from "@fluentui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ITraining, NewTrainingDtoIn, NewTrainingDtoOut } from "../../../lib";
import TrainingService from "../../../services/training.service";

export interface ITrainingFormProps {
    default_props?: boolean;
    cancel?: () => void;
    onCreated: (data: ITraining) => void;
    training?: ITraining;
}

export const TrainingFormComponent: React.FC<ITrainingFormProps> = ({
    cancel,
    onCreated,
    training,
}) => {
    useEffect(() => {
        console.log({ training });
    }, []);

    const onSubmit = (val: NewTrainingDtoIn) => {
        console.log({ val });
        TrainingService.new_training(val)
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log({ response });
                }
                const data = (await response.json()) as ITraining;
                console.log("the nes training", data);
                onCreated(data);
            })
            .catch((err) => {
                console.log("error while adding new training:", err);
            });
    };

    const { values, handleChange, handleSubmit } = useFormik<NewTrainingDtoIn>({
        initialValues: {
            edof: "",
            intitule: "",
            duration: "",
            start_session: "",
            end_session: "",
        },
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit} className="training_form_container">
            <Text className="training_txt_divide_mov">Formation</Text>
            <hr className="trainer_hr_solid" />
            <div className="training_fields_sect">
                {/* <TextField
                    type="text"
                    value={values.edof}
                    onChange={handleChange}
                    placeholder="EDOF"
                    name="edof"
                    className="training_input"
                /> */}
                <TextField
                    type="text"
                    value={values.intitule}
                    onChange={handleChange}
                    placeholder="Intitulé"
                    name="intitule"
                    className="training_input"
                />
                {/* <TextField
                    type="text"
                    value={values.duration}
                    onChange={handleChange}
                    placeholder="Durée"
                    name="duration"
                    className="training_input"
                /> */}
                {/* <TextField
                    type="text"
                    value={values.start_session}
                    onChange={handleChange}
                    placeholder="Début session"
                    name="start_session"
                    className="training_input"
                />
                <TextField
                    type="text"
                    value={values.end_session}
                    onChange={handleChange}
                    placeholder="Fin session"
                    name="end_session"
                    className="training_input"
                /> */}
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

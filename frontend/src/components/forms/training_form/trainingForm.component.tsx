import { DefaultButton, Text, TextField } from "@fluentui/react";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { ITraining, NewTrainingDtoIn } from "../../../lib";
import TrainingService from "../../../services/training.service";
import * as Yup from "yup";

export interface ITrainingFormProps {
    default_props?: boolean;
    cancel?: () => void;
    onCreated: (data: ITraining) => void;
    training?: ITraining;
}

const validationSchema = Yup.object().shape({
    intitule: Yup.string().required("Ce champ est requis!"),
});

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

    const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
        useFormik<NewTrainingDtoIn>({
            initialValues: {
                intitule: training ? training.intitule : "",
            },
            onSubmit,
            validationSchema,
        });

    return (
        <form onSubmit={handleSubmit} className="training_form_container">
            <Text className="training_txt_divide_mov">Formation</Text>
            <hr className="trainer_hr_solid" />
            <div className="training_fields_sect">
                <div>
                    <TextField
                        type="text"
                        value={values.intitule}
                        onChange={handleChange}
                        placeholder="Intitulé"
                        name="intitule"
                        className="training_input"
                        onBlur={handleBlur}
                    />
                    {touched.intitule && errors.intitule ? (
                        <Text className="errors_message">
                            {errors.intitule}
                        </Text>
                    ) : null}
                </div>
            </div>
            <div className="training_form_btns">
                <DefaultButton text="Annuler" onClick={cancel} />
                <DefaultButton
                    style={{ marginLeft: "10px" }}
                    text={training ? "Modifier" : "Sauvegarder"}
                    type="submit"
                />
            </div>
        </form>
    );
};

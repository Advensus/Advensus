import {
    DefaultButton,
    TextField,
    Text,
    Dropdown,
    IDropdownOption,
} from "@fluentui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ITraining } from "../../../lib";

export interface ITrainingProgramFormProps {
    default_props?: boolean;
    trainings?: ITraining[];
    cancel?: () => void;
}

export const TrainingProgramFormComponent: React.FC<
    ITrainingProgramFormProps
> = ({ trainings, cancel }) => {
    const [trainingAvailable, setTrainingAvailable] = useState<
        IDropdownOption[]
    >([]);

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
    }, []);

    const onSubmit = (val: any) => {
        console.log({ val });
    };

    const {
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
    } = useFormik<any>({
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
        },
        onSubmit,
    });

    return (
        <form className="certificate_form_container">
            <Text className="certif_form_txt_divide_mov">
                Ajouter un nouveau programme de formation
            </Text>
            <hr className="certif_form_hr_solid" />
            <div className="certif_form_fields_sect">
                <Dropdown
                    selectedKey={values.competence}
                    onChange={(
                        event: React.FormEvent<HTMLDivElement>,
                        item?: IDropdownOption
                    ): void => {
                        setFieldValue("competence", item?.key);
                        setFieldTouched("selected", true);
                    }}
                    placeholder="Certification Concerné"
                    options={trainingAvailable}
                />
                <TextField
                    type="text"
                    // value={values.intitule}
                    // onChange={handleChange}
                    placeholder="Intitulé"
                    name="intitule"
                    label="Intitulé"
                    className="certif_form_input"
                />
                <TextField
                    type="text"
                    // value={values.duration}
                    // onChange={handleChange}
                    placeholder="Description du programm"
                    label="Description"
                    name="duration"
                    className="certif_form_input"
                    multiline
                />
            </div>
            <div className="certif_form_form_btns">
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

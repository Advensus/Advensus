import {
    DefaultButton,
    TextField,
    Text,
    Dropdown,
    IDropdownOption,
} from "@fluentui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ICertificate } from "../../../lib";
import {
    NewTrainingProgramDtoIn,
    NewTrainingProgramDtoOut,
} from "../../../lib/dto/certificate.dto";
import TrainingService from "../../../services/training.service";

export interface ITrainingProgramFormProps {
    default_props?: boolean;
    certificates?: ICertificate[];
    cancel?: () => void;
}

export const TrainingProgramFormComponent: React.FC<
    ITrainingProgramFormProps
> = ({ certificates, cancel }) => {
    const [trainingAvailable, setTrainingAvailable] = useState<
        IDropdownOption[]
    >([]);

    useEffect(() => {
        if (certificates) {
            const dropTraining = certificates.map((_) => {
                let Civility = {
                    key: _.id,
                    text: _.intitule,
                };
                return Civility;
            });
            setTrainingAvailable(dropTraining);
        }
    }, []);

    const onSubmit = (val: NewTrainingProgramDtoIn) => {
        console.log({ val });
        TrainingService.new_training_program(val)
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log({ response });
                }
                const data =
                    (await response.json()) as NewTrainingProgramDtoOut;
                console.log("the new training program", data);
            })
            .catch((err) => {
                console.log("error while adding new training program:", err);
            });
    };

    const {
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
    } = useFormik<NewTrainingProgramDtoIn>({
        initialValues: {
            intitule: "",
            description: "",
            attribue: "",
        },
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit} className="certificate_form_container">
            <Text className="certif_form_txt_divide_mov">
                Ajouter un nouveau programme de formation
            </Text>
            <hr className="certif_form_hr_solid" />
            <div className="certif_form_fields_sect">
                <Dropdown
                    selectedKey={values.attribue}
                    onChange={(
                        event: React.FormEvent<HTMLDivElement>,
                        item?: IDropdownOption
                    ): void => {
                        setFieldValue("attribue", item?.key);
                        setFieldTouched("selected", true);
                    }}
                    placeholder="Certification Concerné"
                    options={trainingAvailable}
                />
                <TextField
                    type="text"
                    value={values.intitule}
                    onChange={handleChange}
                    placeholder="Intitulé"
                    name="intitule"
                    label="Intitulé"
                    className="certif_form_input"
                />
                <TextField
                    type="text"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Description du programm"
                    label="Description"
                    name="description"
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

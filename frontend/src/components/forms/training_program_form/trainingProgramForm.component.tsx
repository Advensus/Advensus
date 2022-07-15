import {
    DefaultButton,
    TextField,
    Text,
    Dropdown,
    IDropdownOption,
} from "@fluentui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ICertificate, ITraining } from "../../../lib";
import {
    NewTrainingProgramDtoIn,
    NewTrainingProgramDtoOut,
} from "../../../lib/dto/certificate.dto";
import TrainingService from "../../../services/training.service";

export interface ITrainingProgramFormProps {
    default_props?: boolean;
    certificates?: ICertificate[];
    trainings?: ITraining[];
    cancel?: () => void;
}

export const TrainingProgramFormComponent: React.FC<
    ITrainingProgramFormProps
> = ({ certificates, trainings, cancel }) => {
    const [trainingAvailable, setTrainingAvailable] = useState<
        IDropdownOption[]
    >([]);
    const [trainingIsCertificates, setTrainingIsCertificates] = useState<
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
            libelle: "",
            description: "",
            attribue: "",
            training: "",
        },
        onSubmit,
    });

    const getCertificateByTrainingId = (id: string) => {
        TrainingService.get_certificate_by_training_id(id)
            .then((response) => {
                if (response.status !== 200) {
                    return;
                }
                return response.json();
            })
            .then((respCertif: ICertificate[]) => {
                console.log("response getting certif by:", respCertif);
                const dropCertif = respCertif.map((_) => {
                    return { key: _.id, text: _.intitule };
                });
                setTrainingIsCertificates(dropCertif);
            })
            .catch((err) => {
                console.log("error while getting certif by training id:", err);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="certificate_form_container">
            <Text className="certif_form_txt_divide_mov">
                Ajouter un nouveau programme de formation
            </Text>
            <hr className="certif_form_hr_solid" />
            <div className="certif_form_fields_sect">
                <Dropdown
                    selectedKey={values.training}
                    onChange={(
                        event: React.FormEvent<HTMLDivElement>,
                        item?: IDropdownOption
                    ): void => {
                        setFieldValue("training", item?.key);
                        setFieldTouched("selected", true);
                        item && getCertificateByTrainingId(item.key as string);
                    }}
                    placeholder="Formation(s)"
                    label="Formation concernée"
                    options={trainingAvailable}
                />
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
                    options={trainingIsCertificates}
                    style={{ margin: "10px" }}
                />
                <TextField
                    type="text"
                    value={values.libelle}
                    onChange={handleChange}
                    placeholder="Intitulé"
                    name="libelle"
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

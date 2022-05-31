import {
    TextField,
    Text,
    DefaultButton,
    Dropdown,
    IDropdownOption,
} from "@fluentui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ITraining } from "../../../lib";
import {
    NewCertificateDtoIn,
    NewCertificateDtoOut,
} from "../../../lib/dto/certificate.dto";
import TrainingService from "../../../services/training.service";

export interface ICertificateFormProps {
    default_props?: boolean;
    trainings?: ITraining[];
    cancel?: () => void;
}

export const CertificateFormComponent: React.FC<ICertificateFormProps> = ({
    trainings,
    cancel,
}) => {
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

    const onSubmit = (val: NewCertificateDtoIn) => {
        console.log({ val });
        TrainingService.new_certificate(val)
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log({ response });
                }
                const data = (await response.json()) as NewCertificateDtoOut;
                console.log("the new certificate", data);
            })
            .catch((err) => {
                console.log("error while adding new certificate:", err);
            });
    };

    const {
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
    } = useFormik<NewCertificateDtoIn>({
        initialValues: {
            intitule: "",
            code: "",
            objectif: "",
            competence_atteste: "",
            modalite_evaluation: "",
            allouer: [],
        },
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit} className="certificate_form_container">
            <Text className="certif_form_txt_divide_mov">
                Ajouter une nouvelle Certification
            </Text>
            <hr className="certif_form_hr_solid" />
            <div className="certif_form_fields_sect">
                <Dropdown
                    selectedKeys={values.allouer}
                    onChange={(
                        event: React.FormEvent<HTMLDivElement>,
                        item?: IDropdownOption
                    ): void => {
                        console.log("item selected:", item?.key);
                        if (item) {
                            const selected = item.selected
                                ? [...values.allouer, item.key as string]
                                : values.allouer.filter(
                                      (key: any) => key !== item.key
                                  );
                            setFieldValue("allouer", selected);
                            setFieldTouched("selected", true);
                        }
                    }}
                    placeholder="Formation(s) Concernée'(s)"
                    multiSelect
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
                    value={values.code}
                    onChange={handleChange}
                    placeholder="Code"
                    name="code"
                    label="Code"
                    className="certif_form_input"
                />
                <TextField
                    type="text"
                    value={values.objectif}
                    onChange={handleChange}
                    placeholder="Objectifs"
                    multiline
                    name="objectif"
                    label="Objectifs"
                    className="certif_form_input"
                />
                <TextField
                    type="text"
                    value={values.competence_atteste}
                    onChange={handleChange}
                    placeholder="Compétences à tester"
                    name="competence_atteste"
                    label="Compétences à tester"
                    className="certif_form_input"
                />
                <TextField
                    type="text"
                    value={values.modalite_evaluation}
                    onChange={handleChange}
                    placeholder="Modadlité d'évaluation"
                    name="modalite_evaluation"
                    label="Modadlité d'évaluation"
                    className="certif_form_input"
                />
            </div>
            {/* Program part */}
            {values.allouer.length <= 1 && (
                <>
                    <Text className="certif_form_txt_divide_mov">
                        Programme de formation
                    </Text>
                    <hr className="certif_form_hr_solid" />
                    <div className="certif_form_program_fields">
                        <TextField
                            type="text"
                            // value={values.duration}
                            // onChange={handleChange}
                            placeholder="Intitulé du programm"
                            name="duration"
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
                        />
                    </div>
                </>
            )}
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

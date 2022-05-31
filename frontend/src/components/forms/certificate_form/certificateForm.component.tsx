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
import { NewCertificateDtoIn } from "../../../lib/dto/certificate.dto";

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

    const onSubmit = (val: any) => {
        console.log({ val });
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
            objectifs: "",
            competences_tester: "",
            modaliter_evaluation: "",
            formations: [],
        },
        onSubmit,
    });

    return (
        <form className="certificate_form_container">
            <Text className="certif_form_txt_divide_mov">
                Ajouter une nouvelle Certification
            </Text>
            <hr className="certif_form_hr_solid" />
            <div className="certif_form_fields_sect">
                <Dropdown
                    selectedKeys={values.formations}
                    onChange={(
                        event: React.FormEvent<HTMLDivElement>,
                        item?: IDropdownOption
                    ): void => {
                        console.log("item selected:", item?.key);
                        if (item) {
                            const selected = item.selected
                                ? [...values.formations, item.key as string]
                                : values.formations.filter(
                                      (key: any) => key !== item.key
                                  );
                            setFieldValue("formations", selected);
                            setFieldTouched("selected", true);
                        }
                    }}
                    placeholder="Formation(s) Concernée'(s)"
                    multiSelect
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
                    // value={values.intitule}
                    // onChange={handleChange}
                    placeholder="Code"
                    name="Code"
                    label="Code"
                    className="certif_form_input"
                />
                <TextField
                    type="text"
                    // value={values.intitule}
                    // onChange={handleChange}
                    placeholder="Objectifs"
                    multiline
                    name="Objectif"
                    label="Objectifs"
                    className="certif_form_input"
                />
                <TextField
                    type="text"
                    // value={values.intitule}
                    // onChange={handleChange}
                    placeholder="Compétences à tester"
                    name="comptences"
                    label="Compétences à tester"
                    className="certif_form_input"
                />
                <TextField
                    type="text"
                    // value={values.intitule}
                    // onChange={handleChange}
                    placeholder="Modadlité d'évaluation"
                    name="Objectif"
                    label="Modadlité d'évaluation"
                    className="certif_form_input"
                />
            </div>
            {/* Program part */}
            {values.formations.length <= 1 && (
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

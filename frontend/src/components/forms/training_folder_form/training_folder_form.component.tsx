import {
    TextField,
    Text,
    Dropdown,
    IDropdownOption,
    DatePicker,
    DefaultButton,
    defaultDatePickerStrings,
    DayOfWeek,
} from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import TrainingService from "../../../services/training.service";
import {
    ICertificate,
    ICompany,
    ISubscription,
    ITraining,
    IUser,
    NewTrainingFolderDto,
} from "../../../lib";
import TrainingFolderService from "../../../services/training-folder.service";
import * as Yup from "yup";

export interface ITrainingFolderFormProps {
    default_props?: boolean;
    trainee: IUser;
    onCreated: (data: ISubscription, user: IUser) => void;
}

const validationSchema = Yup.object().shape({
    edof: Yup.string().required("Ce champ est requis!"),
    training_status: Yup.string().required("Ce champ est requis!"),
    hour_worked: Yup.string().required("Ce champ est requis!"),
    duration: Yup.string().required("Ce champ est requis!"),
    start_session: Yup.string().required("Ce champ est requis!"),
    end_session: Yup.string().required("Ce champ est requis!"),
    formation: Yup.string().required("Ce champ est requis!"),
    stagiaire: Yup.string().required("Ce champ est requis!"),
    level_start: Yup.string().required("Ce champ est requis!"),
    level_end: Yup.string().required("Ce champ est requis!"),
    lieu_formation: Yup.string().required("Ce champ est requis!"),
    montant_formation: Yup.string().required("Ce champ est requis!"),
    solde: Yup.string().required("Ce champ est requis!"),
    certification: Yup.string().required("Ce champ est requis!"),
});

export const TrainingFolderFormComponent: React.FC<
    ITrainingFolderFormProps
> = ({ trainee, onCreated }) => {
    const [endDate, setEndDate] = useState<Date | null | undefined>();
    const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(
        DayOfWeek.Sunday
    );
    const [startDate, setStartDate] = useState<Date | null | undefined>();
    const [trainings, setTrainings] = useState<IDropdownOption[]>([]);
    const [certificates, setCertificates] = useState<IDropdownOption[]>([]);
    const [allTheTrainings, setAllTheTrainings] = useState<ITraining[]>([]);

    useEffect(() => {
        getAllTraining();
    }, []);

    const formattingDate = (fullDate: Date) => {
        return (
            fullDate.getFullYear() +
            "-" +
            (fullDate.getMonth() + 1) +
            "-" +
            fullDate.getDate()
        );
    };

    const onSubmit = (val: NewTrainingFolderDto) => {
        if (parseInt(val.duration) >= 4) {
            val.solde = `${parseInt(val.duration) + 1}`;
        } else {
            val.solde = val.duration;
        }

        val.training_status = "Accepté";
        val.stagiaire = trainee.id;
        val.end_session = !endDate ? " " : formattingDate(endDate);
        val.start_session = !startDate ? " " : formattingDate(startDate);
        console.log({ val });
        const currentTraining = allTheTrainings.find(
            (_) => _.id === val.formation
        );
        // Handle unique subscription/training-level
        if (trainee.souscrirs && val) {
            console.log("infos du dossier mm mm:", trainee.souscrirs);
            // On compare la formation choisis avec les dossier en cours qui contiennent ces formations
            if (
                trainee.souscrirs.find(
                    (_) =>
                        currentTraining &&
                        _.formation.intitule === currentTraining.intitule
                )
            ) {
                // On compare la certif choisis et les dossiers en cours qui contiennent ces certifs
                if (
                    trainee.souscrirs.find(
                        (_) =>
                            currentTraining &&
                            _.formation.certification.map(
                                (certif) => certif.id === val.certification
                            )
                    )
                ) {
                    // CE TYPE DE DOSSIER pourrais déjà existé on vérifie les niveaux maintenant
                    if (
                        trainee.souscrirs.find(
                            (_) => _.level_start === val.level_start
                        )
                    ) {
                        if (
                            trainee.souscrirs.find(
                                (_) => _.level_end === val.level_end
                            )
                        ) {
                            // exist training folder
                            console.log("CE TYPE DE DOSSIER EXISTE DEJA!");
                        } else {
                            if (
                                trainee.souscrirs.find(
                                    (_) => val.level_start === val.level_end
                                )
                            ) {
                                // impossible to add
                                console.log(
                                    "le level de départ doit être inférieur au level de fin!"
                                );
                            } else {
                                // do add new folder
                                doAddNewFolder(val);
                                console.log("AJOUT 3");
                            }
                        }
                    } else {
                        if (val.level_start === val.level_end) {
                            // impossible to add
                            console.log(
                                "le level de départ doit être inférieur au level de fin!"
                            );
                        } else {
                            // do add new folder
                            doAddNewFolder(val);
                            console.log("AJOUT 1");
                        }
                    }
                } else {
                    // Les dossiers sont différents on peut ajouter
                    if (
                        trainee.souscrirs.find(
                            (_) => _.level_start === val.level_start
                        )
                    ) {
                        if (
                            trainee.souscrirs.find(
                                (_) => _.level_end === val.level_end
                            )
                        ) {
                            // exist training folder
                            console.log("CE TYPE DE DOSSIER EXISTE DEJA!");
                        } else {
                            if (
                                trainee.souscrirs.find(
                                    (_) => val.level_start === val.level_end
                                )
                            ) {
                                // impossible to add
                                console.log(
                                    "le level de départ doit être inférieur au level de fin!"
                                );
                            } else {
                                // do add new folder
                                doAddNewFolder(val);
                                console.log("AJOUT 3");
                            }
                        }
                    } else {
                        if (val.level_start === val.level_end) {
                            // impossible to add
                            console.log(
                                "le level de départ doit être inférieur au level de fin!"
                            );
                        } else {
                            // do add new folder
                            doAddNewFolder(val);
                            console.log("AJOUT 1");
                        }
                    }
                }
            } else {
                // do add new folder directly
                doAddNewFolder(val);
                console.log("AJOUT 2");
            }
        }
    };

    const doAddNewFolder = (all_values: NewTrainingFolderDto) =>
        TrainingFolderService.new_training_folder(all_values)
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log({ response });
                }
                const data = (await response.json()) as ISubscription;
                onCreated(data, trainee);
            })
            .catch((err) => {
                console.log("error while adding new training folder:", err);
            });

    const {
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        handleBlur,
        errors,
        touched,
    } = useFormik<NewTrainingFolderDto>({
        initialValues: {
            edof: "",
            training_status: "Default_values",
            hour_worked: "0",
            duration: "",
            start_session: new Date(),
            end_session: new Date(),
            formation: "",
            stagiaire: "sdddd",
            level_start: "",
            level_end: "",
            lieu_formation: "",
            montant_formation: "",
            solde: "Default_values",
            certification: "",
        },
        onSubmit,
        validationSchema,
    });

    const getAllTraining = async () => {
        await TrainingService.get_all_trainings()
            .then(async (resp) => {
                if (resp.status !== 200) {
                    console.log({ resp });
                    return [];
                }
                return resp.json();
            })
            .then((trainingsResp: ITraining[]) => {
                console.log("the all trainings", trainingsResp);
                const dropTraining = trainingsResp.map((_) => {
                    return { key: _.id, text: _.intitule };
                });
                setTrainings(dropTraining);
                setAllTheTrainings(trainingsResp);
            })
            .catch((err) => {
                console.log("error while gettting all trainings:", err);
            });
    };

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
                setCertificates(dropCertif);
            })
            .catch((err) => {
                console.log("error while getting certif by training id:", err);
            });
    };

    console.log({ errors });

    return (
        <form
            onSubmit={handleSubmit}
            className="training_folder_form_container"
        >
            <hr className="training_folder_form_hr_solid" />
            <div className="training_folder_fields">
                <div>
                    <TextField
                        type="text"
                        value={values.edof}
                        onChange={handleChange}
                        placeholder="EDOF"
                        name="edof"
                        label="Edof"
                        onBlur={handleBlur}
                    />
                    {touched.edof && errors.edof ? (
                        <Text className="errors_message">{errors.edof}</Text>
                    ) : null}
                </div>
                <div>
                    <Dropdown
                        selectedKey={values.formation}
                        onChange={(
                            event: React.FormEvent<HTMLDivElement>,
                            item?: IDropdownOption
                        ): void => {
                            setFieldValue("formation", item?.key);
                            setFieldTouched("formation", true);
                            item &&
                                getCertificateByTrainingId(item.key as string);
                        }}
                        placeholder="Formtion(s)"
                        options={trainings}
                        label="Formation"
                        onBlur={handleBlur}
                    />
                    {touched.formation && errors.formation ? (
                        <Text className="errors_message">
                            {errors.formation}
                        </Text>
                    ) : null}
                </div>
                <div>
                    <Dropdown
                        selectedKey={values.certification}
                        onChange={(
                            event: React.FormEvent<HTMLDivElement>,
                            item?: IDropdownOption
                        ): void => {
                            setFieldValue("certification", item?.key);
                            setFieldTouched("certification", true);
                        }}
                        placeholder="Certification(s)"
                        options={certificates}
                        style={{ margin: "10px 10px" }}
                        onBlur={handleBlur}
                    />
                    {touched.certification && errors.certification ? (
                        <Text className="errors_message">
                            {errors.certification}
                        </Text>
                    ) : null}
                </div>
                <div>
                    <Dropdown
                        selectedKey={values.level_start}
                        onChange={(
                            event: React.FormEvent<HTMLDivElement>,
                            item?: IDropdownOption
                        ): void => {
                            setFieldValue("level_start", item?.key);
                            setFieldTouched("level_start", true);
                        }}
                        placeholder="Niveau actuel du stagiaire"
                        options={CurrentTraineeState}
                        label="Niveau du stagaire"
                        onBlur={handleBlur}
                    />
                    {touched.level_start && errors.level_start ? (
                        <Text className="errors_message">
                            {errors.level_start}
                        </Text>
                    ) : null}
                </div>
                <div>
                    <Dropdown
                        selectedKey={values.level_end}
                        onChange={(
                            event: React.FormEvent<HTMLDivElement>,
                            item?: IDropdownOption
                        ): void => {
                            setFieldValue("level_end", item?.key);
                            setFieldTouched("level_end", true);
                        }}
                        placeholder="Niveau visé par le stagiaire"
                        options={CurrentTraineeState}
                        label="Niveau visé par le stagiaire"
                        onBlur={handleBlur}
                    />
                    {touched.level_end && errors.level_end ? (
                        <Text className="errors_message">
                            {errors.level_end}
                        </Text>
                    ) : null}
                </div>
                {/* <TextField
                    type="text"
                    value={values.hour_worked}
                    onChange={handleChange}
                    placeholder="Heure(s) réalisé(s)"
                    name="hour_worked"
                    label="Heure(s) réalisée(s)"
                /> */}
                <div>
                    <TextField
                        type="text"
                        value={values.duration}
                        onChange={handleChange}
                        placeholder="Durée de la formation"
                        name="duration"
                        label="Durée de la formation"
                        onBlur={handleBlur}
                    />
                    {touched.duration && errors.duration ? (
                        <Text className="errors_message">
                            {errors.duration}
                        </Text>
                    ) : null}
                </div>

                <div>
                    <Dropdown
                        selectedKey={values.lieu_formation}
                        onChange={(
                            event: React.FormEvent<HTMLDivElement>,
                            item?: IDropdownOption
                        ): void => {
                            setFieldValue("lieu_formation", item?.key);
                            setFieldTouched("lieu_formation", true);
                        }}
                        label="Lieu"
                        placeholder="Lieu de la formation"
                        options={LocationTraining}
                        onBlur={handleBlur}
                    />
                    {touched.lieu_formation && errors.lieu_formation ? (
                        <Text className="errors_message">
                            {errors.lieu_formation}
                        </Text>
                    ) : null}
                </div>

                <div>
                    <TextField
                        type="text"
                        value={values.montant_formation}
                        onChange={handleChange}
                        placeholder="Montant de la formation"
                        name="montant_formation"
                        label="Montant de la formation"
                        onBlur={handleBlur}
                    />
                    {touched.montant_formation && errors.montant_formation ? (
                        <Text className="errors_message">
                            {errors.montant_formation}
                        </Text>
                    ) : null}
                </div>
                <div>
                    <DatePicker
                        firstDayOfWeek={firstDayOfWeek}
                        placeholder="Date de début de session"
                        ariaLabel="Select a date"
                        // DatePicker uses English strings by default. For localized apps, you must override this prop.
                        strings={defaultDatePickerStrings}
                        onSelectDate={(s) => setStartDate(s)}
                        value={startDate ? startDate : undefined}
                        label="Date de début de session"
                        onBlur={handleBlur}
                    />
                    {touched.start_session && errors.start_session ? (
                        <Text className="errors_message">
                            {errors.start_session}
                        </Text>
                    ) : null}
                </div>
                <div>
                    <DatePicker
                        firstDayOfWeek={firstDayOfWeek}
                        placeholder="Date de fin de session"
                        ariaLabel="Select a date"
                        // DatePicker uses English strings by default. For localized apps, you must override this prop.
                        strings={defaultDatePickerStrings}
                        // onChange={handleChange}
                        onSelectDate={(d) => setEndDate(d)}
                        value={endDate ? endDate : undefined}
                        label="Date de fin de session"
                        onBlur={handleBlur}
                    />
                    {touched.end_session && errors.end_session ? (
                        <Text className="errors_message">
                            {errors.end_session}
                        </Text>
                    ) : null}
                </div>
                {/* <Dropdown
                    selectedKey={values.training_status}
                    onChange={(
                        event: React.FormEvent<HTMLDivElement>,
                        item?: IDropdownOption
                    ): void => {
                        setFieldValue("training_status", item?.key);
                    }}
                    placeholder="Status du dossier"
                    options={FolderState}
                    label="Status du dossier"
                /> */}
            </div>
            <div className="trainee_form_btns">
                {/* <DefaultButton text="Annuler" onClick={cancel} /> */}
                <DefaultButton
                    style={{ marginLeft: "10px" }}
                    text="Sauvegarder"
                    type="submit"
                />
            </div>
        </form>
    );
};
const OF = [
    { key: "OF1", text: "OF1" },
    { key: "OF2", text: "OF2" },
    { key: "OF3", text: "OF3" },
    { key: "OF4", text: "OF4" },
];
const FolderState = [
    { key: "State1", text: "En Formation" },
    { key: "State2", text: "Terminé" },
    { key: "State3", text: "Annulé" },
    { key: "State4", text: "A débuté" },
    { key: "State5", text: "Reporté" },
    { key: "State6", text: "EXPIRÉ" },
    { key: "State7", text: "Accepté" },
];
const LocationTraining = [
    { key: "Sur site", text: "Sur site" },
    { key: "Distentiel", text: "Distentiel" },
    { key: "E-Learning", text: "E-Larning" },
];
const CurrentTraineeState = [
    { key: "Débutant", text: "Débutant" },
    { key: "Intermédiaire", text: "Intermédiaire" },
    { key: "Avancé", text: "Avancé" },
];

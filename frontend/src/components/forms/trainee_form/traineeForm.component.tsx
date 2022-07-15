import {
    DefaultButton,
    TextField,
    Text,
    DatePicker,
    defaultDatePickerStrings,
    DayOfWeek,
    mergeStyles,
    IDropdownOption,
    Dropdown,
    IDatePicker,
} from "@fluentui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
    ICertificate,
    ISubscription,
    ITraining,
    IUser,
    NewDocDtoIn,
    RP,
    SUPER_RP,
    UserDtoIn,
} from "../../../lib";
import { NewTraineeDto } from "../../../lib/dto/trainee.dto";
import { ICompany } from "../../../lib/interfaces/Company";
import CompanyService from "../../../services/company.service";
import DocumentsService from "../../../services/documents.service";
import TrainingFolderService from "../../../services/training-folder.service";
import TrainingService from "../../../services/training.service";
import UserService from "../../../services/user.service";
import * as Yup from "yup";

export interface ITraineeFormProps {
    default_props?: boolean;
    cancel: () => void;
    onCreate: (data: IUser) => void;
    trainee?: IUser;
}

const validationSchema = Yup.object().shape({
    username: Yup.string().required("Ce champ est requis!"),
    first_name: Yup.string().required("Ce champ est requis!"),
    email: Yup.string()
        .email("Format email invalide!")
        .required("Ce champ est requis!"),
    phone_number: Yup.string().required("Ce champ est requis!"),
    adress: Yup.string().required("Ce champ est requis!"),
    password: Yup.string().required("Ce champ est requis!"),
    organisme_formation: Yup.string().required("Ce champ est requis!"),
    Rp_Stagiaire: Yup.string().required("Ce champ est requis!"),
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
    doc_categorie: Yup.string().required("Ce champ est requis!"),
    appartenir: Yup.string().required("Ce champ est requis!"),
});

const rootClass = mergeStyles({
    maxWidth: 300,
    selectors: { "> *": { marginBottom: 15 } },
});

export const TraineeFormComponent: React.FC<ITraineeFormProps> = ({
    cancel,
    onCreate,
    trainee,
}) => {
    const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(
        DayOfWeek.Sunday
    );
    const [organizations, setOrganizations] = useState<IDropdownOption[]>([]);
    const [trainings, setTrainings] = useState<IDropdownOption[]>([]);
    const [certificates, setCertificates] = useState<IDropdownOption[]>([]);
    const [selectedTraining, setSelectedTraining] =
        React.useState<IDropdownOption>();
    const [rps, setRps] = useState<IDropdownOption[]>([]);
    const [endDate, setEndDate] = useState<Date | null | undefined>();
    const [startDate, setStartDate] = useState<Date | null | undefined>();

    const [value, setValue] = React.useState<Date | null | undefined>();
    const datePickerRef = React.useRef<IDatePicker>(null);

    useEffect(() => {
        getOrganization();
        getAllTraining();
        getAllUser();
        console.log({ trainee });
    }, []);

    const onChangeTraining = (
        event: React.FormEvent<HTMLDivElement>,
        item?: IDropdownOption
    ): void => {
        setSelectedTraining(item);
        console.log({ item });
        item && getCertificateByTrainingId(item.key as string);
    };

    const getOrganization = async () => {
        await CompanyService.get_all_organization()
            .then(async (response) => {
                if (response.status !== 200) {
                    //@TODO #4
                    // alert('error getting users');
                    console.log("the error resp", response);
                    return [];
                }
                return response.json();
            })
            .then((respOrganisations: ICompany[]) => {
                console.log("the Organisations datas:", respOrganisations);
                const orgs = respOrganisations.map((_) => {
                    return { key: _.id, text: _.company_name };
                });
                setOrganizations(orgs);
            })
            .catch((err) => {
                console.log("error while getting tainings organisations");
            });
    };

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

    const getAllUser = async () => {
        await UserService.get_all_users()
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log(
                        "Error resp while gettind all users:",
                        response
                    );
                    return [];
                }
                const datas = (await response.json()) as UserDtoIn;
                console.log("the users:", datas.user);

                const rp = datas.user.filter(
                    (_) => _.user_type === RP || _.user_type === SUPER_RP
                );
                const theRps = rp.map((_) => {
                    return { key: _.id, text: _.username };
                });
                // const srp = datas.user.filter((_) => _.user_type === SUPER_RP);
                console.log({ theRps });

                setRps(theRps);
                return datas;
            })
            .catch((err) => {
                console.log("error while getting users:", err);
            });
    };

    const onSubmit = (value: NewTraineeDto) => {
        // value.formation = selectedTraining?.key;
        // value.end_session = endDate;
        value.end_session = !endDate
            ? " "
            : endDate.getFullYear() +
              "-" +
              (endDate.getMonth() + 1) +
              "-" +
              endDate.getDate();
        // value.start_session = startDate;
        value.start_session = !startDate
            ? " "
            : startDate.getFullYear() +
              "-" +
              (startDate.getMonth() + 1) +
              "-" +
              startDate.getDate();

        console.log({ value });
        UserService.new_trainee(value)
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log({ response });
                }
                const data = (await response.json()) as IUser;
                console.log("the current adding trainee:", data);
                console.log("tranee id:", data.id);
                if (data) {
                    // For Training folder
                    value.stagiaire = data.id;
                    newTrainingFolder(value);

                    // For Doc
                    value.doc_categorie = "Admin_doc";
                    value.appartenir = data.id;
                    generateNewDocument(value);
                }
                onCreate(data);
            })
            .catch((err) => {
                console.log("error while adding new trainee:", err);
            });
    };

    const newTrainingFolder = (val: NewTraineeDto) => {
        if (parseInt(val.duration) >= 4) {
            val.solde = `${parseInt(val.duration) + 1}`;
        } else {
            val.solde = val.duration;
        }
        val.training_status = "Accepté";
        console.log({ val });
        TrainingFolderService.new_training_folder(val)
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log({ response });
                }
                const data = (await response.json()) as ISubscription;
                console.log("the current adding training folder:", data);
                // onCreate(data);
            })
            .catch((err) => {
                console.log("error while adding new training folder:", err);
            });
    };

    const generateNewDocument = (val: NewTraineeDto) => {
        console.log({ val });
        DocumentsService.generate_new_adm_document(val)
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log({ response });
                }
                const data = (await response.json()) as NewDocDtoIn;
                console.log("the current generated doc:", data);
                // onCreate(data);
            })
            .catch((err) => {
                console.log("error while generate new doc:", err);
            });
    };

    const {
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        handleBlur,
        errors,
        touched,
    } = useFormik<NewTraineeDto>({
        initialValues: {
            username: "",
            first_name: "",
            email: "",
            phone_number: "",
            adress: "",
            password: "",
            organisme_formation: "",
            Rp_Stagiaire: "",
            edof: "",
            training_status: "Default_values",
            hour_worked: "0",
            duration: "",
            start_session: new Date(),
            end_session: new Date(),
            formation: "",
            stagiaire: "Default_values",
            level_start: "",
            level_end: "",
            lieu_formation: "",
            montant_formation: "",
            solde: "Default_values",
            certification: "",
            doc_categorie: "Default_values",
            appartenir: "Default_values",
        },
        onSubmit,
        validationSchema,
    });

    console.log({ errors });

    return (
        <form onSubmit={handleSubmit} className="trainee_form_container">
            <Text className="trainee_txt_divide_mov">Stagiaire</Text>
            <hr className="trainee_hr_solid" />
            <div className="own_trainee_sect">
                <div className="own_trainee_pict">
                    {/* User picture */}
                    <TextField
                        label="Photo de profile"
                        type="file"
                        // name="company_stamp"
                        // onChange={(event: any) => {
                        //     setFieldValue(
                        //         "company_stamp",
                        //         event.target.files[0]
                        //     );
                        //     setFieldTouched("company_stamp", true);
                        // }}
                    />
                </div>
                <div className="own_trainee_fields">
                    <div>
                        <TextField
                            type="text"
                            value={values.first_name}
                            onChange={handleChange}
                            placeholder="Fist name"
                            name="first_name"
                            onBlur={handleBlur}
                        />
                        {touched.first_name && errors.first_name ? (
                            <Text className="errors_message">
                                {errors.first_name}
                            </Text>
                        ) : null}
                    </div>
                    <div>
                        <TextField
                            type="text"
                            value={values.username}
                            onChange={handleChange}
                            placeholder="last name"
                            name="username"
                            onBlur={handleBlur}
                        />
                        {touched.username && errors.username ? (
                            <Text className="errors_message">
                                {errors.username}
                            </Text>
                        ) : null}
                    </div>
                    <div>
                        <TextField
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="email"
                            name="email"
                            onBlur={handleBlur}
                        />
                        {touched.email && errors.email ? (
                            <Text className="errors_message">
                                {errors.email}
                            </Text>
                        ) : null}
                    </div>
                    <div>
                        <TextField
                            type="text"
                            value={values.phone_number}
                            onChange={handleChange}
                            placeholder="Phonenumber"
                            name="phone_number"
                            onBlur={handleBlur}
                        />
                        {touched.phone_number && errors.phone_number ? (
                            <Text className="errors_message">
                                {errors.phone_number}
                            </Text>
                        ) : null}
                    </div>
                    <div>
                        <TextField
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="Password"
                            name="password"
                            canRevealPassword
                            revealPasswordAriaLabel="Show password"
                            onBlur={handleBlur}
                        />
                        {touched.password && errors.password ? (
                            <Text className="errors_message">
                                {errors.password}
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
                            }}
                            placeholder="Niveau actuel du stagiaire"
                            options={CurrentTraineeState}
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
                            }}
                            placeholder="Niveau visé par le stagiaire"
                            options={CurrentTraineeState}
                            onBlur={handleBlur}
                        />
                        {touched.level_end && errors.level_end ? (
                            <Text className="errors_message">
                                {errors.level_end}
                            </Text>
                        ) : null}
                    </div>
                    <div>
                        <Dropdown
                            selectedKey={values.organisme_formation}
                            onChange={(
                                event: React.FormEvent<HTMLDivElement>,
                                item?: IDropdownOption
                            ): void => {
                                setFieldValue("organisme_formation", item?.key);
                            }}
                            placeholder="ORGANISME DE FORMATION(S)"
                            options={organizations}
                            onBlur={handleBlur}
                        />
                        {touched.organisme_formation &&
                        errors.organisme_formation ? (
                            <Text className="errors_message">
                                {errors.organisme_formation}
                            </Text>
                        ) : null}
                    </div>
                    <div>
                        <Dropdown
                            selectedKey={values.Rp_Stagiaire}
                            onChange={(
                                event: React.FormEvent<HTMLDivElement>,
                                item?: IDropdownOption
                            ): void => {
                                setFieldValue("Rp_Stagiaire", item?.key);
                            }}
                            placeholder="RESPONSABLE PEDAGOGIQUE"
                            options={rps}
                            onBlur={handleBlur}
                        />
                        {touched.Rp_Stagiaire && errors.Rp_Stagiaire ? (
                            <Text className="errors_message">
                                {errors.Rp_Stagiaire}
                            </Text>
                        ) : null}
                    </div>
                </div>
            </div>
            <Text className="trainee_txt_divide_mov">Adress</Text>{" "}
            <hr className="trainee_hr_solid" />
            <div className="addr_trainee">
                <TextField
                    type="text"
                    value={values.adress}
                    onChange={handleChange}
                    placeholder="Adresse"
                    name="adress"
                    onBlur={handleBlur}
                />
                {touched.adress && errors.adress ? (
                    <Text className="errors_message">{errors.adress}</Text>
                ) : null}
            </div>
            <Text className="trainee_txt_divide_mov">Dossier Formation</Text>{" "}
            <hr className="trainee_hr_solid" />
            <div className="oth_trainee">
                <div>
                    <TextField
                        type="text"
                        value={values.edof}
                        onChange={handleChange}
                        placeholder="EDOF"
                        name="edof"
                        label="Numéro Edof"
                        onBlur={handleBlur}
                    />
                    {touched.edof && errors.edof ? (
                        <Text className="errors_message">{errors.edof}</Text>
                    ) : null}
                </div>
                <div>
                    <Dropdown
                        selectedKey={values.formation}
                        // eslint-disable-next-line react/jsx-no-bind
                        // onChange={onChangeTraining}
                        onChange={(
                            event: React.FormEvent<HTMLDivElement>,
                            item?: IDropdownOption
                        ): void => {
                            setFieldValue("formation", item?.key);
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
                <Dropdown
                    // selectedKey={selectedRp ? selectedRp.key : undefined}
                    // eslint-disable-next-line react/jsx-no-bind
                    // onChange={onChangeRp}
                    placeholder="SOURCE"
                    options={OF}
                    label="Provenence du stagiaire"
                />
            </div>
            <div className="trainee_form_btns">
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

const OF = [
    { key: "OF1", text: "OF1" },
    { key: "OF2", text: "OF2" },
    // { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "OF3", text: "OF3" },
    { key: "OF4", text: "OF4" },
];
const FolderState = [
    { key: "State1", text: "En Formation" },
    // { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "State2", text: "Terminé" },
    { key: "State3", text: "Annulé" },
    { key: "State4", text: "A débuté" },
    { key: "State5", text: "Reporté" },
    { key: "State6", text: "EXPIRÉ" },
    { key: "State7", text: "Accepté" },
];
const CurrentTraineeState = [
    { key: "Débutant", text: "Débutant" },
    { key: "Intermédiaire", text: "Intermédiaire" },
    { key: "Avancé", text: "Avancé" },
];
const LocationTraining = [
    { key: "Sur site", text: "Sur site" },
    { key: "Distentiel", text: "Distentiel" },
    { key: "E-Learning", text: "E-Larning" },
];

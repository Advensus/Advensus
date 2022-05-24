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
    IDropdownStyles,
    IDatePicker,
} from "@fluentui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
    ITraining,
    IUser,
    NewUserDto,
    NewUserDtoIn,
    NewUserDtoOut,
    RP,
    SUPER_RP,
    UserDtoIn,
} from "../../../lib";
import { NewTraineeDto } from "../../../lib/dto/trainee";
import { ICompany } from "../../../lib/interfaces/Company";
import CompanyService from "../../../services/company.service";
import TrainingFolderService from "../../../services/training-folder.service";
import TrainingService from "../../../services/training.service";
import UserService from "../../../services/user.service";
import { CustomDropDownComponent } from "../../custom_dropdown_component/custom_dropdown.component";

export interface ITraineeFormProps {
    default_props?: boolean;
    cancel: () => void;
    onCreate: (data: NewUserDtoIn) => void;
}

const rootClass = mergeStyles({
    maxWidth: 300,
    selectors: { "> *": { marginBottom: 15 } },
});

const onFormatDate = (date?: Date): string => {
    return !date
        ? ""
        : date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              (date.getFullYear() % 100);
};

export const TraineeFormComponent: React.FC<ITraineeFormProps> = ({
    cancel,
    onCreate,
}) => {
    const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(
        DayOfWeek.Sunday
    );
    const [organizations, setOrganizations] = useState<IDropdownOption[]>([]);
    const [selectedOrg, setSelectedOrg] = React.useState<IDropdownOption>();
    const [trainings, setTrainings] = useState<IDropdownOption[]>([]);
    const [selectedTraining, setSelectedTraining] =
        React.useState<IDropdownOption>();
    const [rps, setRps] = useState<IDropdownOption[]>([]);
    const [selectedRp, setSelectedRp] = React.useState<IDropdownOption>();
    const [selectedFolderState, setSelectedFolderState] =
        useState<IDropdownOption>();

    const [endDate, setEndDate] = useState<Date | null | undefined>();
    const [startDate, setStartDate] = useState<Date | null | undefined>();

    const [value, setValue] = React.useState<Date | null | undefined>();
    const datePickerRef = React.useRef<IDatePicker>(null);

    useEffect(() => {
        getOrganization();
        getAllTraining();
        getAllUser();
    }, []);

    const onChangeTraining = (
        event: React.FormEvent<HTMLDivElement>,
        item?: IDropdownOption
    ): void => {
        setSelectedTraining(item);
    };
    const onChangeOrg = (
        event: React.FormEvent<HTMLDivElement>,
        item?: IDropdownOption
    ): void => {
        setSelectedOrg(item);
    };
    const onChangeRp = (
        event: React.FormEvent<HTMLDivElement>,
        item?: IDropdownOption
    ): void => {
        setSelectedRp(item);
    };

    const onChangeFolderState = (
        event: React.FormEvent<HTMLDivElement>,
        item?: IDropdownOption
    ): void => {
        setSelectedFolderState(item);
    };

    const onParseDateFromString = React.useCallback(
        (newValue: string): Date => {
            const previousValue = endDate || new Date();
            const newValueParts = (newValue || "").trim().split("/");
            const day =
                newValueParts.length > 0
                    ? Math.max(1, Math.min(31, parseInt(newValueParts[0], 10)))
                    : previousValue.getDate();
            const month =
                newValueParts.length > 1
                    ? Math.max(
                          1,
                          Math.min(12, parseInt(newValueParts[1], 10))
                      ) - 1
                    : previousValue.getMonth();
            let year =
                newValueParts.length > 2
                    ? parseInt(newValueParts[2], 10)
                    : previousValue.getFullYear();
            if (year < 100) {
                year +=
                    previousValue.getFullYear() -
                    (previousValue.getFullYear() % 100);
            }
            return new Date(year, month, day);
        },
        [endDate]
    );

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
        value.formation = selectedTraining?.key;
        value.training_status = selectedFolderState?.key;
        value.organisme_formation = selectedOrg?.key;
        value.Rp_Stagiaire = selectedRp?.key;
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
                    value.stagiaire = data.id;
                    newTrainingFolder(value);
                }
                // onCreate(data);
            })
            .catch((err) => {
                console.log("error while adding new trainee:", err);
            });
    };

    const newTrainingFolder = (val: NewTraineeDto) => {
        console.log({ val });
        TrainingFolderService.new_training_folder(val)
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log({ response });
                }
                const data = (await response.json()) as NewUserDtoIn;
                console.log("the current adding training folder:", data);
                onCreate(data);
            })
            .catch((err) => {
                console.log("error while adding new training folder:", err);
            });
    };

    const { values, handleChange, handleSubmit } = useFormik<NewTraineeDto>({
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
            training_status: "",
            hour_worked: "",
            duration: "",
            start_session: new Date(),
            end_session: new Date(),
            formation: "",
            stagiaire: "",
        },
        onSubmit,
    });

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
                    <TextField
                        type="text"
                        value={values.first_name}
                        onChange={handleChange}
                        placeholder="Fist name"
                        name="first_name"
                    />
                    <TextField
                        type="text"
                        value={values.username}
                        onChange={handleChange}
                        placeholder="last name"
                        name="username"
                    />
                    <TextField
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="email"
                        name="email"
                    />
                    <TextField
                        type="text"
                        value={values.phone_number}
                        onChange={handleChange}
                        placeholder="Phonenumber"
                        name="phone_number"
                    />
                    <TextField
                        type="text"
                        // value={values.competence}
                        // onChange={handleChange}
                        placeholder="Date de naissance"
                        name="competence"
                    />
                    <TextField
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        placeholder="Password"
                        name="password"
                        canRevealPassword
                        revealPasswordAriaLabel="Show password"
                    />
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
                />
            </div>
            <Text className="trainee_txt_divide_mov">Dossier Formation</Text>{" "}
            <hr className="trainee_hr_solid" />
            <div className="oth_trainee">
                <TextField
                    type="text"
                    value={values.edof}
                    onChange={handleChange}
                    placeholder="EDOF"
                    name="edof"
                />
                <Dropdown
                    selectedKey={
                        selectedTraining ? selectedTraining.key : undefined
                    }
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={onChangeTraining}
                    placeholder="Formtion(s)"
                    options={trainings}
                />

                <TextField
                    type="text"
                    value={values.hour_worked}
                    onChange={handleChange}
                    placeholder="Heure(s) réalisé(s)"
                    name="hour_worked"
                />
                <TextField
                    type="text"
                    value={values.duration}
                    onChange={handleChange}
                    placeholder="Durée de la formation"
                    name="duration"
                />
                <TextField
                    type="text"
                    // value={values.horaire}
                    // onChange={handleChange}
                    placeholder="Montant de la formation"
                    // name="horaire"
                />
                <DatePicker
                    firstDayOfWeek={firstDayOfWeek}
                    placeholder="Date de début de session"
                    ariaLabel="Select a date"
                    // DatePicker uses English strings by default. For localized apps, you must override this prop.
                    strings={defaultDatePickerStrings}
                    onSelectDate={(s) => setStartDate(s)}
                    value={startDate ? startDate : undefined}
                />
                <DatePicker
                    firstDayOfWeek={firstDayOfWeek}
                    placeholder="Date de fin de session"
                    ariaLabel="Select a date"
                    // DatePicker uses English strings by default. For localized apps, you must override this prop.
                    strings={defaultDatePickerStrings}
                    // onChange={handleChange}
                    onSelectDate={(d) => setEndDate(d)}
                    value={endDate ? endDate : undefined}
                />

                {/* <DatePicker
                    componentRef={datePickerRef}
                    label="Start date"
                    allowTextInput
                    ariaLabel="Select a date. Input format is day slash month slash year."
                    value={endDate ? endDate : undefined}
                    onSelectDate={setEndDate as (date?: Date | null) => void}
                    formatDate={onFormatDate}
                    parseDateFromString={onParseDateFromString}
                    // className={styles.control}
                    // DatePicker uses English strings by default. For localized apps, you must override this prop.
                    strings={defaultDatePickerStrings}
                /> */}

                <Dropdown
                    selectedKey={
                        selectedFolderState
                            ? selectedFolderState.key
                            : undefined
                    }
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={onChangeFolderState}
                    placeholder="Status du dossier"
                    options={FolderState}
                />
                <Dropdown
                    selectedKey={selectedOrg ? selectedOrg.key : undefined}
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={onChangeOrg}
                    placeholder="ORGANISME DE FORMATION(S)"
                    options={organizations}
                />
                <Dropdown
                    selectedKey={selectedRp ? selectedRp.key : undefined}
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={onChangeRp}
                    placeholder="RESPONSABLE PEDAGOGIQUE"
                    options={rps}
                />
                <CustomDropDownComponent
                    dropdownOptions={OF}
                    thePlaceHolder="SOURCE"
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
];
const Training = [
    { key: "Training1", text: "Français" },
    // { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "Training2", text: "Anglais" },
    { key: "Training3", text: "Web" },
];
const Civility = [
    { key: "Male", text: "Mr" },
    // { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "Female", text: "Mme" },
];

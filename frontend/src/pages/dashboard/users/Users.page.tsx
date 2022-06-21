import {
    Dropdown,
    DropdownMenuItemType,
    IconButton,
    IDropdownOption,
    IDropdownStyles,
    IIconProps,
    SearchBox,
    Text,
    TooltipHost,
} from "@fluentui/react";
import React, { useEffect, useState } from "react";
import {
    CompanyFormComponent,
    FullInformationsTabComponent,
    TraineeDisplayComponent,
    TraineeFormComponent,
    TrainerFormComponent,
    TrainingCardComponent,
    TrainingFormComponent,
    TrainingOrganizationCardComponent,
    TrainingOrganizationFormComponent,
    UsersDisplayComponent,
} from "../../../components";
import { useId } from "@fluentui/react-hooks";
import UserService from "../../../services/user.service";
import {
    ADMIN_OF,
    BASIC_RP_FORM,
    ITraining,
    IUser,
    NewUserDto,
    NewUserDtoIn,
    PATH_LABEL_COMPANY,
    PATH_LABEL_CUSTOMER,
    PATH_LABEL_ORGANIZATION,
    PATH_LABEL_RESOURCES,
    PATH_LABEL_SERVICES,
    RP,
    SERVICES_FORM,
    SUPER_RP,
    SUPER_RP_FORM,
    TEACHEAR,
    TEACHEAR_FORM,
    TRAINEE,
    TRAINEE_FORM,
    UserDtoIn,
} from "../../../lib";
import { useLocation } from "react-router-dom";
import TrainingService from "../../../services/training.service";
import { NewCompanyDtoIn } from "../../../lib/dto/company.dto";
// import { RouteProps } from "react-router";

export interface IUsersPageProps {
    default_props?: boolean;
}

interface IPath {
    label: string;
}

const filterIcon: IIconProps = { iconName: "Filter" };
const addIcon: IIconProps = { iconName: "Add" };

export const UsersPage: React.FC<IUsersPageProps> = () => {
    const location = useLocation();

    const tooltipId = useId("tooltip");
    const [showForm, setShowForm] = useState<Boolean>(false);
    const [formToDisplay, setFormToDisplay] = useState<string>("");
    const [users, setUsers] = useState<IUser[]>([]);
    const [trainers, setTrainers] = useState<IUser[]>([]);
    const [trainees, setTrainees] = useState<IUser[]>([]);
    const [training, setTraining] = useState<ITraining[]>([]);
    const [rps, setRps] = useState<IUser[]>([]);
    const [srps, setSrps] = useState<IUser[]>([]);
    const [admins, setAdmins] = useState<IUser[]>([]);
    const [trainings, setTrainings] = useState<ITraining[]>([]);
    const [pathLabel, setPathLabel] = useState<string>("");
    const [contentId, setContentId] = useState<IUser>();

    const [selectedSortedItem, setSelectedSortedItem] =
        React.useState<IDropdownOption>();
    const [selectedFilteredItem, setSelectedFiltererItem] =
        React.useState<IDropdownOption>();

    const onChangeSorted = (
        event: React.FormEvent<HTMLDivElement>,
        item?: IDropdownOption
    ): void => {
        setSelectedSortedItem(item);
    };

    const onChangeFiltered = (
        event: React.FormEvent<HTMLDivElement>,
        item?: IDropdownOption
    ): void => {
        setSelectedFiltererItem(item);
    };

    useEffect(() => {
        if (location.state) {
            const thePath = location.state as IPath;
            setPathLabel(thePath.label);
            console.log("the nav:", thePath.label);
            if (
                thePath.label === PATH_LABEL_RESOURCES ||
                thePath.label === PATH_LABEL_CUSTOMER
            ) {
                getAllUser();
            } else if (thePath.label === PATH_LABEL_SERVICES) {
                getAllTraining();
            }
        }
    }, [location.pathname]);

    useEffect(() => {
        getAllUser();
        getAllTraining();
    }, []);

    const toggleFullInfosTab = (id: IUser) => {
        // console.log({ id });
        setContentId(id);
        var hint = document.getElementById(
            "display_tab_ii"
        ) as HTMLInputElement;
        var first_tab = document.getElementById(
            "users_content_display"
        ) as HTMLInputElement;

        hint.className = hint.className !== "show" ? "show" : "hide";
        if (hint) {
            if (hint.className === "show") {
                hint.style.display = "block";
                window.setTimeout(() => {
                    hint.style.opacity = "1";
                    hint.style.transform = "scale(1)";
                }, 0);
                first_tab.style.width = "150px";
            }
            if (hint.className === "hide") {
                hint.style.opacity = "0";
                hint.style.transform = "scale(0)";
                window.setTimeout(function () {
                    hint.style.display = "none";
                }, 700); // timed to match animation-duration
                first_tab.style.width = "550px";
            }
        }
    };

    const showAddForm = (displayForm: string) => {
        console.log("the form to display:", displayForm);
        setFormToDisplay(displayForm);
        showForm ? setShowForm(!showForm) : setShowForm(!showForm);
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
                setUsers(datas.user);
                const trainer = datas.user.filter(
                    (_) => _.user_type === TEACHEAR
                );
                const trainee = datas.user.filter(
                    (_) => _.user_type === TRAINEE
                );
                const rp = datas.user.filter((_) => _.user_type === RP);
                const srp = datas.user.filter((_) => _.user_type === SUPER_RP);
                const admin = datas.user.filter(
                    (_) => _.user_type === ADMIN_OF
                );
                setTrainers(trainer);
                setTrainees(trainee);
                setSrps(srp);
                setRps(rp);
                return datas;
            })
            .catch((err) => {
                console.log("error while getting users:", err);
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
                setTrainings(trainingsResp);
            })
            .catch((err) => {
                console.log("error while gettting all trainings:", err);
            });
    };

    const handleOnCreate = (data: NewUserDtoIn | NewCompanyDtoIn | IUser) => {
        console.log({ data });
        // pathLabel === PATH_LABEL_RESOURCES
        //     ? setTrainers([data.user, ...trainers])
        //     : setTrainees([data.user, ...trainees]);
        setShowForm(false);
    };

    return (
        <div className="user_page_container">
            <div id="users_content_display">
                <div className="display_tab">
                    <div className="tab_header">
                        <div className="tab_title">
                            {!showForm ? (
                                // LIST TITLE
                                pathLabel === PATH_LABEL_RESOURCES ? (
                                    <Text>Ressources</Text>
                                ) : pathLabel === PATH_LABEL_CUSTOMER ? (
                                    <Text>Stagiaires</Text>
                                ) : pathLabel === PATH_LABEL_ORGANIZATION ? (
                                    <Text>O-F</Text>
                                ) : (
                                    <Text>Formations</Text>
                                )
                            ) : // FORM TITLE
                            pathLabel === PATH_LABEL_RESOURCES ? (
                                <Text> Ajouter Ressource</Text>
                            ) : pathLabel === PATH_LABEL_CUSTOMER ? (
                                <Text> Ajouter Stagiaire</Text>
                            ) : pathLabel === PATH_LABEL_ORGANIZATION ? (
                                <Text>Ajouter O-F</Text>
                            ) : pathLabel === PATH_LABEL_COMPANY ? (
                                <Text>Ajouter Société</Text>
                            ) : (
                                <Text> Ajouter Formation</Text>
                            )}
                            <TooltipHost
                                content={
                                    pathLabel === PATH_LABEL_RESOURCES
                                        ? "Ajouter Formateur"
                                        : pathLabel === PATH_LABEL_CUSTOMER
                                        ? "Ajouter Stagiaire"
                                        : pathLabel === PATH_LABEL_COMPANY
                                        ? "Ajouter Société"
                                        : "Ajouter Formation"
                                }
                                id={tooltipId}
                            >
                                <IconButton
                                    iconProps={addIcon}
                                    ariaLabel="add"
                                    onClick={() =>
                                        showAddForm(
                                            pathLabel === PATH_LABEL_RESOURCES
                                                ? TEACHEAR_FORM
                                                : pathLabel ===
                                                  PATH_LABEL_CUSTOMER
                                                ? TRAINEE_FORM
                                                : SERVICES_FORM
                                        )
                                    }
                                />
                            </TooltipHost>
                        </div>
                        <hr className="hr_dashed" />
                        {!showForm ? (
                            <>
                                <div
                                    className={
                                        pathLabel === PATH_LABEL_RESOURCES
                                            ? "tab_header_contentii"
                                            : "tab_header_content"
                                    }
                                >
                                    <SearchBox
                                        placeholder="Search"
                                        onSearch={(newValue) =>
                                            console.log("value is " + newValue)
                                        }
                                    />
                                    {pathLabel === "Trainees" && (
                                        <div className="filter_box">
                                            <Dropdown
                                                selectedKey={
                                                    selectedSortedItem
                                                        ? selectedSortedItem.key
                                                        : undefined
                                                }
                                                onChange={onChangeSorted}
                                                placeholder="Trier par"
                                                options={
                                                    dropdownControlledSortBy
                                                }
                                                styles={dropdownStyles}
                                            />
                                            <Dropdown
                                                selectedKey={
                                                    selectedFilteredItem
                                                        ? selectedFilteredItem.key
                                                        : undefined
                                                }
                                                onChange={onChangeFiltered}
                                                placeholder="Filtrer par OF"
                                                options={
                                                    dropdownControlledFilterBy
                                                }
                                                styles={dropdownStyles}
                                            />
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : null}
                    </div>
                    {!showForm ? (
                        <div
                            className={
                                pathLabel === PATH_LABEL_RESOURCES
                                    ? "tab_content"
                                    : "tab_content_scroll"
                            }
                        >
                            <div>
                                <Text>My "tab name" or allusersnumber()</Text>
                                <hr className="hr_solid" />
                            </div>
                            <div
                                className={
                                    pathLabel === PATH_LABEL_RESOURCES
                                        ? "tab_content_trainer"
                                        : "tab_content_trainee"
                                }
                            >
                                {/* {pathLabel === PATH_LABEL_ORGANIZATION ? (
                                    <TrainingOrganizationCardComponent
                                        toggleTab={() =>
                                            toggleFullInfosTab("jmjqsfqsfm5")
                                        }
                                    />
                                ) : null} */}
                                {trainers.length &&
                                pathLabel === PATH_LABEL_RESOURCES
                                    ? trainers.map((_) => (
                                          <UsersDisplayComponent
                                              toggleTab={() =>
                                                  toggleFullInfosTab(_)
                                              }
                                              detailsInfos={_}
                                              key={_.id}
                                          />
                                      ))
                                    : null}
                                {trainees.length &&
                                pathLabel === PATH_LABEL_CUSTOMER
                                    ? trainees.map((_) => (
                                          <TraineeDisplayComponent
                                              toggleTab={() =>
                                                  toggleFullInfosTab(_)
                                              }
                                              detailsInfosTrainee={_}
                                              key={_.id}
                                          />
                                      ))
                                    : null}
                                {/* {trainings.length &&
                                pathLabel === PATH_LABEL_SERVICES
                                    ? trainings.map((_) => (
                                          <TrainingCardComponent
                                              toggleTab={() =>
                                                  toggleFullInfosTab(_)
                                              }
                                              trainingDetails={_}
                                              key={_.id}
                                          />
                                      ))
                                    : null} */}
                            </div>
                            {pathLabel === PATH_LABEL_RESOURCES && (
                                <div>
                                    <div className="tab_sections_header">
                                        <Text>Super R-P</Text>
                                        <TooltipHost
                                            content="Ajouter super R-P"
                                            id={tooltipId}
                                        >
                                            <IconButton
                                                iconProps={addIcon}
                                                ariaLabel="add"
                                                onClick={() =>
                                                    showAddForm(SUPER_RP_FORM)
                                                }
                                            />
                                        </TooltipHost>
                                    </div>
                                    <hr className="hr_solid" />
                                </div>
                            )}
                            {pathLabel === PATH_LABEL_RESOURCES && (
                                <div className="tab_content_rps">
                                    {srps.length
                                        ? srps.map((_) => (
                                              <UsersDisplayComponent
                                                  toggleTab={() =>
                                                      toggleFullInfosTab(_)
                                                  }
                                                  detailsInfos={_}
                                                  key={_.id}
                                              />
                                          ))
                                        : null}
                                </div>
                            )}
                            {pathLabel === PATH_LABEL_RESOURCES && (
                                <div>
                                    <div className="tab_sections_header">
                                        <Text>R-P simple</Text>
                                        <TooltipHost
                                            content="Ajouter R-P"
                                            id={tooltipId}
                                        >
                                            <IconButton
                                                iconProps={addIcon}
                                                ariaLabel="add"
                                                onClick={() =>
                                                    showAddForm(BASIC_RP_FORM)
                                                }
                                            />
                                        </TooltipHost>
                                    </div>
                                    <hr className="hr_solid" />
                                </div>
                            )}
                            {pathLabel === PATH_LABEL_RESOURCES && (
                                <div className="tab_content_rps">
                                    {rps.length
                                        ? rps.map((_) => (
                                              <UsersDisplayComponent
                                                  toggleTab={() =>
                                                      toggleFullInfosTab(_)
                                                  }
                                                  detailsInfos={_}
                                                  key={_.id}
                                              />
                                          ))
                                        : null}
                                </div>
                            )}
                        </div>
                    ) : pathLabel === PATH_LABEL_RESOURCES ? (
                        <TrainerFormComponent
                            onCreate={handleOnCreate}
                            cancel={() => setShowForm(false)}
                            formToDisplay={formToDisplay}
                            trainings={trainings}
                        />
                    ) : pathLabel === PATH_LABEL_CUSTOMER ? (
                        <TraineeFormComponent
                            onCreate={handleOnCreate}
                            cancel={() => setShowForm(false)}
                        />
                    ) : pathLabel === PATH_LABEL_ORGANIZATION ? (
                        <TrainingOrganizationFormComponent
                            cancel={() => setShowForm(false)}
                            onCreate={handleOnCreate}
                        />
                    ) : pathLabel === PATH_LABEL_COMPANY ? (
                        <CompanyFormComponent onCreate={handleOnCreate} />
                    ) : // <TrainingFormComponent
                    //     cancel={() => setShowForm(false)}
                    // />
                    null}
                </div>
            </div>
            <div id="display_tab_ii">
                <FullInformationsTabComponent
                    // resource={contentId}
                    currentPath={pathLabel}
                />
            </div>
        </div>
    );
};

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: {} };

const dropdownControlledSortBy = [
    { key: "name", text: "Nom" },
    { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "date_added", text: "Date ajoute" },
    { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "most_booking", text: "Réservations" },
];
const dropdownControlledFilterBy = [
    { key: "OF1", text: "OF1" },
    { key: "divid3", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "OF2", text: "OF2" },
    { key: "divid4", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "OF3", text: "OF3" },
];

import {
    IIconProps,
    IDropdownOption,
    TooltipHost,
    IconButton,
    SearchBox,
    Dropdown,
    IDropdownStyles,
    DropdownMenuItemType,
} from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    UsersDisplayComponent,
    TrainerFormComponent,
    FullInformationsTabComponent,
    EmptyComponent,
} from "../../../../components";
import {
    IUser,
    ITraining,
    PATH_LABEL_RESOURCES,
    PATH_LABEL_CUSTOMER,
    UserDtoIn,
    TEACHEAR,
    TRAINEE,
    RP,
    SUPER_RP,
    ADMIN_OF,
    NewUserDtoIn,
    TEACHEAR_FORM,
    SUPER_RP_FORM,
    BASIC_RP_FORM,
} from "../../../../lib";
import UserService from "../../../../services/user.service";
import { Text } from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import TrainingService from "../../../../services/training.service";
import { LoadingComponent } from "../../../../components/loading_component/Loading.component";

export interface IResourcesPageProps {
    default_props?: boolean;
}

interface IPath {
    label: string;
}

const filterIcon: IIconProps = { iconName: "Filter" };
const addIcon: IIconProps = { iconName: "Add" };

export const ResourcesPage: React.FC<IResourcesPageProps> = () => {
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
    const [resource, setResource] = useState<IUser>();
    const [loading, setLoading] = useState<boolean>(true);

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
            }
        }
    }, [location.pathname]);

    useEffect(() => {
        getAllUser();
        toggleResourcesContent();
        getAllTraining();
    }, []);

    // users_content_display_resources;
    const toggleResourcesContent = () => {
        var hint_resources = document.getElementById(
            "users_content_display_resources"
        ) as HTMLInputElement;

        hint_resources.className =
            hint_resources.className !== "show" ? "show" : "hide";
        if (hint_resources.className === "show") {
            hint_resources.style.display = "block";
            window.setTimeout(() => {
                hint_resources.style.opacity = "1";
                hint_resources.style.transform = "scale(1)";
            }, 0);
        }
        if (hint_resources.className === "hide") {
            hint_resources.style.opacity = "0";
            hint_resources.style.transform = "scale(0)";
            window.setTimeout(function () {
                hint_resources.style.display = "none";
            }, 700); // timed to match animation-duration
        }
    };

    const toggleFullInfosTab = (user: IUser) => {
        // console.log({ user });
        setResource(user);
        var hint = document.getElementById(
            "resource_display_tab_ii"
        ) as HTMLInputElement;
        var first_tab = document.getElementById(
            "users_content_display_resources"
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
                setResource(undefined);
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
                    setLoading(false);
                    return [];
                }
                const datas = (await response.json()) as UserDtoIn;
                console.log("the users:", datas.user);
                setUsers(datas.user);
                const trainer = datas.user.filter(
                    (_) => _.user_type === TEACHEAR
                );
                const rp = datas.user.filter((_) => _.user_type === RP);
                const srp = datas.user.filter((_) => _.user_type === SUPER_RP);
                setTrainers(trainer);
                setSrps(srp);
                setRps(rp);
                setLoading(false);
                return datas;
            })
            .catch((err) => {
                console.log("error while getting users:", err);
                setLoading(false);
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

    const handleOnCreate = (data: IUser) => {
        console.log({ data });
        if (data.user_type === TEACHEAR) {
            console.log("dant le if du teacher");
            setTrainers([data, ...trainers]);
        }
        console.log("le user type:", data.user_type);
        if (data.user_type === SUPER_RP) {
            console.log("dant le if du super rp");
            setSrps([data, ...srps]);
        }
        if (data.user_type === RP) {
            console.log("dant le if du rp");
            setRps([data, ...rps]);
        }
        setShowForm(false);
    };

    return (
        <div className="user_page_container">
            <div id="users_content_display_resources">
                <div className="display_tab">
                    <div className="tab_header">
                        <div className="tab_title">
                            {!showForm ? (
                                // LIST TITLE
                                <Text>Ressources</Text>
                            ) : // FORM TITLE
                            resource ? (
                                <Text> Modifier Ressource</Text>
                            ) : (
                                <Text> Ajouter Ressource</Text>
                            )}
                            {/* <TooltipHost
                                content="Ajouter Formateur"
                                id={tooltipId}
                            >
                                <IconButton
                                    iconProps={addIcon}
                                    ariaLabel="add"
                                    onClick={() => showAddForm(TEACHEAR_FORM)}
                                />
                            </TooltipHost> */}
                        </div>
                        <hr className="hr_dashed" />
                        {!showForm ? (
                            <>
                                <div className="tab_header_content">
                                    <SearchBox
                                        placeholder="Search"
                                        onSearch={(newValue) =>
                                            console.log("value is " + newValue)
                                        }
                                    />
                                    <div className="filter_box">
                                        <Dropdown
                                            selectedKey={
                                                selectedSortedItem
                                                    ? selectedSortedItem.key
                                                    : undefined
                                            }
                                            onChange={onChangeSorted}
                                            placeholder="Trier par"
                                            options={dropdownControlledSortBy}
                                            styles={dropdownStyles}
                                        />
                                        <Dropdown
                                            selectedKey={
                                                selectedFilteredItem
                                                    ? selectedFilteredItem.key
                                                    : undefined
                                            }
                                            onChange={onChangeFiltered}
                                            placeholder="Filtrer par Cat??gorie"
                                            options={dropdownControlledFilterBy}
                                            styles={dropdownStyles}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                    {!showForm ? (
                        <div className="tab_content">
                            <div>
                                <div className="tab_sections_header">
                                    <Text>Formateur ({trainers.length})</Text>
                                    <TooltipHost
                                        content="Ajouter Formateur"
                                        id={tooltipId}
                                    >
                                        <IconButton
                                            iconProps={addIcon}
                                            ariaLabel="add"
                                            onClick={() =>
                                                showAddForm(TEACHEAR_FORM)
                                            }
                                        />
                                    </TooltipHost>
                                </div>
                                <hr className="hr_solid" />
                            </div>
                            <div className="tab_content_trainer">
                                {loading ? (
                                    <LoadingComponent />
                                ) : trainers.length > 0 &&
                                  pathLabel === PATH_LABEL_RESOURCES ? (
                                    trainers.map((_) => (
                                        <UsersDisplayComponent
                                            toggleTab={() =>
                                                toggleFullInfosTab(_)
                                            }
                                            detailsInfos={_}
                                            key={_.id}
                                        />
                                    ))
                                ) : (
                                    <EmptyComponent messageText="Aucun Formateur trouv??" />
                                )}
                            </div>
                            {pathLabel === PATH_LABEL_RESOURCES && (
                                <div>
                                    <div className="tab_sections_header">
                                        <Text>Super R-P ({srps.length})</Text>
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
                                    {loading ? (
                                        <LoadingComponent />
                                    ) : srps.length > 0 ? (
                                        srps.map((_) => (
                                            <UsersDisplayComponent
                                                toggleTab={() =>
                                                    toggleFullInfosTab(_)
                                                }
                                                detailsInfos={_}
                                                key={_.id}
                                            />
                                        ))
                                    ) : (
                                        <EmptyComponent messageText="Aucun super rp trouv??" />
                                    )}
                                </div>
                            )}
                            {pathLabel === PATH_LABEL_RESOURCES && (
                                <div>
                                    <div className="tab_sections_header">
                                        <Text>R-P simple ({rps.length})</Text>
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
                                    {loading ? (
                                        <LoadingComponent />
                                    ) : rps.length ? (
                                        rps.map((_) => (
                                            <UsersDisplayComponent
                                                toggleTab={() =>
                                                    toggleFullInfosTab(_)
                                                }
                                                detailsInfos={_}
                                                key={_.id}
                                            />
                                        ))
                                    ) : (
                                        <EmptyComponent messageText="Aucun rp trouv??" />
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <TrainerFormComponent
                            onCreate={handleOnCreate}
                            cancel={() => {
                                setShowForm(false);
                                setResource(undefined);
                            }}
                            formToDisplay={formToDisplay}
                            trainings={trainings}
                            user={resource}
                        />
                    )}
                </div>
            </div>
            <div id="resource_display_tab_ii">
                <FullInformationsTabComponent
                    user={resource}
                    currentPath={pathLabel}
                    showTheForm={showAddForm}
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
    { key: "most_booking", text: "R??servations" },
];
const dropdownControlledFilterBy = [
    { key: "Formateur", text: "Formateur" },
    { key: "divid3", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "Super Rp", text: "Super Rp" },
    { key: "divid4", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "Rp", text: "Rp" },
];

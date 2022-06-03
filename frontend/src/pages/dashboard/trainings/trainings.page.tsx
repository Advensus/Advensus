import {
    Dropdown,
    DropdownMenuItemType,
    IconButton,
    IDropdownOption,
    IDropdownStyles,
    IIconProps,
    SearchBox,
    TooltipHost,
    Text,
} from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    TrainingCardComponent,
    TrainingFormComponent,
    FullInformationsTabComponent,
    EmptyComponent,
} from "../../../components";
import {
    IUser,
    ITraining,
    PATH_LABEL_RESOURCES,
    PATH_LABEL_CUSTOMER,
    PATH_LABEL_SERVICES,
    NewUserDtoIn,
    PATH_LABEL_COMPANY,
    SERVICES_FORM,
} from "../../../lib";
import TrainingService from "../../../services/training.service";
import { useId } from "@fluentui/react-hooks";
import { LoadingComponent } from "../../../components/loading_component/Loading.component";

export interface ITrainingsPageProps {
    default_props?: boolean;
}

interface IPath {
    label: string;
}

const filterIcon: IIconProps = { iconName: "Filter" };
const addIcon: IIconProps = { iconName: "Add" };

export const TrainingsPage: React.FC<ITrainingsPageProps> = () => {
    const location = useLocation();

    const tooltipId = useId("tooltiptrainings");
    const [showForm, setShowForm] = useState<Boolean>(false);
    const [formToDisplay, setFormToDisplay] = useState<string>("");
    const [users, setUsers] = useState<IUser[]>([]);
    const [trainings, setTrainings] = useState<ITraining[]>([]);
    const [pathLabel, setPathLabel] = useState<string>("");
    const [trainingToDisplay, setTrainingToDisplay] = useState<ITraining>();
    const [search, setSearch] = useState<string>("");
    const [filteredTraining, setFilteredTraining] = useState<ITraining[]>([]);
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
            if (thePath.label === PATH_LABEL_SERVICES) {
                getAllTraining();
            }
        }
    }, [location.pathname]);

    useEffect(() => {
        toggleTrainingsContent();
    }, []);

    useEffect(() => {
        getAllTraining();
        // const searchByKeyWord = search ? filterTrainings(search) : trainings;
        // setFilteredTraining(searchByKeyWord);
        // console.log({ searchByKeyWord });
    }, [search]);

    const filterTrainings = (searchTerm: string) => {
        return trainings.filter(
            (_) => `${_.intitule} ${_.intitule}`.indexOf(searchTerm) !== -1
        );
    };

    const getAllTraining = async () => {
        setLoading(true);
        await TrainingService.get_all_trainings()
            .then(async (resp) => {
                if (resp.status !== 200) {
                    console.log({ resp });
                    return [];
                }
                setLoading(false);
                return resp.json();
            })
            .then((trainingsResp: ITraining[]) => {
                console.log("the all trainings", trainingsResp);
                setTrainings(trainingsResp);
                setLoading(false);

                const searchByKeyWord = search
                    ? filterTrainings(search)
                    : trainingsResp;
                setFilteredTraining(searchByKeyWord);
            })
            .catch((err) => {
                console.log("error while gettting all trainings:", err);
                setLoading(false);
            });
    };

    // users_content_display_trainings;
    const toggleTrainingsContent = () => {
        var hint_trainings = document.getElementById(
            "users_content_display_trainings"
        ) as HTMLInputElement;

        hint_trainings.className =
            hint_trainings.className !== "show" ? "show" : "hide";
        if (hint_trainings.className === "show") {
            hint_trainings.style.display = "block";
            window.setTimeout(() => {
                hint_trainings.style.opacity = "1";
                hint_trainings.style.transform = "scale(1)";
            }, 0);
        }
        if (hint_trainings.className === "hide") {
            hint_trainings.style.opacity = "0";
            hint_trainings.style.transform = "scale(0)";
            window.setTimeout(function () {
                hint_trainings.style.display = "none";
            }, 700); // timed to match animation-duration
        }
    };

    const toggleFullInfosTab = (traing: ITraining) => {
        // console.log({ traing });
        setTrainingToDisplay(traing);
        var hint = document.getElementById(
            "display_tab_ii"
        ) as HTMLInputElement;
        var first_tab = document.getElementById(
            "users_content_display_trainings"
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

    const handleOnCreate = (data: NewUserDtoIn) => {
        console.log({ data });
        // pathLabel === PATH_LABEL_RESOURCES
        //     ? setTrainers([data.user, ...trainers])
        //     : setTrainees([data.user, ...trainees]);
        setShowForm(false);
    };

    return (
        <div className="user_page_container">
            <div id="users_content_display_trainings">
                <div className="display_tab">
                    <div className="tab_header">
                        <div className="tab_title">
                            {!showForm ? (
                                // LIST TITLE

                                <Text>Formations</Text>
                            ) : (
                                // FORM TITLE
                                <Text> Ajouter Formation</Text>
                            )}
                            <TooltipHost
                                content="Ajouter Formation"

                                // id={tooltipId}
                            >
                                <IconButton
                                    iconProps={addIcon}
                                    ariaLabel="add"
                                    onClick={() => showAddForm(SERVICES_FORM)}
                                />
                            </TooltipHost>
                        </div>
                        <hr className="hr_dashed" />
                        {!showForm ? (
                            <>
                                <div className="tab_header_content">
                                    <SearchBox
                                        placeholder="Search"
                                        onEscape={(ev) => {
                                            setSearch("");
                                        }}
                                        onClear={(ev) => {
                                            setSearch("");
                                        }}
                                        onChange={(_, newValue) =>
                                            setSearch(newValue || "")
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
                        <div className="tab_content_scroll">
                            <div>
                                <Text>Total ({trainings.length})</Text>
                                <hr className="hr_solid" />
                            </div>
                            <div className="tab_content_trainee">
                                {loading ? (
                                    <LoadingComponent />
                                ) : filteredTraining.length &&
                                  pathLabel === PATH_LABEL_SERVICES ? (
                                    filteredTraining.map((_) => (
                                        <TrainingCardComponent
                                            toggleTab={() =>
                                                toggleFullInfosTab(_)
                                            }
                                            trainingDetails={_}
                                            key={_.id}
                                        />
                                    ))
                                ) : (
                                    <EmptyComponent messageText="Aucune Formation pou le moment" />
                                )}
                            </div>
                        </div>
                    ) : (
                        <TrainingFormComponent
                            cancel={() => setShowForm(false)}
                        />
                    )}
                </div>
            </div>
            <div id="display_tab_ii">
                <FullInformationsTabComponent
                    training={trainingToDisplay}
                    trainings={trainings}
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

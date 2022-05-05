import {
    IIconProps,
    IDropdownOption,
    TooltipHost,
    IconButton,
    SearchBox,
    Dropdown,
    IDropdownStyles,
    DropdownMenuItemType,
    Text,
} from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    TraineeDisplayComponent,
    TraineeFormComponent,
    FullInformationsTabComponent,
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
    PATH_LABEL_COMPANY,
    TEACHEAR_FORM,
    TRAINEE_FORM,
    SERVICES_FORM,
} from "../../../../lib";
import UserService from "../../../../services/user.service";

export interface ITraineesPageProps {
    default_props?: boolean;
}

interface IPath {
    label: string;
}

const filterIcon: IIconProps = { iconName: "Filter" };
const addIcon: IIconProps = { iconName: "Add" };

export const TraineesPage: React.FC<ITraineesPageProps> = () => {
    const location = useLocation();

    const tooltipId = useId("tooltiptrainees");
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
    const [contentId, setContentId] = useState<string>("");

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
        toggleTraineesContent();
    }, []);

    // users_content_display_trainees;
    const toggleTraineesContent = () => {
        var hint_trainees = document.getElementById(
            "users_content_display_trainees"
        ) as HTMLInputElement;

        hint_trainees.className =
            hint_trainees.className !== "show" ? "show" : "hide";
        if (hint_trainees.className === "show") {
            hint_trainees.style.display = "block";
            window.setTimeout(() => {
                hint_trainees.style.opacity = "1";
                hint_trainees.style.transform = "scale(1)";
            }, 0);
        }
        if (hint_trainees.className === "hide") {
            hint_trainees.style.opacity = "0";
            hint_trainees.style.transform = "scale(0)";
            window.setTimeout(function () {
                hint_trainees.style.display = "none";
            }, 700); // timed to match animation-duration
        }
    };

    const toggleFullInfosTab = (id: string) => {
        // console.log({ id });
        setContentId(id);
        var hint = document.getElementById(
            "display_tab_ii"
        ) as HTMLInputElement;
        var first_tab = document.getElementById(
            "users_content_display_trainees"
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
                const trainee = datas.user.filter(
                    (_) => _.user_type === TRAINEE
                );
                setTrainees(trainee);

                return datas;
            })
            .catch((err) => {
                console.log("error while getting users:", err);
            });
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
            <div id="users_content_display_trainees">
                <div className="display_tab">
                    <div className="tab_header">
                        <div className="tab_title">
                            {!showForm ? (
                                // LIST TITLE
                                <Text>Stagiaires</Text>
                            ) : (
                                // FORM TITLE
                                <Text> Ajouter Stagiaire</Text>
                            )}
                            <TooltipHost
                                content="Ajouter Stagiaire"
                                id={tooltipId}
                            >
                                <IconButton
                                    iconProps={addIcon}
                                    ariaLabel="add"
                                    onClick={() => showAddForm(TRAINEE_FORM)}
                                />
                            </TooltipHost>
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
                                            placeholder="Filtrer par OF"
                                            options={dropdownControlledFilterBy}
                                            styles={dropdownStyles}
                                        />
                                    </div>
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
                                {trainees.length &&
                                pathLabel === PATH_LABEL_CUSTOMER
                                    ? trainees.map((_) => (
                                          <TraineeDisplayComponent
                                              toggleTab={() =>
                                                  toggleFullInfosTab(_.id)
                                              }
                                              detailsInfosTrainee={_}
                                              key={_.id}
                                          />
                                      ))
                                    : null}
                            </div>
                        </div>
                    ) : (
                        <TraineeFormComponent
                            onCreate={handleOnCreate}
                            cancel={() => setShowForm(false)}
                        />
                    )}
                </div>
            </div>
            <div id="display_tab_ii">
                <FullInformationsTabComponent
                    contentId={contentId}
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

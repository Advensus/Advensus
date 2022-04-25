import {
    IconButton,
    IIconProps,
    SearchBox,
    Text,
    TooltipHost,
} from "@fluentui/react";
import React, { useEffect, useState } from "react";
import {
    FullInformationsTabComponent,
    TraineeDisplayComponent,
    TraineeFormComponent,
    TrainerFormComponent,
    UsersDisplayComponent,
} from "../../../components";
import { useId } from "@fluentui/react-hooks";
import UserService from "../../../services/user.service";
import {
    ADMIN_OF,
    IUser,
    NewUserDto,
    NewUserDtoIn,
    PATH_LABEL_RESOURCES,
    RP,
    SUPER_RP,
    TEACHEAR,
    TRAINEE,
} from "../../../lib";
import { useLocation } from "react-router-dom";
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
    const [users, setUsers] = useState<IUser[]>([]);
    const [trainers, setTrainers] = useState<IUser[]>([]);
    const [trainees, setTrainees] = useState<IUser[]>([]);
    const [rps, setTps] = useState<IUser[]>([]);
    const [srps, setSrps] = useState<IUser[]>([]);
    const [admins, setAdmins] = useState<IUser[]>([]);
    const [pathLabel, setPathLabel] = useState<string>("");

    useEffect(() => {
        getAllUser();

        if (location.state) {
            const thePath = location.state as IPath;
            setPathLabel(thePath.label);
            console.log("the nav:", thePath.label);
        }
    }, [location.pathname]);

    const toggleFullInfosTab = () => {
        var hint = document.getElementById(
            "display_tab_ii"
        ) as HTMLInputElement;
        var first_tab = document.getElementById(
            "users_content_display"
        ) as HTMLInputElement;

        hint.className = hint.className !== "show" ? "show" : "hide";
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
    };

    const showAddForm = () => {
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
                return response.json();
            })
            .then((usersResp: IUser[]) => {
                console.log("all the users:", usersResp);
                setUsers(usersResp);
                const trainer = usersResp.filter(
                    (user) => user.user_type === TEACHEAR
                );
                const trainee = usersResp.filter(
                    (user) => user.user_type === TRAINEE
                );
                const rp = usersResp.filter((user) => user.user_type === RP);
                const srp = usersResp.filter(
                    (user) => user.user_type === SUPER_RP
                );
                const admin = usersResp.filter(
                    (user) => user.user_type === ADMIN_OF
                );
                setTrainers(trainer);
                setTrainees(trainee);
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
            <div id="users_content_display">
                <div className="display_tab">
                    <div className="tab_header">
                        <div className="tab_title">
                            {!showForm ? (
                                pathLabel === PATH_LABEL_RESOURCES ? (
                                    <Text>Ressources</Text>
                                ) : (
                                    <Text>Stagiaires</Text>
                                )
                            ) : pathLabel === PATH_LABEL_RESOURCES ? (
                                <Text> Ajouter Ressource</Text>
                            ) : (
                                <Text> Ajouter Stagiaire</Text>
                            )}
                            <TooltipHost content="Ajouter" id={tooltipId}>
                                <IconButton
                                    iconProps={addIcon}
                                    ariaLabel="add"
                                    onClick={showAddForm}
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
                                    {pathLabel === "Trainees" && (
                                        <div className="filter_box">
                                            <SearchBox
                                                placeholder="Filter1"
                                                iconProps={filterIcon}
                                            />
                                            <SearchBox
                                                placeholder="Filter"
                                                iconProps={filterIcon}
                                            />
                                        </div>
                                    )}
                                </div>
                                <Text>My "tab name" or allusersnumber()</Text>
                                <hr className="hr_solid" />
                            </>
                        ) : null}
                    </div>
                    {!showForm ? (
                        <div
                            className={
                                pathLabel === "Resources"
                                    ? "tab_content"
                                    : "tab_content_trainee"
                            }
                        >
                            {trainers.length && pathLabel === "Resources"
                                ? trainers.map((_) => (
                                      <UsersDisplayComponent
                                          toggleTab={toggleFullInfosTab}
                                          detailsInfos={_}
                                          key={_.id}
                                      />
                                  ))
                                : null}
                            {trainees.length && pathLabel === "Trainees"
                                ? trainees.map((_) => (
                                      <TraineeDisplayComponent
                                          toggleTab={toggleFullInfosTab}
                                          detailsInfosTrainee={_}
                                          key={_.id}
                                      />
                                  ))
                                : null}
                        </div>
                    ) : pathLabel === "Resources" ? (
                        <TrainerFormComponent
                            onCreate={handleOnCreate}
                            cancel={() => setShowForm(false)}
                        />
                    ) : (
                        <TraineeFormComponent
                            onCreate={handleOnCreate}
                            cancel={() => setShowForm(false)}
                        />
                    )}
                    {/* {/* <div>
                    <TraineeDisplayComponent />
                    <TraineeDisplayComponent />
                    <TraineeDisplayComponent />
                </div> */}
                </div>
            </div>
            <div id="display_tab_ii">
                <FullInformationsTabComponent />
            </div>
        </div>
    );
};

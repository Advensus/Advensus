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
    TrainerFormComponent,
    UsersDisplayComponent,
} from "../../../components";
import { useId } from "@fluentui/react-hooks";
import UserService from "../../../services/user.service";
import { ADMIN_OF, IUser, RP, SUPER_RP, TEACHEAR, TRAINEE } from "../../../lib";
import { useLocation } from "react-router-dom";
// import { RouteProps } from "react-router";

export interface IUsersPageProps {
    default_props?: boolean;
}

const filterIcon: IIconProps = { iconName: "Filter" };
const addIcon: IIconProps = { iconName: "Add" };

export const UsersPage: React.FC<IUsersPageProps> = () => {
    const location = useLocation();

    const tooltipId = useId("tooltip");
    const [showForm, setShowForm] = useState<Boolean>(false);
    const [trainers, setTrainers] = useState<IUser[]>([]);
    const [trainees, setTrainees] = useState<IUser[]>([]);
    const [rps, setTps] = useState<IUser[]>([]);
    const [srps, setSrps] = useState<IUser[]>([]);
    const [admins, setAdmins] = useState<IUser[]>([]);

    useEffect(() => {
        getAllUser();

        console.log("the nav:", location);
    }, []);

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

    return (
        <div className="user_page_container">
            <div id="users_content_display">
                <div className="display_tab">
                    <div className="tab_header">
                        <div className="tab_title">
                            {!showForm ? (
                                <Text>Onglet title</Text>
                            ) : (
                                <Text> Ajouter Formateur</Text>
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
                                </div>
                                <Text>My "tab name" or allusersnumber()</Text>
                                <hr className="hr_solid" />
                            </>
                        ) : null}
                    </div>
                    {!showForm ? (
                        <div className="tab_content">
                            {trainers.length > 0
                                ? trainers.map((_) => (
                                      <UsersDisplayComponent
                                          toggleTab={toggleFullInfosTab}
                                          infosTrainer={_}
                                          key={_.id}
                                      />
                                  ))
                                : null}
                        </div>
                    ) : (
                        <TrainerFormComponent
                            cancel={() => setShowForm(false)}
                        />
                    )}
                    {/* {/* <div>
                    <TraineeDisplayComponent />
                    <TraineeDisplayComponent />
                    <TraineeDisplayComponent />
                    <TraineeDisplayComponent />
                    <TraineeDisplayComponent /> 
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

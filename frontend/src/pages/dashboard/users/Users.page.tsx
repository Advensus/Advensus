import { IIconProps, SearchBox, Text } from "@fluentui/react";
import React from "react";
import {
    FullInformationsTabComponent,
    TraineeDisplayComponent,
    UsersDisplayComponent,
} from "../../../components";
// import { RouteProps } from "react-router";

export interface IUsersPageProps {
    default_props?: boolean;
}

const filterIcon: IIconProps = { iconName: "Filter" };

export const UsersPage: React.FC<IUsersPageProps> = () => {
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

    return (
        <div className="user_page_container">
            <div id="users_content_display">
                <div className="display_tab">
                    <div className="tab_header">
                        <div className="tab_title">
                            <Text>Onglet title</Text>
                            <hr className="hr_dashed" />
                        </div>
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
                    </div>
                    <div className="tab_content">
                        <UsersDisplayComponent toggleTab={toggleFullInfosTab} />
                        <UsersDisplayComponent toggleTab={toggleFullInfosTab} />
                        <UsersDisplayComponent toggleTab={toggleFullInfosTab} />
                        <UsersDisplayComponent toggleTab={toggleFullInfosTab} />
                        <UsersDisplayComponent toggleTab={toggleFullInfosTab} />
                        <UsersDisplayComponent toggleTab={toggleFullInfosTab} />
                        <UsersDisplayComponent toggleTab={toggleFullInfosTab} />
                        <UsersDisplayComponent toggleTab={toggleFullInfosTab} />
                        <UsersDisplayComponent toggleTab={toggleFullInfosTab} />
                        <UsersDisplayComponent toggleTab={toggleFullInfosTab} />
                        <UsersDisplayComponent toggleTab={toggleFullInfosTab} />
                        <UsersDisplayComponent toggleTab={toggleFullInfosTab} />
                        <UsersDisplayComponent toggleTab={toggleFullInfosTab} />
                        <UsersDisplayComponent toggleTab={toggleFullInfosTab} />
                    </div>
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

import { IIconProps, SearchBox, Text } from "@fluentui/react";
import React from "react";
import {
    TraineeDisplayComponent,
    UsersDisplayComponent,
} from "../../../components";
// import { RouteProps } from "react-router";

export interface IUsersPageProps {
    default_props?: boolean;
}

const filterIcon: IIconProps = { iconName: "Filter" };

export const UsersPage: React.FC<IUsersPageProps> = () => {
    return (
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
                    <UsersDisplayComponent />
                    <UsersDisplayComponent />
                    <UsersDisplayComponent />
                    <UsersDisplayComponent />
                    <UsersDisplayComponent />
                    <UsersDisplayComponent />
                    <UsersDisplayComponent />
                    <UsersDisplayComponent />
                    <UsersDisplayComponent />
                    <UsersDisplayComponent />
                    <UsersDisplayComponent />
                    <UsersDisplayComponent />
                    <UsersDisplayComponent />
                    <UsersDisplayComponent />
                </div>
                {/* <div>
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
    );
};

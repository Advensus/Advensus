import React, { useEffect, useState } from "react";
import {
    SchedulerHeader,
    SchedulerHeaderProps,
} from "@progress/kendo-react-scheduler";
import { SchedulerConfigContext } from "./scheduler.page";
import { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import {
    ToolbarItem,
    ToolbarSeparator,
    ToolbarSpacer,
} from "@progress/kendo-react-buttons";
import { ToolbarDropdown } from "./toolbar-dropdown";
import { IUser, TEACHEAR, TRAINEE, UserDtoIn } from "../../../lib";
import UserService from "../../../services/user.service";

export const CustomHeader = (props: SchedulerHeaderProps) => {
    const [trainers, setTrainers] = useState<IUser[]>([]);
    const [trainees, setTrainees] = useState<IUser[]>([]);

    useEffect(() => {
        getAllUser();
    }, []);

    // FOR HEADER
    const [traineeDisplay, setTraineeDisplay] = React.useContext(
        SchedulerConfigContext
    ).traineeDisplay;
    const [formerDisplay, setFormerDisplay] = React.useContext(
        SchedulerConfigContext
    ).formerDisplay;

    const handleTraineeDisplayChange = React.useCallback(
        (event: DropDownListChangeEvent) => {
            setTraineeDisplay(event.target.value);
        },
        [traineeDisplay]
    );

    const getAllUser = async () => {
        await UserService.get_all_users()
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log(
                        "Error resp while gettind all users in scheduler:",
                        response
                    );
                    return [];
                }
                const datas = (await response.json()) as UserDtoIn;
                console.log("the users in scheduler:", datas.user);
                const trainer = datas.user.filter(
                    (_) => _.user_type === TEACHEAR
                );
                const trainee = datas.user.filter(
                    (_) => _.user_type === TRAINEE
                );
                setTrainers(trainer);
                setTrainees(trainee);
                return datas;
            })
            .catch((err) => {
                console.log("error while getting users in scheduler:", err);
            });
    };

    const handleFormerDisplayChange = React.useCallback(
        (event: DropDownListChangeEvent) => {
            setFormerDisplay(event.target.value);
        },
        [formerDisplay]
    );
    return (
        <SchedulerHeader>
            {props.children} <ToolbarSpacer />
            <ToolbarItem>
                <ToolbarDropdown
                    text="Stagiaire"
                    value={traineeDisplay}
                    data={trainees.map((_) => _.first_name)}
                    onChange={handleTraineeDisplayChange}
                />
            </ToolbarItem>
            <ToolbarSeparator />
            <ToolbarItem>
                <ToolbarDropdown
                    text="Formateur"
                    value={formerDisplay}
                    data={trainers.map((_) => _.first_name)}
                    onChange={handleFormerDisplayChange}
                />
            </ToolbarItem>
        </SchedulerHeader>
    );
};

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
import {
    ITraining,
    IUser,
    TEACHEAR,
    TRAINEE,
    TrainingDtoIn,
    UserDtoIn,
} from "../../../lib";
import UserService from "../../../services/user.service";
import { useUsersStore } from "../../../stores/users.store";
import TrainingService from "../../../services/training.service";
import { useTrainingsStore } from "../../../stores/trainings.store";

export interface ICutomHeaderProps {
    default_props?: boolean;
    displayEventByResource: (persoId: string) => void;
}

export const CustomHeader: React.FC<ICutomHeaderProps> = ({
    displayEventByResource,
    children,
}) => {
    const [trainers, setTrainers] = useState<IUser[]>([]);
    const [trainees, setTrainees] = useState<IUser[]>([]);
    const { updateCurrentUsers } = useUsersStore();
    const { updateCurrentTrainings } = useTrainingsStore();

    useEffect(() => {
        getAllUser();
        getAllTraining();
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
            console.log({ event });
            displayEventByResource(event.target.value);
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
                const trainer = datas.user.filter(
                    (_) => _.user_type === TEACHEAR
                );
                const trainee = datas.user.filter(
                    (_) => _.user_type === TRAINEE
                );
                setTrainers(trainer);
                setTrainees(trainee);
                updateCurrentUsers(datas);
                return datas;
            })
            .catch((err) => {
                console.log("error while getting users in scheduler:", err);
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
            .then((trainingsResp: TrainingDtoIn) => {
                updateCurrentTrainings(trainingsResp);
            })
            .catch((err) => {
                console.log(
                    "error while gettting all trainings scheduler:",
                    err
                );
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
            {children} <ToolbarSpacer />
            <ToolbarItem>
                <ToolbarDropdown
                    text="Stagiaire"
                    value={traineeDisplay}
                    data={trainees.map((_) => _.first_name + " " + _.username)}
                    onChange={(event) => {
                        handleTraineeDisplayChange(event);
                    }}
                    onFilterChange={() => {
                        console.log("filter was changed");
                    }}
                />
            </ToolbarItem>
            <ToolbarSeparator />
            <ToolbarItem>
                <ToolbarDropdown
                    text="Formateur"
                    value={formerDisplay}
                    data={trainers.map((_) => _.first_name + " " + _.username)}
                    onChange={(event) => {
                        handleFormerDisplayChange(event);
                        displayEventByResource(event.target.value);
                    }}
                />
            </ToolbarItem>
        </SchedulerHeader>
    );
};

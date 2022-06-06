import * as React from "react";

import {
    DropDownList,
    DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import { FieldProps } from "@progress/kendo-react-form";

import { treatments, rooms, therapists } from "./data";
import UserService from "../../../services/user.service";
import {
    ISubscription,
    ITraining,
    IUser,
    TEACHEAR,
    TRAINEE,
    UserDtoIn,
} from "../../../lib";
import { useUsersStore } from "../../../stores/users.store";
import TrainingService from "../../../services/training.service";
import { useTrainingsStore } from "../../../stores/trainings.store";

interface IItemDropDown {
    id: string;
    name: string;
}

// FORMERS
export const FormerList = (props: FieldProps) => {
    const [formers, setFormers] = React.useState<IItemDropDown[]>([]);
    const { users } = useUsersStore();

    React.useEffect(() => {
        console.log({ users });
        if (users) {
            const theFormers = users.user.filter(
                (_) => _.user_type === TEACHEAR
            );
            const formersDropdown = theFormers.map((_) => {
                return { id: _.id, name: _.first_name + " " + _.username };
            });
            setFormers(formersDropdown);
        }
    }, [users]);

    const handleChange = (event: DropDownListChangeEvent) => {
        if (props.onChange) {
            props.onChange.call(undefined, { value: event.value.id });
        }
    };

    return (
        <DropDownList
            onChange={handleChange}
            value={formers.find((p: any) => p.id === props.value)}
            data={formers}
            dataItemKey={"id"}
            textField={"name"}
        />
    );
};

// TRAINEES
export const TraineesList = (props: FieldProps) => {
    const [trainees, setTrainees] = React.useState<IItemDropDown[]>([]);
    const { users } = useUsersStore();

    React.useEffect(() => {
        console.log({ users });
        if (users) {
            const theTrainees = users.user.filter(
                (_) => _.user_type === TRAINEE
            );
            const traineesDropdown = theTrainees.map((_) => {
                return { id: _.id, name: _.first_name + " " + _.username };
            });
            setTrainees(traineesDropdown);
        }
    }, [users]);

    const handleChange = (event: DropDownListChangeEvent) => {
        if (props.onChange) {
            props.onChange.call(undefined, { value: [event.value.id] });
        }
    };

    return (
        <DropDownList
            onChange={handleChange}
            value={trainees.find((p: any) => p.id === props.value)}
            data={trainees}
            dataItemKey={"id"}
            textField={"name"}
        />
    );
};

// TRAINING
export const CoursesEditor = (props: FieldProps) => {
    const [trainingsDrop, setTrainingsDrop] = React.useState<IItemDropDown[]>(
        []
    );
    const { trainings } = useTrainingsStore();

    React.useEffect(() => {
        getTrainings();
        // console.log({ trainings });
        // if (trainings) {
        //     const theTrainings = trainings.training.map((_) => {
        //         return { id: _.id, name: _.intitule };
        //     });
        //     setTrainingsDrop(theTrainings);
        // }
    }, [trainings]);
    const handleChange = (event: DropDownListChangeEvent) => {
        if (props.onChange) {
            props.onChange.call(undefined, { value: event.value.id });
            console.log({ event });
        }
    };

    const getTrainings = async () => {
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
                const theTrainings = trainingsResp.map((_) => {
                    return { id: _.id, name: _.intitule };
                });
                setTrainingsDrop(theTrainings);
            })
            .catch((err) => {
                console.log(
                    "error while gettting all trainings in editors:",
                    err
                );
            });
    };

    return (
        <DropDownList
            onChange={handleChange}
            value={trainingsDrop.find((t: any) => t.id === props.value)}
            data={trainingsDrop}
            dataItemKey={"id"}
            textField={"name"}
        />
    );
};

// EDOF
export const EdofList = (props: FieldProps) => {
    const [subscription, setSubscription] = React.useState<IItemDropDown[]>([]);

    React.useEffect(() => {
        getSubscriptions();
    }, []);

    const getSubscriptions = async () => {
        await TrainingService.get_all_subscription()
            .then(async (resp) => {
                if (resp.status !== 200) {
                    console.log({ resp });
                    return [];
                }
                return resp.json();
            })
            .then((subscriptionResp: ISubscription[]) => {
                console.log("the all subscription", subscriptionResp);
                const theSubscritions = subscriptionResp.map((_) => {
                    return { id: _.level_end, name: _.training_status };
                });
                setSubscription(theSubscritions);
            })
            .catch((err) => {
                console.log(
                    "error while gettting all trainings in editors:",
                    err
                );
            });
    };

    const handleChange = (event: DropDownListChangeEvent) => {
        console.log({ event });
        if (props.onChange) {
            props.onChange.call(undefined, { value: event.value });
        }
    };

    return (
        <DropDownList
            onChange={handleChange}
            value={subscription.find((p: any) => p.id === props.value)}
            data={subscription}
            dataItemKey={"id"}
            textField={"name"}
        />
    );
};

export const TreatmentEditor = (props: FieldProps) => {
    const handleChange = (event: DropDownListChangeEvent) => {
        if (props.onChange) {
            props.onChange.call(undefined, { value: event.value.value });
        }
    };

    return (
        <DropDownList
            onChange={handleChange}
            value={treatments.find((t: any) => t.value === props.value)}
            data={treatments}
            dataItemKey={"value"}
            textField={"text"}
        />
    );
};

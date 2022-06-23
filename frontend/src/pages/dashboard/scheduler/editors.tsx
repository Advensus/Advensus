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
import { useSubscriptionStore } from "../../../stores/subscription.store";

interface IItemDropDown {
    id: string;
    name: string;
}

// TRAINEES
export const TraineesList = (props: FieldProps) => {
    const [trainees, setTrainees] = React.useState<IItemDropDown[]>([]);
    const { users, trainee_schedule, updateViewTraineeSchedule } =
        useUsersStore();
    const { updateCurrentSubscriptions } = useSubscriptionStore();
    const { updateCurrentEdofTraining } = useTrainingsStore();

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
        // Get schdulde by trainee
        if (trainee_schedule) {
            const theTrainee = users.user.filter(
                (_) => _.username === trainee_schedule
            );
            const traineeDropdown = theTrainee.map((_) => {
                return { id: _.id, name: _.first_name + " " + _.username };
            });
            setTrainees(traineeDropdown);
        }
    }, [users, trainee_schedule]);

    const handleChange = (event: DropDownListChangeEvent) => {
        if (props.onChange) {
            props.onChange.call(undefined, { value: event.value.id });
            console.log("the selected trainee:", event.value);
            const selectedTrainee = users.user.filter(
                (_) => _.id === event.value.id
            );
            console.log("the selected trainee:", selectedTrainee[0].souscrirs);
            if (selectedTrainee[0].souscrirs) {
                updateCurrentSubscriptions(selectedTrainee[0].souscrirs);

                const subscribeIsTraining = selectedTrainee[0].souscrirs?.map(
                    (_) => _.formation
                );
                // let uniqueTrainings = [...new Set(subscribeIsTraining)];
                // let uniqueTrainings = subscribeIsTraining.filter(
                //     (value, index) => {
                //         return subscribeIsTraining.indexOf(value) === index;
                //     }
                // );
                let uniqueTrainings = removeDuplicateItem(subscribeIsTraining);
                console.log({ uniqueTrainings });
                updateCurrentEdofTraining(subscribeIsTraining);
                console.log({ subscribeIsTraining });
                console.log({ users });
            }
        }
    };

    function removeDuplicateItem(data: any) {
        return data.filter(
            (value: any, index: number) => data.indexOf(value) === index
        );
    }

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

// EDOF
export const EdofsList = (props: FieldProps) => {
    const [subscriptionsDrop, setSubscriptionsDrop] = React.useState<
        IItemDropDown[]
    >([]);
    const { subscriptions } = useSubscriptionStore();

    React.useEffect(() => {
        if (subscriptions) {
            const theSubscriptionDropdown = subscriptions.map((_) => {
                return { id: _.id, name: _.edof };
            });
            setSubscriptionsDrop(theSubscriptionDropdown);
        }
    }, [subscriptions]);

    const handleChange = (event: DropDownListChangeEvent) => {
        if (props.onChange) {
            props.onChange.call(undefined, { value: event.value.id });
        }
    };

    return (
        <DropDownList
            onChange={handleChange}
            value={subscriptionsDrop.find((p: any) => p.id === props.value)}
            data={subscriptionsDrop}
            dataItemKey={"id"}
            textField={"name"}
        />
    );
};

// TRAINING
export const TrainingEditor = (props: FieldProps) => {
    const [trainingsDrop, setTrainingsDrop] = React.useState<IItemDropDown[]>(
        []
    );
    const { trainingByEdof } = useTrainingsStore();

    React.useEffect(() => {
        if (trainingByEdof) {
            // if(trainingByEdof.length > 1){
            //     const filteredTrainings = trainingByEdof.filter((_) => )
            // }
            const theTrainings = trainingByEdof.map((_) => {
                return { id: _.id, name: _.intitule };
            });
            // const uniqueTrainings = [...new Set(theTrainings)];
            // const uniqueTrainings = theTrainings.filter(function (item, pos) {
            //     return theTrainings.indexOf(item) == pos;
            // });
            // if (theTrainings.length > 0) {
            //     let uniqueTrainings = theTrainings.filter((c, index) => {
            //         return theTrainings.indexOf(c) === index;
            //     });
            //     console.log({ uniqueTrainings });
            // }
            setTrainingsDrop(theTrainings);
        }
    }, [trainingByEdof]);
    const handleChange = (event: DropDownListChangeEvent) => {
        if (props.onChange) {
            props.onChange.call(undefined, { value: event.value.id });
        }
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

// FORMERS
export const FormerList = (props: FieldProps) => {
    const [formers, setFormers] = React.useState<IItemDropDown[]>([]);
    const { users } = useUsersStore();
    const { trainingByEdof } = useTrainingsStore();

    React.useEffect(() => {
        if (users && trainingByEdof) {
            const theFormers = users.user.filter(
                (_) => _.user_type === TEACHEAR
            );
            const formerOnce = theFormers.filter(
                (_) =>
                    _.competence &&
                    _.competence.map(
                        (skill) => skill.id === trainingByEdof[0].id
                    )
            );
            console.log({ formerOnce });
            const formersDropdown = formerOnce.map((_) => {
                return { id: _.id, name: _.first_name + " " + _.username };
            });
            setFormers(formersDropdown);
        }
    }, [users, trainingByEdof]);

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

// TITLE
export const TitleList = (props: FieldProps) => {
    const [formers, setFormers] = React.useState<IItemDropDown[]>([]);
    const { users } = useUsersStore();
    const { trainingByEdof } = useTrainingsStore();

    const arrayTitles = [
        { id: "1", name: "Test Oral" },
        { id: "2", name: "Cours 1" },
        { id: "3", name: "Cours 2" },
        { id: "4", name: "Examen Blanc" },
    ];

    const handleChange = (event: DropDownListChangeEvent) => {
        if (props.onChange) {
            props.onChange.call(undefined, { value: event.value.name });
        }
    };

    return (
        <DropDownList
            onChange={handleChange}
            value={arrayTitles.find((p: any) => p.id === props.value)}
            data={arrayTitles}
            dataItemKey={"id"}
            textField={"name"}
        />
    );
};

// // EDOF
// export const EdofList = (props: FieldProps) => {
//     const [subscription, setSubscription] = React.useState<IItemDropDown[]>([]);

//     React.useEffect(() => {
//         getSubscriptions();
//     }, []);

//     const getSubscriptions = async () => {
//         await TrainingService.get_all_subscription()
//             .then(async (resp) => {
//                 if (resp.status !== 200) {
//                     console.log({ resp });
//                     return [];
//                 }
//                 return resp.json();
//             })
//             .then((subscriptionResp: ISubscription[]) => {
//                 console.log("the all subscription", subscriptionResp);
//                 const theSubscritions = subscriptionResp.map((_) => {
//                     return { id: _.level_end, name: _.training_status };
//                 });
//                 setSubscription(theSubscritions);
//             })
//             .catch((err) => {
//                 console.log(
//                     "error while gettting all trainings in editors:",
//                     err
//                 );
//             });
//     };

//     const handleChange = (event: DropDownListChangeEvent) => {
//         console.log({ event });
//         if (props.onChange) {
//             props.onChange.call(undefined, { value: event.value });
//         }
//     };

//     return (
//         <DropDownList
//             onChange={handleChange}
//             value={subscription.find((p: any) => p.id === props.value)}
//             data={subscription}
//             dataItemKey={"id"}
//             textField={"name"}
//         />
//     );
// };

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

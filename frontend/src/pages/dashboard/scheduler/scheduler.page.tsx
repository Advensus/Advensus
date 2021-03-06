import React, { useEffect, useState } from "react";
import {
    Scheduler,
    AgendaView,
    TimelineView,
    DayView,
    WeekView,
    MonthView,
    SchedulerDataChangeEvent,
    SchedulerResource,
    SchedulerGroup,
    SchedulerHeader,
    SchedulerSlotProps,
    SchedulerSlot,
    SchedulerViewSlotProps,
    SchedulerViewSlot,
    SchedulerViewItemProps,
    SchedulerViewItem,
    SchedulerHeaderProps,
} from "@progress/kendo-react-scheduler";
import "@progress/kendo-theme-default/dist/all.css";
import { guid } from "@progress/kendo-react-common";

import { sampleData, displayDate, sampleDataWithResources } from "./events-utc";

import products from "./products.json";
import { CustomFooter } from "./custom-footer";
import { CustomHeader } from "./custom-header";
import { FormWithCustomEditor } from "./custom-form";
import {
    NewBookingDto,
    NewCoursesDto,
    ICourses,
    IBooking,
    IUser,
    SUPER_USER,
    TRAINEE,
    TEACHEAR,
    ISubscription,
} from "../../../lib";
import { useAuthStore } from "../../../stores";
import BookingService from "../../../services/booking.service";
import { useLocation } from "react-router-dom";
import TrainingFolderService from "../../../services/training-folder.service";

export interface ISchedulerPageProps {
    default_props?: boolean;
}

export interface finalBookingData {
    id: string;
    start: Date | string;
    end: Date | string;
    title: string;
    description: string;
    coursesId: string;
    personId: IUser;
    state: string;
    training: string;

    startTimezone: string | Date | null;
    endTimezone: string | Date | null;
    isAllDay: boolean;
    recurrenceRule: string;
    recurrenceId: string | null;
    recurrenceExceptions: string | null;
    ownerID: IUser;
}

const group: SchedulerGroup = {
    resources: ["Rooms", "Person"],
    orientation: "horizontal",
};

const resources: SchedulerResource[] = [
    {
        name: "Status",
        data: [
            { text: "En cours", value: 0, color: "green" },
            { text: "Annul??", value: 1, color: "green" },
            { text: "Termin??", value: 2, color: "blue" },
            { text: "Non effectu??", value: 3, color: "blue" },
        ],
        field: "status",
        valueField: "value",
        textField: "text",
        colorField: "color",
    },
    {
        name: "Tasks",
        data: [
            { text: "Meeting Room 101", value: 3, color: "green" },
            { text: "Meeting Room 201", value: 4, color: "blue" },
        ],
        field: "taskId",
        valueField: "value",
        textField: "text",
        colorField: "color",
    },
    {
        name: "Perso",
        data: [
            {
                text: "Peter",
                value: 1,
                color: "red",
            },
            {
                text: "Alex",
                value: 2,
                color: "yellow",
            },
        ],
        field: "personId",
        valueField: "value",
        textField: "text",
        colorField: "color",
    },
];

export const SchedulerConfigContext = React.createContext<{
    slotDuration: [number, Function];
    slotDivision: [number, Function];
    traineeDisplay: [string, Function];
    formerDisplay: [string, Function];
}>({
    slotDuration: [60, (_: any) => {}],
    slotDivision: [2, (_: any) => {}],
    traineeDisplay: ["Client2", (_: IUser) => {}],
    formerDisplay: ["Former2", (_: IUser) => {}],
});

export const SchedulerPage: React.FC<ISchedulerPageProps> = () => {
    const [slotDuration, setSlotDuration] = React.useState(60);
    const [slotDivision, setSlotDivision] = React.useState(2);
    const [traineeDisplay, setTraineeDisplay] = React.useState("client");
    const [formerDisplay, setFormerDisplay] = React.useState("former");
    const [bookingData, setBookingData] = useState<finalBookingData[]>([]);
    const [filteredDataBooking, setFilteredDataBooking] =
        useState<finalBookingData[]>(bookingData);
    const [incomingBooking, setIncomingBooking] = useState<IBooking>();
    const [searchPerson, setSearchPerson] = useState<string>("");
    const [data, setData] = React.useState<any[]>(bookingData);

    const { user } = useAuthStore();
    const { state }: any = useLocation();

    useEffect(() => {
        getAllBookings();
    }, [incomingBooking]);

    useEffect(() => {
        console.log({ bookingData });
    }, [bookingData]);

    useEffect(() => {
        if (state) {
            state.userInfos &&
                setSearchPerson(
                    state.userInfos.first_name + " " + state.userInfos.username
                );
        }
    }, [state]);

    useEffect(() => {
        const getEventByUser = searchPerson
            ? filterEventByUser(searchPerson)
            : bookingData;
        setFilteredDataBooking(getEventByUser);
    }, [bookingData, searchPerson]);

    const filterEventByUser = (searchTerm: string) => {
        console.log({ searchTerm });
        return bookingData.filter(
            (_) =>
                `${_.ownerID.first_name} ${_.ownerID.username}`.indexOf(
                    searchTerm
                ) !== -1 ||
                (_.personId != null &&
                    `${_.personId.first_name} ${_.personId.username}`.indexOf(
                        searchTerm
                    ) !== -1)
        );
    };

    const formattingDate = (fullDate: Date) => {
        if (fullDate)
            return (
                fullDate.getFullYear() +
                "-" +
                (fullDate.getMonth() + 1) +
                "-" +
                fullDate.getDate() +
                " " +
                fullDate.getHours() +
                ":" +
                fullDate.getMinutes() +
                ":" +
                fullDate.getSeconds()
            );
    };

    const currentYear = new Date().getFullYear();
    const parseAdjust = (eventDate: any) => {
        const date = new Date(eventDate);
        date.setFullYear(currentYear);
        return date;
    };

    const randomInt = (min: any, max: any) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    const getAllBookings = () => {
        BookingService.get_all_bookings()
            .then(async (resp) => {
                if (resp.status !== 200) {
                    console.log({ resp });
                    return [];
                }
                return resp.json();
            })
            .then((bookingsResp: IBooking[]) => {
                console.log("the all bookings", bookingsResp);
                const sampleBooking = bookingsResp.map((dataItem) => {
                    return {
                        id: dataItem.id,
                        start: parseAdjust(dataItem.start_date),
                        startTimezone: null,
                        end: parseAdjust(dataItem.end_date),
                        endTimezone: null,
                        isAllDay: false,
                        title: dataItem.title,
                        description: dataItem.description,
                        recurrenceRule: "",
                        recurrenceId: null,
                        recurrenceExceptions: null,
                        coursesId: dataItem.concerner.id,
                        ownerID: dataItem.concerner.superviser,
                        personId: dataItem.concerner.assister,
                        state: dataItem.status,
                        training: dataItem.concerner.lier.id,
                        // personId: randomInt(
                        //     dataItem.concerner,
                        //     dataItem.proposer
                        // ),
                    };
                });
                if (user.user_type === TRAINEE) {
                    const traineeBooking = sampleBooking.filter(
                        (_) =>
                            _.personId != null &&
                            `${_.personId.first_name} ${_.personId.username}`.indexOf(
                                user.first_name
                            ) !== -1
                    );
                    setBookingData(traineeBooking);
                } else if (user.user_type === TEACHEAR) {
                    const formerBooking = sampleBooking.filter(
                        (_) =>
                            `${_.ownerID.first_name} ${_.ownerID.username}`.indexOf(
                                user.first_name
                            ) !== -1
                    );
                    setBookingData(formerBooking);
                } else {
                    setBookingData(sampleBooking);
                }
            })
            .catch((err) => {
                console.log("error while gettting all trainings:", err);
            });
    };

    const getTrainingFolderByIsId = (id: string, value: NewBookingDto) => {
        TrainingFolderService.get_training_folder_by_id(id)
            .then(async (response) => {
                if (response.status !== 200) {
                    //@TODO #4
                    // alert('error getting users');
                    console.log("the error resp", response);
                    return [];
                }
                return response.json();
            })
            .then((folderResp: ISubscription) => {
                console.log("the founded trainin folder is:", folderResp.solde);
                console.log("values dans get by id:", value);

                const startedHour = value.start?.getHours();
                const startedMin = value.start ? value.start?.getMinutes() : 0;

                const endedHour = value.end?.getHours();
                const endedMin = value.end ? value.end.getMinutes() : 0;
                const nberHour =
                    endedHour && startedHour ? endedHour - startedHour : 0;

                const nberMin =
                    startedMin > endedMin
                        ? startedMin - endedMin
                        : endedMin - startedMin;

                // MANAGEMENT OF THE BALANCE BEFORE ADD NEW SCHEDULE
                if (nberHour === 0) {
                    if (nberMin === 0) {
                        console.log("Op??ration impossible!!!");
                    } else {
                        console.log("on soustrais des min de ancien solde");
                        const newBalanceWithMinutes =
                            parseInt(folderResp.solde) - 1 + ":" + nberMin;
                        folderResp.solde = newBalanceWithMinutes;
                    }
                } else if (nberHour === 1) {
                    if (nberMin === 0) {
                        console.log("on soustrait juste 1h de anciene solde");
                        const newBalance =
                            parseInt(folderResp.solde) - nberHour;
                        folderResp.solde = newBalance.toString();
                    } else {
                        console.log("on soustrait uniquement les minutes ");
                        const newBalanceWithMinutes =
                            parseInt(folderResp.solde) -
                            nberHour +
                            ":" +
                            nberMin;
                        folderResp.solde = newBalanceWithMinutes;
                    }
                } else {
                    if (nberMin === 0) {
                        console.log("on soustrait juste le nombre heure");
                        const newBalance =
                            parseInt(folderResp.solde) - nberHour;
                        folderResp.solde = newBalance.toString();
                    } else {
                        console.log(
                            "on soustrait heure et minute sur ancien solde "
                        );
                        const newBalance =
                            parseInt(folderResp.solde) - nberHour;
                        const newBalanceWithMinutes =
                            newBalance - 1 + ":" + nberMin;
                        folderResp.solde = newBalanceWithMinutes;
                    }
                }
                if (parseInt(folderResp.solde) > 0) {
                    const theStart = value.start && formattingDate(value.start);
                    const theEnd = value.end && formattingDate(value.end);
                    theStart &&
                        theEnd &&
                        addNewCourses(value, theStart, theEnd); // after v??rification we can add new
                    editTrainingFolderBalance(folderResp.id, folderResp);
                } else {
                    console.log(
                        "Impossible d'ajouter une nouvelle r??servation!!!"
                    );
                }
            })
            .catch((err) => {
                console.log("error while getting taining folder by id", err);
            });
    };

    const editTrainingFolderBalance = (id: string, values: ISubscription) => {
        console.log({ values });
        TrainingFolderService.edit_training_folder_balance(id, values)
            .then(async (response) => {
                if (response.status !== 200) {
                    //@TODO #4
                    // alert("Error editing product");
                    return;
                }
                const editedFolder = (await response.json()) as ISubscription;
                console.log("The modif made:", editedFolder);
                return editedFolder;
            })
            .catch((err) => {
                //@TODO #4
                console.log("Error while editing training folder:", err);
            });
    };

    const addNewBooking = (
        val: NewBookingDto,
        dateStart: string,
        dateEnd: string
    ) => {
        console.log({ dateStart });
        console.log({ dateEnd });
        if (user.user_type === TRAINEE) {
            val.proposer = val.assister;
        } else {
            val.proposer = null;
        }
        val.reserver = [user.id];
        val.status = "En cours";

        console.log("a la recherche de edof", val.proposer);
        // const theBooking = bookingData.find((_) => _.)

        val.start_date = dateStart;
        val.end_date = dateEnd;
        console.log({ val });
        BookingService.add_new_booking(val)
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log({ response });
                }
                const data = (await response.json()) as IBooking;
                console.log("the current adding booking:", data);
                setIncomingBooking(data);
                // onCreate(data);
            })
            .catch((err) => {
                console.log("error while adding new booking:", err);
            });
    };

    const addNewCourses = (
        value: NewBookingDto,
        start: string,
        end: string
    ) => {
        console.log({ value });

        BookingService.create_new_courses(value)
            .then(async (response) => {
                if (response.status !== 200) {
                    console.log({ response });
                }
                const data = (await response.json()) as ICourses;
                console.log("the current adding courses:", data);
                value.concerner = data.id;
                addNewBooking(value, start, end);
                // onCreate(data);
            })
            .catch((err) => {
                console.log("error while adding new courses:", err);
            });
    };

    const editBooking = (id: string, val: NewBookingDto) => {
        console.log("the booking id to edit:", id);
        console.log({ val });
        BookingService.edit_booking(id, val)
            .then(async (response) => {
                if (response.status !== 200) {
                    //@TODO #4
                    // alert("Error editing product");
                    return;
                }
                const booking = (await response.json()) as IBooking;
                console.log("The modif:", booking);
                // props.onCreate(product);
                setIncomingBooking(booking);
                return booking;
            })
            .catch((err) => {
                //@TODO #4
                console.log("Error while editing booking:", err);
            });
    };

    const handleDataChange = ({ created, updated, deleted }: any) => {
        // console.log({ updated, created, deleted });
        // console.log({ deleted });
        setData((old) =>
            old
                // Filter the deleted items
                .filter((item) => {
                    deleted.find((current: any) => {
                        console.log("dand le deleted:", current);
                    });
                    console.log({ item });
                })
                // Find and replace the updated items
                .map((_) => {
                    console.log({ _ });
                    updated.find((current: any) => console.log({ current }));
                })
                // .concat(
                //     // updated.find((current) => current.id === item.id) ||
                //     // item
                //     console.log({ updated }),
                //     updated.find((bookingToEdit) => {
                //         const Start_Date = formattingDate(bookingToEdit.start);
                //         const End_Date = formattingDate(bookingToEdit.end);
                //         const updatedDataBooking: NewBookingDto = {
                //             title: bookingToEdit.title,
                //             description: bookingToEdit.description,
                //             status: bookingToEdit.state,
                //             start_date: Start_Date,
                //             end_date: End_Date,
                //             reserver: [user.id],
                //             concerner: bookingToEdit.coursesId,
                //             superviser:
                //                 bookingToEdit.ownerID &&
                //                 bookingToEdit.ownerID.id,
                //             // assister: bookingToEdit.personId != null && bookingToEdit.personId.id,
                //         };

                //         const formerProgrammedTimeUpdated = bookingData.map(
                //             (_) => {
                //                 if (
                //                     _.ownerID.id ===
                //                     `${updatedDataBooking.superviser}`
                //                 ) {
                //                     const dateStart = formattingDate(
                //                         _.start as Date
                //                     );
                //                     const dateEnd = formattingDate(
                //                         _.end as Date
                //                     );
                //                     return `${dateStart}/${dateEnd}`;
                //                 } else {
                //                     return null;
                //                 }
                //             }
                //         );

                //         const rangeTimeUpdated = `${updatedDataBooking.start_date}/${updatedDataBooking.end_date}`;
                //         const formerAvailabilityUpdated =
                //             formerProgrammedTimeUpdated.includes(
                //                 rangeTimeUpdated
                //             );

                //         // MANAGEMENT OF THE DISPONIBILITY OF TRAINEE
                //         const traineeProgrammedTimeUpdated = bookingData.map(
                //             (_) => {
                //                 if (
                //                     _.personId.id ===
                //                     `${bookingToEdit.personId.id}`
                //                 ) {
                //                     const dateStart = formattingDate(
                //                         _.start as Date
                //                     );
                //                     const dateEnd = formattingDate(
                //                         _.end as Date
                //                     );
                //                     return `${dateStart}/${dateEnd}`;
                //                 } else {
                //                     return null;
                //                 }
                //             }
                //         );

                //         const traineeAvailabilityUpdated =
                //             traineeProgrammedTimeUpdated.includes(
                //                 rangeTimeUpdated
                //             );

                //         if (
                //             formerAvailabilityUpdated &&
                //             traineeAvailabilityUpdated
                //         ) {
                //             // USERS ARE UNAVAILABLE
                //             console.log("USERS ARE UNAVAILABLE");
                //         } else if (formerAvailabilityUpdated) {
                //             // FORMER IS UNAVAILABLE
                //             console.log("FORMER IS UNAVAILABLE");
                //         } else if (traineeAvailabilityUpdated) {
                //             // TRAINEE IS UNAVAILABLE
                //             console.log("TRAINEE IS UNAVAILABLE");
                //         } else {
                //             // USERS ARE AVAILABLE
                //             console.log("USERS ARE AVAILABLE");
                //             if (
                //                 user.user_type != TRAINEE &&
                //                 user.user_type != TEACHEAR
                //             ) {
                //                 editBooking(
                //                     bookingToEdit.id,
                //                     updatedDataBooking
                //                 );
                //             }
                //         }
                //     })
                // )
                // Add the newly created items and assign an `id`.
                .concat(
                    created.map((booking: NewBookingDto) => {
                        // MANAGEMENT OF THE DISPONIBILITY OF TRAINER
                        console.log({ bookingData });
                        console.log("id du superviseur", booking.superviser);
                        const formerProgrammedTime = bookingData.map((_) => {
                            if (_.ownerID.id === `${booking.superviser}`) {
                                const dateStart = formattingDate(
                                    _.start as Date
                                );
                                const dateEnd = formattingDate(_.end as Date);
                                return `${dateStart}/${dateEnd}`;
                            } else {
                                return null;
                            }
                        });
                        // Formating the dates
                        const incomingBookingStart = formattingDate(
                            booking.start as Date
                        );
                        const incomingBookingEnd = formattingDate(
                            booking.end as Date
                        );
                        const rangeTime = `${incomingBookingStart}/${incomingBookingEnd}`;
                        const formerAvailability =
                            formerProgrammedTime.includes(rangeTime);

                        // MANAGEMENT OF THE DISPONIBILITY OF TRAINEE
                        const traineeProgrammedTime = bookingData.map((_) => {
                            if (_.personId.id === `${booking.assister}`) {
                                const dateStart = formattingDate(
                                    _.start as Date
                                );
                                const dateEnd = formattingDate(_.end as Date);
                                return `${dateStart}/${dateEnd}`;
                            } else {
                                return null;
                            }
                        });

                        console.log({ traineeProgrammedTime });
                        const traineeAvailability =
                            traineeProgrammedTime.includes(rangeTime);
                        console.log({ traineeAvailability });
                        if (formerAvailability && traineeAvailability) {
                            // USERS ARE UNAVAILABLE
                            console.log("USERS ARE UNAVAILABLE");
                        } else if (formerAvailability) {
                            // FORMER IS UNAVAILABLE
                            console.log("FORMER IS UNAVAILABLE");
                        } else if (traineeAvailability) {
                            // TRAINEE IS UNAVAILABLE
                            console.log("TRAINEE IS UNAVAILABLE");
                        } else {
                            // USERS ARE AVAILABLE
                            console.log("USERS ARE AVAILABLE");
                            booking.proposer &&
                                getTrainingFolderByIsId(
                                    booking.proposer,
                                    booking
                                );
                        }
                    })
                )
        );
    };

    const displayCustomHeader =
        user.user_type === SUPER_USER
            ? (props: React.PropsWithChildren<SchedulerHeaderProps>) => (
                  <CustomHeader
                      {...props}
                      displayEventByResource={(id: string) => {
                          setSearchPerson(id);
                      }}
                  />
              )
            : undefined;

    const editableHandle =
        user.user_type === TEACHEAR || user.user_type === TRAINEE
            ? false
            : true;
    return (
        <div className="scheduler_container">
            <SchedulerConfigContext.Provider
                value={{
                    slotDuration: [slotDuration, setSlotDuration],
                    slotDivision: [slotDivision, setSlotDivision],
                    traineeDisplay: [traineeDisplay, setTraineeDisplay],
                    formerDisplay: [formerDisplay, setFormerDisplay],
                }}
            >
                <Scheduler
                    resources={resources}
                    // data={sampleDataWithResources}
                    data={filteredDataBooking}
                    defaultDate={displayDate}
                    form={FormWithCustomEditor}
                    header={displayCustomHeader}
                    // className="scheduler_body"
                    id="scheduler_body"
                    height={"100%"}
                    timezone={"Etc/UTC"}
                    viewItem={CustomViewItem}
                    onDataChange={handleDataChange}
                    editable={{
                        add: true,
                        remove: editableHandle,
                        drag: editableHandle,
                        resize: editableHandle,
                        select: editableHandle,
                        edit: editableHandle,
                    }}
                    footer={(props) => <CustomFooter {...props} />}
                    // slot={CustomSlot}
                    viewSlot={CustomViewSlot}
                >
                    <AgendaView
                        slotDivisions={slotDivision}
                        slotDuration={slotDuration}
                    />
                    <TimelineView
                        slotDivisions={slotDivision}
                        slotDuration={slotDuration}
                    />
                    <DayView
                        slotDivisions={slotDivision}
                        slotDuration={slotDuration}
                    />
                    <WeekView
                        slotDivisions={slotDivision}
                        slotDuration={slotDuration}
                    />
                    <MonthView
                        slotDivisions={slotDivision}
                        slotDuration={slotDuration}
                    />
                </Scheduler>
            </SchedulerConfigContext.Provider>
        </div>
    );
};

const CustomSlot = (props: SchedulerSlotProps) => (
    <SchedulerSlot
        {...props}
        style={{
            ...props.style,
            height: "60px",
        }}
    />
);

export const CustomViewSlot = (props: SchedulerViewSlotProps) => {
    return (
        <SchedulerViewSlot
            {...props}
            style={{
                ...props.style,
                minHeight: 80,
                maxHeight: 120,
            }}
        />
    );
};

export const CustomViewItem = (props: SchedulerViewItemProps) => {
    let myCustomTitle = `${props.dataItem.title} | Formateur: ${props.dataItem.ownerID.username} | Stagiaire: ${props.dataItem.personId.username}`;

    return <SchedulerViewItem {...props} title={myCustomTitle} />;
};

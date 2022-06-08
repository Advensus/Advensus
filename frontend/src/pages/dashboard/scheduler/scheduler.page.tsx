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
} from "../../../lib";
import { useAuthStore } from "../../../stores";
import BookingService from "../../../services/booking.service";

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
            { text: "Annulé", value: 1, color: "green" },
            { text: "Terminé", value: 2, color: "blue" },
            { text: "Non effectué", value: 3, color: "blue" },
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
    const [data, setData] = React.useState<any[]>(sampleData);
    const [slotDuration, setSlotDuration] = React.useState(60);
    const [slotDivision, setSlotDivision] = React.useState(2);
    const [traineeDisplay, setTraineeDisplay] = React.useState("client");
    const [formerDisplay, setFormerDisplay] = React.useState("former");
    const [bookingData, setBookingData] = useState<finalBookingData[]>([]);
    const [filteredDataBooking, setFilteredDataBooking] =
        useState<finalBookingData[]>(bookingData);
    const [incomingBooking, setIncomingBooking] = useState<IBooking>();
    const [searchPerson, setSearchPerson] = useState<string>("");

    const { user } = useAuthStore();

    useEffect(() => {
        getAllBookings();
    }, [incomingBooking]);

    useEffect(() => {
        console.log({ bookingData });
    }, [bookingData]);

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
                        // personId: randomInt(
                        //     dataItem.concerner,
                        //     dataItem.proposer
                        // ),
                    };
                });
                setBookingData(sampleBooking);
            })
            .catch((err) => {
                console.log("error while gettting all trainings:", err);
            });
    };

    const addNewBooking = (
        val: NewBookingDto,
        dateStart: string,
        dateEnd: string
    ) => {
        console.log({ dateStart });
        console.log({ dateEnd });
        val.reserver = [user.id];

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

    const handleDataChange = ({
        created,
        updated,
        deleted,
    }: SchedulerDataChangeEvent) => {
        console.log({ updated, created, deleted });
        setData((old) =>
            old
                // Filter the deleted items
                .filter(
                    (item) =>
                        deleted.find((current) => current.id === item.id) ===
                        undefined
                )
                // Find and replace the updated items
                .map(
                    (item) =>
                        updated.find((current) => current.id === item.id) ||
                        item
                )
                // Add the newly created items and assign an `id`.
                .concat(
                    created.map((booking) => {
                        // Object.assign({}, item, { id: guid() })
                        console.log({ booking });
                        console.log("le test booiking:", booking.start);
                        const theStart =
                            booking.start.getFullYear() +
                            "-" +
                            (booking.start.getMonth() + 1) +
                            "-" +
                            booking.start.getDate() +
                            " " +
                            booking.start.getHours() +
                            ":" +
                            booking.start.getMinutes() +
                            ":" +
                            booking.start.getSeconds();

                        const theEnd =
                            booking.end.getFullYear() +
                            "-" +
                            (booking.end.getMonth() + 1) +
                            "-" +
                            booking.end.getDate() +
                            " " +
                            booking.end.getHours() +
                            ":" +
                            booking.end.getMinutes() +
                            ":" +
                            booking.end.getSeconds();
                        addNewCourses(booking, theStart, theEnd);
                    })
                )
        );
    };

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
                    // group={group}
                    resources={resources}
                    // data={sampleDataWithResources}
                    data={filteredDataBooking}
                    defaultDate={displayDate}
                    form={FormWithCustomEditor}
                    header={(props) => (
                        <CustomHeader
                            {...props}
                            displayEventByResource={(id: string) => {
                                // filterByResources(id);
                                setSearchPerson(id);
                            }}
                        />
                    )}
                    // className="scheduler_body"
                    id="scheduler_body"
                    height={"100%"}
                    onDataChange={handleDataChange}
                    editable={{
                        add: true,
                        remove: true,
                        drag: true,
                        resize: true,
                        select: true,
                        edit: true,
                    }}
                    footer={(props) => <CustomFooter {...props} />}
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

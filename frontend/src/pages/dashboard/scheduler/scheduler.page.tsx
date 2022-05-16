import React from "react";
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
import { FormWithAdditionalValidation } from "./custom-form";

export interface ISchedulerPageProps {
    default_props?: boolean;
}

const group: SchedulerGroup = {
    resources: ["Rooms", "Person"],
    orientation: "horizontal",
};

const resources: SchedulerResource[] = [
    {
        name: "Rooms",
        data: [
            { text: "Meeting Room 101", value: 1, color: "#5392E4" },
            { text: "Meeting Room 201", value: 2, color: "#FF7272" },
        ],
        field: "roomId",
        valueField: "value",
        textField: "text",
        colorField: "color",
    },
    {
        name: "Persons",
        data: [
            {
                text: "Peter",
                value: 1,
                color: "#5392E4",
            },
            {
                text: "Alex",
                value: 2,
                color: "#54677B",
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
    traineeDisplay: ["Client2", (_: any) => {}],
    formerDisplay: ["Former2", (_: any) => {}],
});

export const SchedulerPage: React.FC<ISchedulerPageProps> = () => {
    const [data, setData] = React.useState<any[]>(sampleData);
    const [fiteredData, setFilteredData] = React.useState<any[]>(sampleData);
    const [slotDuration, setSlotDuration] = React.useState(60);
    const [slotDivision, setSlotDivision] = React.useState(2);
    const [traineeDisplay, setTraineeDisplay] = React.useState("client");
    const [formerDisplay, setFormerDisplay] = React.useState("former");

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
                    created.map((item) =>
                        // Object.assign({}, item, { id: guid() })
                        console.log({ item })
                    )
                )
        );
    };

    const filterByResources = (perso: string) => {
        const filterData = sampleDataWithResources.filter(
            (_) => _.personId === perso
        );
        setFilteredData(filterData);
        console.log({ perso });
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
                    data={fiteredData ? fiteredData : sampleDataWithResources}
                    defaultDate={displayDate}
                    form={FormWithAdditionalValidation}
                    header={(props) => (
                        <CustomHeader
                            {...props}
                            displayEventByResource={(id: string) =>
                                filterByResources(id)
                            }
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

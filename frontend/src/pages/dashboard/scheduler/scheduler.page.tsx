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

import { sampleData, displayDate } from "./events-utc";

import products from "./products.json";

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

export const SchedulerPage: React.FC<ISchedulerPageProps> = () => {
    const [data, setData] = React.useState<any[]>(sampleData);

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

    return (
        <div className="scheduler_container">
            <Scheduler
                // group={group}
                resources={resources}
                data={sampleData}
                defaultDate={displayDate}
                header={(props) => <SchedulerHeader {...props} />}
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
            >
                <AgendaView />
                <TimelineView />
                <DayView />
                <WeekView />
                <MonthView />
            </Scheduler>
        </div>
    );
};

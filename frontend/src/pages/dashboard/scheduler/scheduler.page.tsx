import React from "react";
import {
    Scheduler,
    AgendaView,
    TimelineView,
    DayView,
    WeekView,
    MonthView,
} from "@progress/kendo-react-scheduler";
import "@progress/kendo-theme-default/dist/all.css";

import { sampleData, displayDate } from "./events-utc";

import products from "./products.json";

export interface ISchedulerPageProps {
    default_props?: boolean;
}

export const SchedulerPage: React.FC<ISchedulerPageProps> = () => {
    return (
        <div className="scheduler_container">
            <Scheduler
                data={sampleData}
                defaultDate={displayDate}
                // className="scheduler_body"
                id="scheduler_body"
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

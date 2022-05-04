import React from "react";

export interface ISchedulerPageProps {
    default_props?: boolean;
}

export const SchedulerPage: React.FC<ISchedulerPageProps> = () => {
    return <div className="scheduler_container">Scheduler here</div>;
};

import React from "react";
// import { RouteProps } from "react-router";

export interface ISchedulerPageProps {
    default_props?: boolean;
}

export const SchedulerPage: React.FC<ISchedulerPageProps> = () => {
    return (
        <div className="scheduler_container">
            hello world from scheduler page
        </div>
    );
};

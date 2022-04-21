import React, { useState } from "react";

export interface IStatisticsProps {
    default_props?: boolean;
}

export const StatisticsComponent: React.FC<IStatisticsProps> = () => {
    return <div>hello world from Statistics component</div>;
};

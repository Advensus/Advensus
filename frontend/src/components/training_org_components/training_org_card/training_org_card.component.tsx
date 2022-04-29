import React, { useState } from "react";

export interface ITrainingOrganizationCardProps {
    default_props?: boolean;
}

export const TrainingOrganizationCardComponent: React.FC<
    ITrainingOrganizationCardProps
> = () => {
    return <div>hello world from TrainingOrganizationCard component</div>;
};

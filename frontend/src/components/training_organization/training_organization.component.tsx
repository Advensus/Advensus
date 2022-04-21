import React, { useState } from "react";

export interface ITrainingOrganizationProps {
    default_props?: boolean;
}

export const TrainingOrganizationComponent: React.FC<
    ITrainingOrganizationProps
> = () => {
    return <div>hello world from TrainingOrganization component</div>;
};

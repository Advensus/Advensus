import React, { useState } from "react";

export interface IRpFormProps {
    default_props?: boolean;
}

export const RpFormComponent: React.FC<IRpFormProps> = () => {
    return <div>hello world from RpForm component</div>;
};

import React, { useState } from "react";

export interface ISettingsProps {
    default_props?: boolean;
}

export const SettingsComponent: React.FC<ISettingsProps> = () => {
    return <div>hello world from Settings component</div>;
};

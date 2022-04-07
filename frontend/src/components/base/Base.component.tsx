import React, { useState } from "react";

export interface IBaseProps {
    default_props?: boolean;
}

export const BaseComponent: React.FC<IBaseProps> = () => {
    return <div>hello world from base component</div>;
};

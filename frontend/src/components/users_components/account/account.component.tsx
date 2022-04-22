import React, { useState } from "react";

export interface IAccountProps {
    default_props?: boolean;
}

export const AccountComponent: React.FC<IAccountProps> = () => {
    return <div>hello world from Account component</div>;
};

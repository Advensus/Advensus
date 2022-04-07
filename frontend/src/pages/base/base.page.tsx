import React from "react";
// import { RouteProps } from "react-router";

export interface IBasePageProps {
    default_props?: boolean;
}

export const BasePage: React.FC<IBasePageProps> = () => {
    return <div>hello world</div>;
};

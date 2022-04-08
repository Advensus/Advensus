import React from "react";
// import { RouteProps } from "react-router";

export interface ILoginPageProps {
    default_props?: boolean;
}

export const LoginPage: React.FC<ILoginPageProps> = () => {
    return <div>hello world from login page</div>;
};

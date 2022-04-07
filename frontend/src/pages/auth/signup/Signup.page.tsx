import React from "react";
// import { RouteProps } from "react-router";

export interface ISignupPageProps {
    default_props?: boolean;
}

export const SignupPage: React.FC<ISignupPageProps> = () => {
    return <div>hello world from sign up page</div>;
};

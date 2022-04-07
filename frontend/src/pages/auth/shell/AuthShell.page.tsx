import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, SignupPage } from "../../";

export interface IAuthShellPageProps {
    default_props?: boolean;
}

export const AuthShellPage: React.FC<IAuthShellPageProps> = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="*" element={<Navigate to="login" />} />
        </Routes>
    );
};

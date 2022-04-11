import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage, AuthShellPage, DashboardShellPage } from "..";
// import { RouteProps } from "react-router";

export interface IEntryRoutesPageProps {
    default_props?: boolean;
}

export const EntryRoutesPage: React.FC<IEntryRoutesPageProps> = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="auth/*" element={<AuthShellPage />} />
            <Route path="dashboard/*" element={<DashboardShellPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

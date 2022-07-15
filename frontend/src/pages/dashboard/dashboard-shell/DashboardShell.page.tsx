import { Text } from "@fluentui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
    CustomModalComponent,
    HeaderDashboardComponent,
    SideNavComponent,
} from "../../../components";
import { useUserRouteHooks } from "../../../hooks";
import { IDocument, TRAINEE } from "../../../lib";
import { prefixer } from "../../../services/urls";
import { useAuthStore } from "../../../stores";

export interface IDashboardShellPageProps {
    default_props?: boolean;
}

export const DashboardShellPage: React.FC<IDashboardShellPageProps> = () => {
    const accessRoutes = useUserRouteHooks();
    const { user } = useAuthStore();

    const [handleShowDocsToSign, setHandleShowDocsToSign] =
        useState<boolean>(false);
    const [docs, setDocs] = useState<IDocument[]>([]);

    useEffect(() => {
        if (user.user_type === TRAINEE) {
            user.appartenir_content_type.map((_) => {
                _.sign != null
                    ? setHandleShowDocsToSign(false)
                    : setHandleShowDocsToSign(true);
            });
            setDocs(user.appartenir_content_type);
        }
    }, [user]);

    return (
        <main className="dashboard_shell_container">
            <HeaderDashboardComponent />
            <div className="dashboard_shell_content">
                <div id="sidenav_panel" aria-disabled={true}>
                    <SideNavComponent />
                </div>
                <section id="section">
                    <Routes>
                        {accessRoutes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<route.component />}
                            />
                        ))}
                    </Routes>
                    {handleShowDocsToSign ? (
                        <div style={{ margin: "10px" }}>
                            <Text
                                style={{
                                    fontWeight: "bolder",
                                    color: "#fff",
                                }}
                                variant="large"
                            >
                                Documents à signer
                            </Text>
                            <div>
                                {docs.length &&
                                    docs.map((_) => (
                                        <CustomModalComponent
                                            key={_.id}
                                            currentDoc={_}
                                            fileName={_.path.substring(
                                                _.path.indexOf("t") + 3
                                            )}
                                            filePath={
                                                prefixer +
                                                _.path.substring(
                                                    _.path.indexOf("a") + 1
                                                )
                                            }
                                        />
                                    ))}
                            </div>
                        </div>
                    ) : null}
                </section>
            </div>
        </main>
    );
};

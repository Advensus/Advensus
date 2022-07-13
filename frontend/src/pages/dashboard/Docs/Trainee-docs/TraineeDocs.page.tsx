import { ActionButton, Separator, Text } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import {
    CustomModalComponent,
    ReactPdfCustomComponent,
} from "../../../../components";
import { IDocument } from "../../../../lib";
import { prefixer } from "../../../../services/urls";
import { useAuthStore } from "../../../../stores";
import { Viewer } from "@react-pdf-viewer/core";
// import signiiing from '../../../../../../Backend/signing/Cv_Rolk.pdf'

export interface ITraineeDocsPageProps {
    default_props?: boolean;
}

export const TraineeDocsPage: React.FC<ITraineeDocsPageProps> = () => {
    const { user } = useAuthStore();

    const [showAdminDocs, setShowAdminDocs] = useState<boolean>(false);
    const [showTrainingDocs, setShowTrainingDocs] = useState<boolean>(false);
    const [docs, setDocs] = useState<IDocument[]>([]);

    useEffect(() => {
        console.log("le current user:", user.appartenir_content_type);
        if (user) {
            setDocs(user.appartenir_content_type);
        }
    }, [user]);

    return (
        <div className="trainee_docs_container">
            <div className="trainee_docs_box">
                <div className="trainee_docs_box_header">
                    <Text variant="medium" style={{ fontWeight: "bolder" }}>
                        Mes documents
                    </Text>
                </div>
                <div className="trainee_docs_box_body">
                    <Separator />
                    <div className="trainee_docs_box_body_content">
                        {showAdminDocs ? (
                            <div className="trainee_docs_body_items">
                                <Text variant="large">Documents Admin</Text>
                                {docs.length &&
                                    docs.map((_) =>
                                        // <ReactPdfCustomComponent
                                        //     key={_.id}
                                        //     pdfDoc={_}
                                        // />

                                        _.doc_categorie === "Admin_doc" ? (
                                            <div
                                                key={_.id}
                                                className="trainee_docs_items_container"
                                            >
                                                <CustomModalComponent
                                                    currentDoc={_}
                                                    fileName={_.path.substring(
                                                        _.path.indexOf("t") + 3
                                                    )}
                                                    filePath={
                                                        prefixer +
                                                        _.path.substring(
                                                            _.path.indexOf(
                                                                "a"
                                                            ) + 1
                                                        )
                                                    }
                                                />
                                            </div>
                                        ) : null
                                    )}
                                <ActionButton
                                    onClick={() => setShowAdminDocs(false)}
                                >
                                    <Text
                                        variant="mediumPlus"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        Retour
                                    </Text>
                                </ActionButton>
                            </div>
                        ) : (
                            <div
                                onClick={() => {
                                    setShowAdminDocs(true);
                                }}
                                className="trainee_docs_box_body_content_action"
                            >
                                <Text
                                    variant="mediumPlus"
                                    style={{
                                        fontWeight: "bold",
                                        color: "#fff",
                                    }}
                                >
                                    Vos documents administratifs
                                </Text>
                            </div>
                        )}
                        {showTrainingDocs ? (
                            <div className="trainee_docs_body_items">
                                <div>Training docs</div>
                                {docs.length &&
                                    docs.map((_) =>
                                        _.doc_categorie === "Training_doc" ? (
                                            <div
                                                key={_.id}
                                                className="trainee_docs_items_container"
                                            >
                                                <CustomModalComponent
                                                    currentDoc={_}
                                                    fileName={_.path.substring(
                                                        _.path.indexOf("t") + 3
                                                    )}
                                                    filePath={
                                                        prefixer +
                                                        _.path.substring(
                                                            _.path.indexOf(
                                                                "a"
                                                            ) + 1
                                                        )
                                                    }
                                                />
                                            </div>
                                        ) : null
                                    )}
                                <ActionButton
                                    onClick={() => setShowTrainingDocs(false)}
                                >
                                    <Text
                                        variant="mediumPlus"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        Retour
                                    </Text>
                                </ActionButton>
                            </div>
                        ) : (
                            <div
                                onClick={() => setShowTrainingDocs(true)}
                                className="trainee_docs_box_body_content_action"
                            >
                                <Text
                                    variant="mediumPlus"
                                    style={{
                                        fontWeight: "bold",
                                        color: "#fff",
                                    }}
                                >
                                    Vos documents de formation
                                </Text>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

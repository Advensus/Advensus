import { Separator, Text } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { ReactPdfCustomComponent } from "../../../../components";
import { IDocument } from "../../../../lib";
import { prefixer } from "../../../../services/urls";
import { useAuthStore } from "../../../../stores";

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
                            <div>
                                <div>The admin docs</div>
                                {docs.length &&
                                    docs.map((_) => (
                                        // <ReactPdfCustomComponent
                                        //     key={_.id}
                                        //     pdfDoc={_}
                                        // />
                                        <div key={_.id}>
                                            <div>{_.doc_categorie}</div>
                                            <div>{_.path}</div>
                                            <div>{_.sign}</div>
                                            {/* <embed
                                                src={prefixer + _.sign}
                                                type="application/pdf"
                                                width="800"
                                                height="500"
                                            /> */}
                                            {/* <embed
                                                 src={
                                                     prefixer  + _.path
                                                 }
                                                 type="application/pdf"
                                                 // width="800"
                                                 // height="500"
                                             /> */}
                                            {/* <iframe
                                                src={prefixer + _.sign}
                                                // type="application/pdf"
                                                frameBorder="0"
                                                allowFullScreen
                                            ></iframe> */}
                                            <object
                                                data={prefixer + _.sign}
                                                type="application/pdf"
                                            >
                                                <iframe
                                                    src={`https://docs.google.com/viewer?url=${
                                                        prefixer + _.sign
                                                    }&embedded=true`}
                                                ></iframe>
                                            </object>
                                        </div>
                                    ))}
                                <div onClick={() => setShowAdminDocs(false)}>
                                    Retour
                                </div>
                            </div>
                        ) : (
                            <div
                                onClick={() => setShowAdminDocs(true)}
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
                            <div>
                                <div>Training docs</div>
                                <div onClick={() => setShowTrainingDocs(false)}>
                                    Retour
                                </div>
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

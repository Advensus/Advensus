import { Separator, Text } from "@fluentui/react";
import React from "react";

export interface ITraineeDocsPageProps {
    default_props?: boolean;
}

export const TraineeDocsPage: React.FC<ITraineeDocsPageProps> = () => {
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
                        <div className="trainee_docs_box_body_content_action">
                            <Text
                                variant="mediumPlus"
                                style={{ fontWeight: "bold", color: "#fff" }}
                            >
                                Vos documents administratifs
                            </Text>
                        </div>
                        <div className="trainee_docs_box_body_content_action">
                            <Text
                                variant="mediumPlus"
                                style={{ fontWeight: "bold", color: "#fff" }}
                            >
                                Vos documents de formation
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

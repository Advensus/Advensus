import { Separator, Text } from "@fluentui/react";
import React from "react";
// import { RouteProps } from "react-router";

export interface ILevelTestPageProps {
    default_props?: boolean;
}

export const LevelTestPage: React.FC<ILevelTestPageProps> = () => {
    return (
        <div className="level_test_container">
            <div className="level_test_box">
                <div className="level_test_box_header">
                    <Text variant="medium" style={{ fontWeight: "bolder" }}>
                        Testez votre niveau
                    </Text>
                </div>
                <div className="level_test_box_body">
                    <Separator />
                    <div className="level_test_body_head">
                        <Text
                            style={{
                                fontWeight: "bold",
                            }}
                        >
                            Ces tests vont nous permettre de mieux définir vos
                            besoins afin de mieux vous orienter vers une
                            progression optimale. Choisissez ci-dessous le test
                            de votre choix :
                        </Text>
                    </div>
                    <div>
                        <div className="level_test_body_action">
                            <Text style={{ fontWeight: "bold", color: "#fff" }}>
                                Test Écrit <br /> (Test En Ligne)
                            </Text>
                        </div>
                        <div className="level_test_body_action">
                            <Text style={{ fontWeight: "bold", color: "#fff" }}>
                                Test Oral <br /> (Avec Un Formateur)
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

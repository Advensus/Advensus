import { Separator, Text } from "@fluentui/react";
import React from "react";

export interface IHistoricalPageProps {
    default_props?: boolean;
}

export const HistoricalPage: React.FC<IHistoricalPageProps> = () => {
    return (
        <div className="historical_container">
            <div className="historical_box">
                <div className="historical_box_header">
                    <Text variant="medium" style={{ fontWeight: "bolder" }}>
                        HISTORIQUE
                    </Text>
                </div>
                <div className="historical_box_body">
                    <Separator />
                    Body
                </div>
            </div>
        </div>
    );
};

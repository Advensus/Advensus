import { Text } from "@fluentui/react";
import React, { useState } from "react";

export interface ICertificateCardProps {
    default_props?: boolean;
}

export const CertificateCardComponent: React.FC<ICertificateCardProps> = () => {
    return (
        <div className="certificate_card_container">
            <div className="certificate_card_head_content">
                <Text variant="large" style={{ fontWeight: "bolder" }}>
                    Code
                </Text>
                <Text variant="small">Intitulé</Text>
            </div>
        </div>
    );
};

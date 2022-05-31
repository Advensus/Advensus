import { Text } from "@fluentui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export interface ICertificateCardProps {
    default_props?: boolean;
    openPanel: () => void;
}

export const CertificateCardComponent: React.FC<ICertificateCardProps> = ({
    openPanel,
}) => {
    return (
        <Link to="#" onClick={openPanel} className="certificate_card_container">
            <div className="certificate_card_head_content">
                <Text variant="large" style={{ fontWeight: "bolder" }}>
                    Code
                </Text>
                <Text variant="small">Intitulé</Text>
            </div>
        </Link>
    );
};

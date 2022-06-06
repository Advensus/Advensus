import { Text } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICertificate } from "../../lib/interfaces/Certificate";

export interface ICertificateCardProps {
    default_props?: boolean;
    openPanel: () => void;
    certificate: ICertificate;
}

export const CertificateCardComponent: React.FC<ICertificateCardProps> = ({
    openPanel,
    certificate,
}) => {
    useEffect(() => {
        console.log({ certificate });
    }, []);
    return (
        <Link to="#" onClick={openPanel} className="certificate_card_container">
            <div className="certificate_card_head_content">
                <Text variant="large" style={{ fontWeight: "bolder" }}>
                    {certificate.code}
                </Text>
                <Text variant="small">{certificate.intitule}</Text>
            </div>
        </Link>
    );
};

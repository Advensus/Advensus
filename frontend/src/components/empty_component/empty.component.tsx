import { Text } from "@fluentui/react";
import React, { useState } from "react";

export interface IEmptyProps {
    default_props?: boolean;
    messageText: string;
}

export const EmptyComponent: React.FC<IEmptyProps> = ({ messageText }) => {
    return (
        <div className="empty_component_container">
            <Text variant="medium">{messageText}</Text>
        </div>
    );
};

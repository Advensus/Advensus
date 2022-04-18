import { Text } from "@fluentui/react";
import React, { useState } from "react";

export interface IFullInformationsTabProps {
    default_props?: boolean;
}

export const FullInformationsTabComponent: React.FC<
    IFullInformationsTabProps
> = () => {
    return (
        <div className="full_infos_tab_container">
            <div className="full_infos_tab_header">
                <Text>Onglet title</Text>
                <hr className="hr_dashed" />
            </div>
            <div className="full_infos_tab_body">Body</div>
        </div>
    );
};

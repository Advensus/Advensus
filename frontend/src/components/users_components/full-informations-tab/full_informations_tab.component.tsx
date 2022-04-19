import { Label, Pivot, PivotItem, Text } from "@fluentui/react";
import React, { useState } from "react";
import { UserDetailsComponent } from "../user-details/user_details.component";

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
            <div className="full_infos_tab_body">
                <Pivot
                    aria-label="Links of Large Tabs Pivot Example"
                    // linkFormat="tabs"
                    linkSize="large"
                >
                    <PivotItem
                        headerText="Details"
                        className="label_details_tab"
                    >
                        <UserDetailsComponent />
                        {/* <Label>
                        </Label> */}
                    </PivotItem>
                    <PivotItem headerText="Others">
                        <Label>Others</Label>
                    </PivotItem>
                    <PivotItem headerText="Bas">
                        <Label>Pivot #3</Label>
                    </PivotItem>
                </Pivot>
            </div>
        </div>
    );
};

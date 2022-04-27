import React, { useState } from "react";
import { Text } from "@fluentui/react";

export interface IAttributeDisplayProps {
    default_props?: boolean;
    keyWord: string;
    valueWord: any;
}

export const AttributeDisplayComponent: React.FC<IAttributeDisplayProps> = ({
    keyWord,
    valueWord,
}) => {
    return (
        <div>
            <Text variant="medium" style={{ fontWeight: "bolder" }}>
                {keyWord} :
            </Text>
            <Text variant="small" style={{ fontWeight: "lighter" }}>
                {" "}
                {valueWord}
            </Text>
            <hr className="hr_dashed_attribute_disp" />
        </div>
    );
};

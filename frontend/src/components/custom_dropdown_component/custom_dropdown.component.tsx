import {
    Dropdown,
    DropdownMenuItemType,
    IDropdownOption,
    IDropdownStyles,
} from "@fluentui/react/lib/Dropdown";
import React, { useState } from "react";

export interface ICustomDropDownProps {
    default_props?: boolean;
    thePlaceHolder: string;
    dropdownOptions: IDropdownOption[];
    isChange?: (
        event: React.FormEvent<HTMLDivElement>,
        item?: IDropdownOption<string>
    ) => void;
    keySelected?: IDropdownOption<string>;
}

interface IDropD {
    key: string;
    text: string;
}

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: {} };

const dropdownControlledOptions = [
    { key: "OF1", text: "OF1" },
    { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },

    { key: "OF2", text: "OF2" },
    { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },

    { key: "OF3", text: "OF3" },
    { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "OF4", text: "OF4" },
];

export const CustomDropDownComponent: React.FC<ICustomDropDownProps> = ({
    thePlaceHolder,
    dropdownOptions,
    isChange,
    keySelected,
}) => {
    // const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>();

    // const dropdownControlledOptions = dropdownOptions?.map((_) => {
    //     {
    //         _.key, _.text;
    //     }
    // });

    // const onChange = (
    //     event: React.FormEvent<HTMLDivElement>,
    //     item?: IDropdownOption
    // ): void => {
    //     setSelectedItem(item);
    // };

    return (
        <Dropdown
            // label="Controlled example"
            // selectedKeys={keySelected}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={isChange}
            placeholder={thePlaceHolder}
            options={dropdownOptions}
            styles={dropdownStyles}
        />
    );
};

import React, { useState } from "react";
import { Dropdown, IDropdownOption, Text } from "@fluentui/react";
import { Checkbox } from "@fluentui/react/lib/Checkbox";

export interface ITrainerTimeTableProps {
    default_props?: boolean;
    fromKeySelected: string | number | undefined;
    untilKeySelected: string | number | undefined;
    valuesDropdown: IDropdownOption[];
    theChangeOfFrom?: (
        event: React.FormEvent<HTMLDivElement>,
        item?: IDropdownOption
    ) => void;
    theChangeOfUntil?: (
        event: React.FormEvent<HTMLDivElement>,
        item?: IDropdownOption
    ) => void;
    labelChecbox: string;
}

export const TrainerTimeTableComponent: React.FC<ITrainerTimeTableProps> = ({
    fromKeySelected,
    untilKeySelected,
    valuesDropdown,
    theChangeOfFrom,
    theChangeOfUntil,
    labelChecbox,
}) => {
    const [isChecked, setIsChecked] = React.useState(false);
    const onChange = React.useCallback(
        (
            ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
            checked?: boolean
        ): void => {
            setIsChecked(!!checked);
        },
        []
    );

    return (
        <div className="trainer_time_table_container">
            <Checkbox
                label={labelChecbox}
                checked={isChecked}
                onChange={onChange}
            />
            <Dropdown
                selectedKey={fromKeySelected}
                // onChange={(
                //     event: React.FormEvent<HTMLDivElement>,
                //     item?: IDropdownOption
                // ): void => {
                //     setTheFieldValue("appartenir_societe", item?.key);
                // }}
                onChange={theChangeOfFrom}
                placeholder="--:--"
                options={valuesDropdown}
                disabled={!isChecked}
                className="trainer_time_table_dropdown"
            />
            <Text>-</Text>
            <Dropdown
                selectedKey={untilKeySelected}
                onChange={theChangeOfUntil}
                placeholder="--:--"
                options={valuesDropdown}
                disabled={!isChecked}
                className="trainer_time_table_dropdown"
            />
        </div>
    );
};

import React from "react";
import {
    SchedulerHeader,
    SchedulerHeaderProps,
} from "@progress/kendo-react-scheduler";
import { SchedulerConfigContext } from "./scheduler.page";
import { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import {
    ToolbarItem,
    ToolbarSeparator,
    ToolbarSpacer,
} from "@progress/kendo-react-buttons";
import { ToolbarDropdown } from "./toolbar-dropdown";

export const CustomHeader = (props: SchedulerHeaderProps) => {
    // FOR HEADER
    const [traineeDisplay, setTraineeDisplay] = React.useContext(
        SchedulerConfigContext
    ).traineeDisplay;
    const [formerDisplay, setFormerDisplay] = React.useContext(
        SchedulerConfigContext
    ).formerDisplay;

    const handleTraineeDisplayChange = React.useCallback(
        (event: DropDownListChangeEvent) => {
            setTraineeDisplay(event.target.value);
        },
        [traineeDisplay]
    );

    const handleFormerDisplayChange = React.useCallback(
        (event: DropDownListChangeEvent) => {
            setFormerDisplay(event.target.value);
        },
        [formerDisplay]
    );
    return (
        <SchedulerHeader>
            {props.children} <ToolbarSpacer />
            <ToolbarItem>
                <ToolbarDropdown
                    text="Stagiaire"
                    value={traineeDisplay}
                    data={["client1", "client2", "client3", "client4"]}
                    onChange={handleTraineeDisplayChange}
                />
            </ToolbarItem>
            <ToolbarSeparator />
            <ToolbarItem>
                <ToolbarDropdown
                    text="Formateur"
                    value={formerDisplay}
                    data={["f1", "f2", "f3", "f4"]}
                    onChange={handleFormerDisplayChange}
                />
            </ToolbarItem>
        </SchedulerHeader>
    );
};

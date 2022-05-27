import React, { useState } from "react";

import { getTheme, mergeStyleSets } from "@fluentui/react/lib/Styling";
import { lorem } from "@fluentui/example-data";
import {
    ScrollablePane,
    IScrollablePaneStyles,
} from "@fluentui/react/lib/ScrollablePane";
import { Sticky, StickyPositionType } from "@fluentui/react/lib/Sticky";
import { Text } from "@fluentui/react";

export interface IScrollablePaneExampleItem {
    color: string;
    text: string;
    index: number;
}
const theme = getTheme();
const classNames = mergeStyleSets({
    wrapper: {
        height: "40vh",
        position: "relative",
        maxHeight: "inherit",
    },
    pane: {
        maxWidth: 400,
        border: "1px solid " + theme.palette.neutralLight,
    },
    sticky: {
        color: theme.palette.neutralDark,
        padding: "5px 20px 5px 10px",
        fontSize: "13px",
        borderTop: "1px solid " + theme.palette.black,
        borderBottom: "1px solid " + theme.palette.black,
        height: "50px",
    },
    textContent: {
        padding: "15px 10px",
        color: "#000",
    },
});
const scrollablePaneStyles: Partial<IScrollablePaneStyles> = {
    // root: classNames.pane,
};
const colors = [
    "#eaeaea",
    "#dadada",
    "#d0d0d0",
    "#c8c8c8",
    "#a6a6a6",
    "#c7e0f4",
    "#71afe5",
    "#eff6fc",
    "#deecf9",
];
const items = Array.from({ length: 5 }).map((item, index) => ({
    color: colors.splice(Math.floor(Math.random() * colors.length), 1)[0],
    text: lorem(200),
    index,
}));
const createContentArea = (item: IScrollablePaneExampleItem) => (
    <div
        key={item.index}
        style={{
            backgroundColor: item.color,
        }}
    >
        <Sticky stickyPosition={StickyPositionType.Both}>
            <div role="heading" aria-level={1} className={classNames.sticky}>
                <Text variant="large">Module Formation</Text> #{item.index + 1}
            </div>
        </Sticky>
        <div className={classNames.textContent}>{item.text}</div>
    </div>
);

export interface ITrainingProgramProps {
    default_props?: boolean;
}

export const TrainingProgramComponent: React.FC<ITrainingProgramProps> = () => {
    return (
        <div className="training_program_container">
            <div className="training_program_box">
                <Text variant="xLarge" style={{ fontWeight: "bolder" }}>
                    NOM FORMATION
                </Text>
                <div className="training_program_scrollablepane_container">
                    <ScrollablePane
                        scrollContainerFocus={true}
                        scrollContainerAriaLabel="Sticky component example"
                        // styles={scrollablePaneStyles}
                    >
                        {items.map(createContentArea)}
                    </ScrollablePane>
                </div>
            </div>
            <div className="training_program_box">
                <Text variant="xLarge" style={{ fontWeight: "bolder" }}>
                    NOM FORMATION
                </Text>
                <div className="training_program_scrollablepane_container">
                    <ScrollablePane
                        scrollContainerFocus={true}
                        scrollContainerAriaLabel="Sticky component example"
                        // styles={scrollablePaneStyles}
                    >
                        {items.map(createContentArea)}
                    </ScrollablePane>
                </div>
            </div>
        </div>
    );
};

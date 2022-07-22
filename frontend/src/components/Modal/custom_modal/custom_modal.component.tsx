import React from "react";
import { useId, useBoolean } from "@fluentui/react-hooks";
import {
    getTheme,
    mergeStyleSets,
    FontWeights,
    ContextualMenu,
    Modal,
    IDragOptions,
    IIconProps,
    IStackProps,
    Text,
} from "@fluentui/react";
import {
    DefaultButton,
    IconButton,
    IButtonStyles,
    ActionButton,
} from "@fluentui/react/lib/Button";
import { SignInDialogComponent } from "../../Dialog/sign_in_dialog/sig_in_dialog.component";
import { IDocument } from "../../../lib";

export interface ICustomModalProps {
    default_props?: boolean;
    fileName: string;
    filePath: string;
    currentDoc: IDocument;
    refreshPage?: () => void;
}

export const CustomModalComponent: React.FC<ICustomModalProps> = ({
    fileName,
    filePath,
    currentDoc,
    refreshPage,
}) => {
    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
        useBoolean(false);
    const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
    const [keepInBounds, { toggle: toggleKeepInBounds }] = useBoolean(false);
    // Normally the drag options would be in a constant, but here the toggle can modify keepInBounds
    const dragOptions = React.useMemo(
        (): IDragOptions => ({
            moveMenuItemText: "Move",
            closeMenuItemText: "Close",
            menu: ContextualMenu,
            keepInBounds,
        }),
        [keepInBounds]
    );

    // Use useId() to ensure that the IDs are unique on the page.
    // (It's also okay to use plain strings and manually ensure uniqueness.)
    const titleId = useId("title");

    return (
        <div>
            <DefaultButton
                onClick={showModal}
                text={fileName}
                className={contentStyles.buttonStyle}
            />
            <Modal
                titleAriaId={titleId}
                isOpen={isModalOpen}
                onDismiss={hideModal}
                isBlocking={false}
                containerClassName={contentStyles.container}
                dragOptions={isDraggable ? dragOptions : undefined}
            >
                <div className="modal_header">
                    {/* <div className={contentStyles.header}> */}
                    <span id={titleId}>
                        {/* <ActionButton
                            onClick={() => console.log("Espace pour signer")}
                        > */}
                        <Text style={{ fontWeight: "bold" }}>
                            <SignInDialogComponent
                                actionTitle="Signer"
                                currentDoc={currentDoc}
                                closeModal={hideModal}
                                refreshPage={refreshPage}
                            />
                        </Text>
                        {/* </ActionButton> */}
                    </span>
                    <IconButton
                        styles={iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        onClick={hideModal}
                    />
                </div>
                <div className={contentStyles.body}>
                    <iframe
                        src={filePath}
                        // height="100vh"
                        // width="600"
                        style={{ height: "100vh", width: "100%" }}
                    >
                        Loading pdf
                    </iframe>
                </div>
            </Modal>
        </div>
    );
};

const cancelIcon: IIconProps = { iconName: "Cancel" };

const theme = getTheme();
const contentStyles = mergeStyleSets({
    buttonStyle: {
        width: "100%",
        marginTop: "10px",
        backgroundColor: "#fff",
    },
    container: {
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "stretch",
        height: "100%",
        width: "100%",
    },
    body: {
        flex: "4 4 auto",
        padding: "0 24px 24px 24px",
        overflowY: "hidden",
        selectors: {
            p: { margin: "14px 0" },
            "p:first-child": { marginTop: 0 },
            "p:last-child": { marginBottom: 0 },
        },
    },
});
const stackProps: Partial<IStackProps> = {
    horizontal: true,
    tokens: { childrenGap: 40 },
    styles: { root: { marginBottom: 20 } },
};
const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: theme.palette.neutralPrimary,
        marginLeft: "auto",
        marginTop: "4px",
        marginRight: "2px",
    },
    rootHovered: {
        color: theme.palette.neutralDark,
    },
};

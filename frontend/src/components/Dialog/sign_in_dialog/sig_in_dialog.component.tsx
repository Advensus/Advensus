import React, { useEffect, useState } from "react";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { ContextualMenu } from "@fluentui/react/lib/ContextualMenu";
import { Toggle } from "@fluentui/react/lib/Toggle";
import { useBoolean } from "@fluentui/react-hooks";
import SigInComponent from "./sig";
import DocumentsService from "../../../services/documents.service";
import { IDocument, EditDocDtoIn } from "../../../lib";
import { useAuthStore } from "../../../stores";

export interface ISignInDialogProps {
    default_props?: boolean;
    actionTitle: string;
    currentDoc: IDocument;
}

const dragOptions = {
    moveMenuItemText: "Move",
    closeMenuItemText: "Close",
    menu: ContextualMenu,
};
const modalPropsStyles = { main: { maxWidth: 450 } };

export const SignInDialogComponent: React.FC<ISignInDialogProps> = ({
    actionTitle,
    currentDoc,
}) => {
    const { user, updateCurrentUser } = useAuthStore();
    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
    const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
    const modalProps = React.useMemo(
        () => ({
            isBlocking: true,
            styles: modalPropsStyles,
            dragOptions: isDraggable ? dragOptions : undefined,
        }),
        [isDraggable]
    );

    const editDoc = (sig: Blob, val: EditDocDtoIn) => {
        const theSigFile = `${sig}`;
        val.sign = theSigFile;
        console.log({ theSigFile });
        console.log({ val });
        DocumentsService.edit_document(val.id, val)
            .then(async (response) => {
                if (response.status !== 200) {
                    //@TODO #4
                    // alert("Error editing product");
                    return;
                }
                const editedDoc = (await response.json()) as IDocument;
                console.log("The modif:", editedDoc);
                // props.onCreate(product);
                user.appartenir_content_type.map((_) => {
                    if (_.id === val.id) {
                        _.sign = sig;
                    }
                });
                updateCurrentUser(user);

                return editedDoc;
            })
            .catch((err) => {
                //@TODO #4
                console.log("Error while editing booking:", err);
            });
    };

    return (
        <>
            <DefaultButton
                secondaryText="Opens the Sample Dialog"
                onClick={toggleHideDialog}
                text={actionTitle}
                style={{ backgroundColor: "green" }}
            />
            <Dialog
                hidden={hideDialog}
                onDismiss={toggleHideDialog}
                modalProps={modalProps}
            >
                <SigInComponent
                    doSign={(signature: Blob) => editDoc(signature, currentDoc)}
                />
                {/* <DialogFooter>
                    <PrimaryButton onClick={toggleHideDialog} text="Send" />
                    <DefaultButton
                        onClick={toggleHideDialog}
                        text="Don't send"
                    />
                </DialogFooter> */}
            </Dialog>
        </>
    );
};

import React, { useEffect, useState } from "react";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { ContextualMenu } from "@fluentui/react/lib/ContextualMenu";
import { Toggle } from "@fluentui/react/lib/Toggle";
import { useBoolean } from "@fluentui/react-hooks";
import SigInComponent from "./sig";
import DocumentsService from "../../../services/documents.service";
import { IDocument, EditDocDtoIn } from "../../../lib";

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

    const editDoc = (sig: string, val: EditDocDtoIn) => {
        const formData = new FormData();
        val.sign = sig;
        // console.log("the booking id to edit:", id);
        console.log({ sig });
        console.log({ val });
        // formData.append('id', val.id);
        // formData.append("doc_categorie", val.doc_categorie);
        // formData.append("appartenir", "");
        // formData.append("partager", "");
        formData.append("sign", sig);
        console.log({ formData });
        // formData.append("path", val.path);
        DocumentsService.edit_document(val.id, formData)
            .then(async (response) => {
                if (response.status !== 200) {
                    //@TODO #4
                    // alert("Error editing product");
                    return;
                }
                const editedDoc = (await response.json()) as IDocument;
                console.log("The modif:", editedDoc);
                // props.onCreate(product);
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
                    doSign={(signature: string) =>
                        editDoc(signature, currentDoc)
                    }
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

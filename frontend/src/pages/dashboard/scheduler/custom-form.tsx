import * as React from "react";

import {
    SchedulerForm,
    SchedulerFormProps,
} from "@progress/kendo-react-scheduler";

import { CustomFormEditor } from "./custom-form-editor";
import { CustomDialog } from "./custom-dialog";

export const FormWithCustomEditor = (props: SchedulerFormProps) => {
    const requiredValidator = React.useCallback(
        (value) =>
            value === undefined || value === null || value === ""
                ? "Field is required."
                : undefined,
        []
    );

    const formValidator = (_dataItem: any, formValueGetter: any) => {
        let result: any = {};

        result.title = [requiredValidator(formValueGetter("title"))]
            .filter(Boolean)
            .reduce((current, acc) => current || acc, "");
        result.superviser = [requiredValidator(formValueGetter("superviser"))]
            .filter(Boolean)
            .reduce((current, acc) => current || acc, "");

        result.assister = [requiredValidator(formValueGetter("assister"))]
            .filter(Boolean)
            .reduce((current, acc) => current || acc, "");

        // result.lier = [requiredValidator(formValueGetter("lier"))]
        //     .filter(Boolean)
        //     .reduce((current, acc) => current || acc, "");

        return result;
    };

    return (
        <SchedulerForm
            {...props}
            editor={CustomFormEditor}
            dialog={CustomDialog}
            validator={formValidator}
        />
    );
};

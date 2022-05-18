import * as React from "react";

import { FormElement, Field } from "@progress/kendo-react-form";
import { Label, Error } from "@progress/kendo-react-labels";
import { TextArea } from "@progress/kendo-react-inputs";
import { DatePicker, DateTimePicker } from "@progress/kendo-react-dateinputs";
import {
    SchedulerFormEditor,
    SchedulerFormEditorProps,
} from "@progress/kendo-react-scheduler";

import {
    TitleEditor,
    TreatmentEditor,
    RoomEditor,
    TherapistEditor,
} from "./editors";

export const CustomFormEditor = (props: SchedulerFormEditorProps) => {
    return <SchedulerFormEditor {...props} />;
};

import * as React from "react";

import { FormElement, Field } from "@progress/kendo-react-form";
import { Label, Error } from "@progress/kendo-react-labels";
import { TextArea } from "@progress/kendo-react-inputs";
import { DatePicker, DateTimePicker } from "@progress/kendo-react-dateinputs";
import {
    SchedulerForm,
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
    return (
        <SchedulerFormEditor
            props={CutomFields}
            {...props}
            recurrenceLabel={TitleLabel}
        />
    );
};

const TitleLabel = () => {
    return <div>Titre</div>;
};

const CutomFields = (props: SchedulerFormEditorProps) => {
    return (
        <FormElement horizontal={true}>
            <div className="k-form-field">
                <Label>Stagiaire</Label>
                <div className="k-form-field-wrap">
                    <Field name={"Patient"} component={TitleEditor} />
                    {props.errors.Patient && (
                        <Error>{props.errors.Patient}</Error>
                    )}
                </div>
            </div>
            <div className="k-form-field">
                <Label>End</Label>
                <div className="k-form-field-wrap">
                    <Field
                        name={"End"}
                        component={props.endEditor || DatePicker}
                        as={DateTimePicker}
                        rows={1}
                        // width={"140px"}
                        format="t"
                    />
                </div>
            </div>
            <div className="k-form-field">
                <Label>Formateur</Label>
                <div className="k-form-field-wrap">
                    <Field name={"Treatment"} component={TreatmentEditor} />
                    {props.errors.Treatment && (
                        <Error>{props.errors.Treatment}</Error>
                    )}
                </div>
            </div>
            <div className="k-form-field">
                <Label>Note</Label>
                <div className="k-form-field-wrap">
                    <Field name={"Note"} component={TextArea} rows={1} />
                </div>
            </div>
            <div className="k-form-field">
                <Label>Cour</Label>
                <div className="k-form-field-wrap">
                    <Field name="Room" component={RoomEditor} />
                </div>
            </div>
        </FormElement>
    );
};
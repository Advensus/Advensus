import * as React from "react";

import { FormElement, Field } from "@progress/kendo-react-form";
import { Label, Error } from "@progress/kendo-react-labels";
import { Input, TextArea } from "@progress/kendo-react-inputs";
import { DatePicker, DateTimePicker } from "@progress/kendo-react-dateinputs";
import { SchedulerFormEditorProps } from "@progress/kendo-react-scheduler";

import {
    TitleEditor,
    TreatmentEditor,
    RoomEditor,
    TherapistEditor,
} from "./editors";

export const CustomFormEditor = (props: SchedulerFormEditorProps) => {
    return (
        <FormElement>
            <div className="k-form-field">
                <Label>Titre</Label>
                <div className="k-form-field-wrap">
                    <Field name={"title"} component={Input} rows={1} />
                </div>
            </div>
            <div className="k-form-field">
                <Label>Formateur</Label>
                <div className="k-form-field-wrap">
                    <Field name={"Patient"} component={TitleEditor} />
                    {props.errors.Patient && (
                        <Error>{props.errors.Patient}</Error>
                    )}
                </div>
            </div>
            <div className="k-form-field">
                <Label>Stagiaire</Label>
                <div className="k-form-field-wrap">
                    <Field name={"Trainee"} component={TitleEditor} />
                    {props.errors.Patient && (
                        <Error>{props.errors.Patient}</Error>
                    )}
                </div>
            </div>

            <div className="k-form-field">
                <Label>Cours</Label>
                <div className="k-form-field-wrap">
                    <Field name={"Treatment"} component={TreatmentEditor} />
                    {props.errors.Treatment && (
                        <Error>{props.errors.Treatment}</Error>
                    )}
                </div>
            </div>
            <div className="k-form-field">
                <Label>Description</Label>
                <div className="k-form-field-wrap">
                    <Field name={"description"} component={Input} rows={1} />
                </div>
            </div>
            {/* <div className="k-form-field">
                <Label>Début</Label>
                <Field
                    name={"Start"}
                    component={props.startEditor || DatePicker}
                    as={DateTimePicker}
                    rows={1}
                    // width={"140px"}
                    // format="t"
                />
            </div> */}
            <div className="k-form-field">
                <Label>Début</Label>
                <div className="k-form-field-wrap">
                    <div
                    // style={{
                    //     width: "100%",
                    //     display: "flex",
                    //     alignItems: "center",
                    // }}
                    >
                        <Field
                            name={"Start"}
                            component={props.startEditor || DatePicker}
                            as={DateTimePicker}
                            rows={1}
                            // width={"140px"}
                            // format="t"
                        />{" "}
                        <Label>Fin</Label>
                        <Field
                            name={"End"}
                            component={props.endEditor || DatePicker}
                            as={DateTimePicker}
                            rows={1}
                            // width={"140px"}
                            // format=""
                        />
                    </div>
                </div>
            </div>
        </FormElement>
    );
};

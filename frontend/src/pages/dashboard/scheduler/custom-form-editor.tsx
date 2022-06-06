import * as React from "react";

import { FormElement, Field } from "@progress/kendo-react-form";
import { Label, Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { DatePicker, DateTimePicker } from "@progress/kendo-react-dateinputs";
import { SchedulerFormEditorProps } from "@progress/kendo-react-scheduler";

import {
    TreatmentEditor,
    FormerList,
    TraineesList,
    CoursesEditor,
    EdofList,
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
                <Label>Formateur(s)</Label>
                <div className="k-form-field-wrap">
                    <Field name={"superviser"} component={FormerList} />
                    {props.errors.superviser && (
                        <Error>{props.errors.superviser}</Error>
                    )}
                </div>
            </div>
            <div className="k-form-field">
                <Label>Stagiaire(s)</Label>
                <div className="k-form-field-wrap">
                    <Field name={"assister"} component={TraineesList} />
                    {props.errors.assister && (
                        <Error>{props.errors.assister}</Error>
                    )}
                </div>
            </div>
            <div className="k-form-field">
                <Label>Formation(s)</Label>
                <div className="k-form-field-wrap">
                    <Field name={"lier"} component={CoursesEditor} />
                    {/* {props.errors.Training && (
                        <Error>{props.errors.Training}</Error>
                    )} */}
                </div>
            </div>
            <div className="k-form-field">
                <Label>EDOF(s)</Label>
                <div className="k-form-field-wrap">
                    <Field name={"proposer"} component={FormerList} />
                    {/* {props.errors.Training && (
                        <Error>{props.errors.Training}</Error>
                    )} */}
                </div>
            </div>

            <div className="k-form-field">
                <Label>Description</Label>
                <div className="k-form-field-wrap">
                    <Field name={"description"} component={Input} rows={1} />
                </div>
            </div>
            <div className="k-form-field">
                <Label>Status de la Réservation</Label>
                <div className="k-form-field-wrap">
                    <Field name={"status"} component={Input} rows={1} />
                </div>
            </div>
            {/* <div className="k-form-field">
                <Label>Début</Label>
                <div className="k-form-field-wrap">
                    <div>
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
                            // format="t"
                        />
                    </div>
                </div>
            </div> */}
        </FormElement>
    );
};

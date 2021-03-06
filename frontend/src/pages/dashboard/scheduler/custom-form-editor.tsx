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
    TrainingEditor,
    EdofsList,
    TitleList,
} from "./editors";

export const CustomFormEditor = (props: SchedulerFormEditorProps) => {
    return (
        <FormElement>
            <div className="k-form-field">
                <Label>Titre</Label>
                <div className="k-form-field-wrap">
                    <Field name={"title"} component={TitleList} />
                    {props.errors.title && <Error>{props.errors.title}</Error>}
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
                <Label>EDOF(s) Subscribe</Label>
                <div className="k-form-field-wrap">
                    <Field name={"proposer"} component={EdofsList} />
                    {/* {props.errors.Training && (
                        <Error>{props.errors.Training}</Error>
                    )} */}
                </div>
            </div>
            <div className="k-form-field">
                <Label>Formation(s)</Label>
                <div className="k-form-field-wrap">
                    <Field name={"lier"} component={TrainingEditor} />
                    {/* {props.errors.Training && (
                        <Error>{props.errors.Training}</Error>
                    )} */}
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

            {/* <div className="k-form-field">
                <Label>EDOF(s)</Label>
                <div className="k-form-field-wrap">
                    <Field name={"proposer"} component={FormerList} />
                </div>
            </div> */}

            <div className="k-form-field">
                <Label>Commentaire</Label>
                <div className="k-form-field-wrap">
                    <Field name={"description"} component={Input} rows={1} />
                </div>
            </div>
            {/* <div className="k-form-field">
                <Label>Status de la R??servation</Label>
                <div className="k-form-field-wrap">
                    <Field name={"status"} component={Input} rows={1} />
                </div>
            </div> */}
            {/* <div className="k-form-field">
                <Label>D??but</Label>
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

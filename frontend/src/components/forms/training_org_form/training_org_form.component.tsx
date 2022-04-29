import { DefaultButton, Text, TextField } from "@fluentui/react";
import React, { useState } from "react";

export interface ITrainingOrganizationFormProps {
    default_props?: boolean;
    cancel?: () => void;
}

export const TrainingOrganizationFormComponent: React.FC<
    ITrainingOrganizationFormProps
> = ({ cancel }) => {
    return (
        <form className="training_org_form_container">
            <Text className="training_org_form_txt_divide_mov">O-F</Text>
            <hr className="training_org_form_hr_solid" />
            <div className="of_training_org_form_sect">
                <div className="training_org_form_pict">Stamp</div>
                <div className="of_training_org_form_fields">
                    <TextField
                        type="text"
                        // value={values.first_name}
                        // onChange={handleChange}
                        placeholder="Nom O-F"
                        name="first_name"
                    />
                    <TextField
                        type="text"
                        // value={values.username}
                        // onChange={handleChange}
                        placeholder="Adress O-F"
                        name="username"
                    />
                    <TextField
                        type="text"
                        // value={values.email}
                        // onChange={handleChange}
                        placeholder="Téléphone Portable"
                        name="email"
                    />
                    <TextField
                        type="text"
                        // value={values.email}
                        // onChange={handleChange}
                        placeholder="Téléphone Fixe"
                        name="email"
                    />
                </div>
            </div>
            <Text className="training_org_form_txt_divide_mov">Admin</Text>{" "}
            <hr className="training_org_form_hr_solid" />
            <div className="head_training_org_form">
                <div className="head_training_org_form_fields">
                    <div className="head_training_org_form_align_fields">
                        <TextField
                            type="text"
                            // label="text"
                            // value={values.text}
                            // onChange={handleChange}
                            placeholder="Civilité"
                            name="text"
                        />
                        <TextField
                            type="text"
                            // label="text"
                            // value={values.text}
                            // onChange={handleChange}
                            placeholder="Titre"
                            name="text"
                        />
                    </div>
                    <TextField
                        type="text"
                        // value={values.competence}
                        // onChange={handleChange}
                        placeholder="Prénom"
                        name="competence"
                    />
                    <TextField
                        type="text"
                        // value={values.horaire}
                        // onChange={handleChange}
                        placeholder="Nom"
                        name="horaire"
                    />
                    <TextField
                        type="email"
                        // value={values.horaire}
                        // onChange={handleChange}
                        placeholder="Email"
                        name="horaire"
                    />
                    <TextField
                        type="text"
                        // value={values.horaire}
                        // onChange={handleChange}
                        placeholder="Téléphone"
                        name="horaire"
                    />
                    <TextField
                        type="text"
                        // value={values.horaire}
                        // onChange={handleChange}
                        placeholder="Adresse"
                        name="horaire"
                    />
                    <TextField
                        type="password"
                        // value={values.password}
                        // onChange={handleChange}
                        placeholder="Password"
                        name="password"
                        canRevealPassword
                        revealPasswordAriaLabel="Show password"
                    />
                </div>
                <div className="training_org_form_pict">Pict</div>
            </div>
            <div className="training_org_form_form_btns">
                <DefaultButton text="Annuler" onClick={cancel} />
                <DefaultButton
                    style={{ marginLeft: "10px" }}
                    text="Sauvegarder"
                    type="submit"
                />
            </div>
        </form>
    );
};

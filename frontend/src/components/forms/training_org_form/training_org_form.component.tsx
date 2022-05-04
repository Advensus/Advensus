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
                <div className="training_org_form_pict">Logo</div>
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
                        // value={values.first_name}
                        // onChange={handleChange}
                        placeholder="Email O-F"
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
                    <TextField
                        type="password"
                        // value={values.password}
                        // onChange={handleChange}
                        placeholder="Password"
                        name="password"
                        canRevealPassword
                        revealPasswordAriaLabel="Show password"
                    />
                    <div className="training_org_form_stamp">Cachet</div>
                </div>
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

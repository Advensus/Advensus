import {
    TooltipHost,
    Text,
    IconButton,
    IIconProps,
    SearchBox,
    Pivot,
    PivotItem,
    Label,
} from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { AttributeDisplayComponent } from "../../../components";
import { useAuthStore } from "../../../stores";

export interface IAccountProps {
    default_props?: boolean;
}

const addIcon: IIconProps = { iconName: "Add" };

export const AccountPage: React.FC<IAccountProps> = () => {
    const [showForm, setShowForm] = useState<Boolean>(false);
    const [pathLabel, setPathLabel] = useState<string>("");

    const { user } = useAuthStore();

    useEffect(() => {
        toggleTrainingsContent();
    }, []);

    const toggleTrainingsContent = () => {
        var hint_trainings = document.getElementById(
            "account_content_display"
        ) as HTMLInputElement;

        hint_trainings.className =
            hint_trainings.className !== "show" ? "show" : "hide";
        if (hint_trainings.className === "show") {
            hint_trainings.style.display = "block";
            window.setTimeout(() => {
                hint_trainings.style.opacity = "1";
                hint_trainings.style.transform = "scale(1)";
            }, 0);
        }
        if (hint_trainings.className === "hide") {
            hint_trainings.style.opacity = "0";
            hint_trainings.style.transform = "scale(0)";
            window.setTimeout(function () {
                hint_trainings.style.display = "none";
            }, 700); // timed to match animation-duration
        }
    };

    return (
        <div className="account_container">
            <div id="account_content_display">
                <div className="account_content_display_header">
                    <div className="account_content_display_header_title">
                        {!showForm ? (
                            // LIST TITLE
                            <Text>Détails du compte</Text>
                        ) : (
                            // FORM TITLE
                            <Text> Ajouter Formation</Text>
                        )}
                        <TooltipHost content="Modifier">
                            <IconButton
                                iconProps={addIcon}
                                ariaLabel="add"
                                // onClick={() => showAddForm(SERVICES_FORM)}
                            />
                        </TooltipHost>
                    </div>
                    <hr className="hr_dashed_account" />
                </div>
                {!showForm ? (
                    <div className="account_content_display_body">
                        <div className="account_content_display_body_infos">
                            <Pivot
                                aria-label="Large Link Size Pivot Example"
                                linkSize="large"
                            >
                                <PivotItem
                                    headerText="Infos du compte"
                                    className="account_content_display_body_infos_tab"
                                >
                                    <AttributeDisplayComponent
                                        keyWord="User ID"
                                        valueWord={user.id}
                                    />
                                    <AttributeDisplayComponent
                                        keyWord="Prénom"
                                        valueWord={user.first_name}
                                    />
                                    <AttributeDisplayComponent
                                        keyWord="Nom"
                                        valueWord={user.username}
                                    />
                                    <AttributeDisplayComponent
                                        keyWord="Email"
                                        valueWord={user.email}
                                    />
                                    <AttributeDisplayComponent
                                        keyWord="Nom OF"
                                        valueWord={user.organisme}
                                    />
                                </PivotItem>
                            </Pivot>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

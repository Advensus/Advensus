import { ActionButton, DefaultButton, IIconProps, Text } from "@fluentui/react";
import { TextField } from "@fluentui/react/lib/TextField";
import React from "react";
// import { RouteProps } from "react-router";

export interface ILoginPageProps {
    default_props?: boolean;
}

const addIcon = { iconName: "Add" };
const emailIcon = { iconName: "Mail" };
const iconProps = { iconName: "Calendar" };

export const LoginPage: React.FC<ILoginPageProps> = () => {
    return (
        <div className="login_container">
            <div className="login_form">
                <div className="login_form_header">
                    <Text>Logo ici</Text>
                </div>
                <div className="login_form_fields">
                    <Text
                        variant="xLargePlus"
                        // style={{ color: "#fff" }}
                        className="login_form_fields_title"
                    >
                        Se connecter
                    </Text>
                    <form>
                        <div className="login_form_content">
                            <TextField
                                type="email"
                                label={"Email"}
                                // value={values.email}
                                // onChange={handleChange}
                                name="email"
                                className="login_input"
                                // iconProps={emailIcon}
                                iconProps={iconProps}
                            />
                            <TextField
                                type="password"
                                label="Password"
                                // value={values.email}
                                // onChange={handleChange}
                                name="password"
                                canRevealPassword
                                revealPasswordAriaLabel="Show password"
                            />
                        </div>
                        <DefaultButton
                            text="Login now"
                            className="login_defaultbutton"
                            iconProps={addIcon}
                        />
                    </form>
                </div>
                <ActionButton
                    text="Forget password?"
                    className="login_form_reset_pwd"
                />
            </div>
        </div>
    );
};

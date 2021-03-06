import { ActionButton, DefaultButton, Text } from "@fluentui/react";
import { TextField } from "@fluentui/react/lib/TextField";
import React from "react";
import { useFormik } from "formik";
import {
    ADMIN_OF,
    LoginDtoIn,
    LoginDtoOut,
    ORG,
    RP,
    SUPER_RP,
    SUPER_USER,
    TEACHEAR,
    TRAINEE,
} from "../../../lib";
import { AuthService } from "../../../services";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores";

export interface ILoginPageProps {
    default_props?: boolean;
}

// const calendarIcon: IIconProps = { iconName: "Calendar" };

export const LoginPage: React.FC<ILoginPageProps> = () => {
    const navigate = useNavigate();
    const { updateToken, updateCurrentUser } = useAuthStore();

    const onSubmit = async (value: LoginDtoIn) => {
        if (value.password.substring(0, 3) === ORG) {
            //ORGANIZATION CONNEXION
        } else {
            //USERS CONNEXION
        }
        AuthService.login(value)
            .then(async (resp) => {
                if ([200, 201].includes(resp.status)) {
                    const { user } = (await resp.json()) as LoginDtoOut;
                    console.log("the current login user:", user);
                    if (!user.is_active) {
                        //TODO: do nothing
                        return;
                    }

                    // if (user) {
                    updateToken(user.tokens);
                    updateCurrentUser(user);
                    routeToAppropriatePagePerRole(user);
                    // }
                } else if ([404, 401].includes(resp.status)) {
                    const { message } = await resp.json();
                    console.log("the error:", resp.status);
                } else if ([500, 504].includes(resp.status)) {
                    const { message } = await resp.json();
                    console.log({ message });
                }
            })
            .catch((err) => {
                console.log({ err });
            });
    };

    const routeToAppropriatePagePerRole = (user: LoginDtoOut["user"]) => {
        switch (user.user_type) {
            case SUPER_USER:
                // Display dashboard
                navigate(`/dashboard/${user.id}`);
                break;
            case ADMIN_OF:
                navigate(`/dashboard/${user.id}`);
                break;
            case SUPER_RP:
                navigate(`/dashboard/${user.id}`);
                break;
            case RP:
                navigate(`/dashboard/${user.id}`);
                break;
            case TEACHEAR:
                navigate(`/dashboard/${user.id}`);
                break;
            case TRAINEE:
                navigate(`/dashboard/${user.id}`);
                break;
        }
    };

    const { values, handleChange, handleSubmit } = useFormik<LoginDtoIn>({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit,
    });

    return (
        <div className="login_container">
            <div></div>
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
                    <form onSubmit={handleSubmit}>
                        <div className="login_form_content">
                            <TextField
                                type="email"
                                label={"Email"}
                                value={values.email}
                                onChange={handleChange}
                                name="email"
                                className="login_input"
                                iconProps={{
                                    iconName: "NewMail",
                                    style: {
                                        color: "black",
                                    },
                                }}
                            />
                            <TextField
                                type="password"
                                label="Password"
                                value={values.password}
                                onChange={handleChange}
                                name="password"
                                canRevealPassword
                                revealPasswordAriaLabel="Show password"
                            />
                        </div>
                        <DefaultButton
                            text="Login now"
                            className="login_defaultbutton"
                            type="submit"
                            // iconProps={chevronIcon}
                            menuIconProps={{ iconName: "DoubleChevronRight8" }}
                        />
                    </form>
                </div>
                <div className="login_footer">
                    <ActionButton
                        text="Forget password?"
                        className="login_form_reset_pwd"
                    />
                    <ActionButton text="Annuler" className="login_cancel" />
                </div>
            </div>
            <div></div>
        </div>
    );
};

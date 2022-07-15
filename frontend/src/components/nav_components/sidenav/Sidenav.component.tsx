import { ActionButton, Text } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserRouteHooks } from "../../../hooks";
import { IRole, TRAINEE } from "../../../lib";
import { useAuthStore } from "../../../stores";
import { CurrentUserDetailsComponent } from "../../users_components/current-user-details/current_user_details.component";

export interface SideNavBaseProps {
    default_props?: boolean;
}

export interface IRoute {
    path: string;
    icon: string;
    label: string;
    action?: () => void;
    component: any;
    roles: IRole[];
}

export const SideNavComponent: React.FC<SideNavBaseProps> = () => {
    const menuRoutes = useUserRouteHooks();
    const { updateToken, user } = useAuthStore();
    const navigate = useNavigate();

    const [handleEnableNavLink, setHandleEnableNavLink] =
        useState<boolean>(true);

    // Handle media query
    const [isMobile, setIsMobile] = useState<Boolean>(false);
    function mqChange(mq: any) {
        setIsMobile(mq.matches);
    }
    useEffect(() => {
        const mq = window.matchMedia("screen and (max-width: 748px)");
        mq.addListener(mqChange);
        mqChange(mq);

        return () => {
            mq.removeListener(mqChange);
        };
    }, []);

    const openBlockContent = () => {
        (
            document.getElementById("display_content") as HTMLInputElement
        ).style.height = "auto";
        (
            document.getElementById("display_content") as HTMLInputElement
        ).style.opacity = "1";
        (
            document.getElementById("display_content") as HTMLInputElement
        ).style.transition = " height 0ms 0ms, opacity 600ms 0ms";
    };

    const closeBlockContent = () => {
        (
            document.getElementById("display_content") as HTMLInputElement
        ).style.overflow = "hidden";
        (
            document.getElementById("display_content") as HTMLInputElement
        ).style.height = "0";
        (
            document.getElementById("display_content") as HTMLInputElement
        ).style.opacity = "0";
        (
            document.getElementById("display_content") as HTMLInputElement
        ).style.transition = "height 0ms 400ms, opacity 400ms 0ms";
        (
            document.getElementById("display_content") as HTMLInputElement
        ).style.visibility = "hidden";
    };

    let box = document.getElementById("box") as HTMLInputElement;
    const btn = document.querySelector("button") as HTMLInputElement;

    // btn.addEventListener(
    //     "click",
    //     () => {
    //         box.classList.toggle("hidden");
    //     },
    //     false
    // );

    const toggleBlockContent = () => {
        // let sidenavBar = document.getElementById(
        //     "display_content"
        // ) as HTMLInputElement;

        // if ((sidenavBar.style.opacity = "1")) {
        //     closeBlockContent();
        // } else {
        //     openBlockContent();
        // }
        let box = document.getElementById(
            "users_content_display"
        ) as HTMLInputElement;

        if (box.classList.contains("hidden")) {
            box.classList.remove("hidden");
            setTimeout(() => {
                box.classList.remove("visuallyhidden");
            }, 20);
        } else {
            box.classList.add("visuallyhidden");
            box.addEventListener(
                "transitionend",
                (e) => {
                    box.classList.add("hidden");
                },
                {
                    capture: false,
                    once: true,
                    passive: false,
                }
            );
        }
    };

    // const toggleBlockContent2 = () => {
    //     var hint = document.getElementById(
    //         "users_content_display"
    //     ) as HTMLInputElement;

    //     hint.className = hint.className !== "show" ? "show" : "hide";
    //     if (hint.className === "show") {
    //         hint.style.display = "block";
    //         window.setTimeout(() => {
    //             hint.style.opacity = "1";
    //             hint.style.transform = "scale(1)";
    //         }, 0);
    //     }
    //     if (hint.className === "hide") {
    //         hint.style.opacity = "0";
    //         hint.style.transform = "scale(0)";
    //         window.setTimeout(function () {
    //             hint.style.display = "none";
    //         }, 700); // timed to match animation-duration
    //     }
    // };

    // // users_content_display_companies;
    // const toggleCompaniesContent = () => {
    //     var hint_companies = document.getElementById(
    //         "users_content_display_company"
    //     ) as HTMLInputElement;

    //     hint_companies.className =
    //         hint_companies.className !== "show" ? "show" : "hide";
    //     if (hint_companies.className === "show") {
    //         hint_companies.style.display = "block";
    //         window.setTimeout(() => {
    //             hint_companies.style.opacity = "1";
    //             hint_companies.style.transform = "scale(1)";
    //         }, 0);
    //     }
    //     if (hint_companies.className === "hide") {
    //         hint_companies.style.opacity = "0";
    //         hint_companies.style.transform = "scale(0)";
    //         window.setTimeout(function () {
    //             hint_companies.style.display = "none";
    //         }, 700); // timed to match animation-duration
    //     }
    // };

    // // users_content_display_organisation;
    // const toggleOrganizationsContent = () => {
    //     var hint_organisations = document.getElementById(
    //         "users_content_display_organization"
    //     ) as HTMLInputElement;

    //     hint_organisations.className =
    //         hint_organisations.className !== "show" ? "show" : "hide";
    //     if (hint_organisations.className === "show") {
    //         hint_organisations.style.display = "block";
    //         window.setTimeout(() => {
    //             hint_organisations.style.opacity = "1";
    //             hint_organisations.style.transform = "scale(1)";
    //         }, 0);
    //     }
    //     if (hint_organisations.className === "hide") {
    //         hint_organisations.style.opacity = "0";
    //         hint_organisations.style.transform = "scale(0)";
    //         window.setTimeout(function () {
    //             hint_organisations.style.display = "none";
    //         }, 700); // timed to match animation-duration
    //     }
    // };

    // // users_content_display_trainees;
    // const toggleTraineesContent = () => {
    //     var hint_trainees = document.getElementById(
    //         "users_content_display_trainees"
    //     ) as HTMLInputElement;

    //     hint_trainees.className =
    //         hint_trainees.className !== "show" ? "show" : "hide";
    //     if (hint_trainees.className === "show") {
    //         hint_trainees.style.display = "block";
    //         window.setTimeout(() => {
    //             hint_trainees.style.opacity = "1";
    //             hint_trainees.style.transform = "scale(1)";
    //         }, 0);
    //     }
    //     if (hint_trainees.className === "hide") {
    //         hint_trainees.style.opacity = "0";
    //         hint_trainees.style.transform = "scale(0)";
    //         window.setTimeout(function () {
    //             hint_trainees.style.display = "none";
    //         }, 700); // timed to match animation-duration
    //     }
    // };

    // // users_content_display_resources;
    // const toggleResourcesContent = () => {
    //     var hint_resources = document.getElementById(
    //         "users_content_display_resources"
    //     ) as HTMLInputElement;

    //     hint_resources.className =
    //         hint_resources.className !== "show" ? "show" : "hide";
    //     if (hint_resources.className === "show") {
    //         hint_resources.style.display = "block";
    //         window.setTimeout(() => {
    //             hint_resources.style.opacity = "1";
    //             hint_resources.style.transform = "scale(1)";
    //         }, 0);
    //     }
    //     if (hint_resources.className === "hide") {
    //         hint_resources.style.opacity = "0";
    //         hint_resources.style.transform = "scale(0)";
    //         window.setTimeout(function () {
    //             hint_resources.style.display = "none";
    //         }, 700); // timed to match animation-duration
    //     }
    // };

    // // users_content_display_trainings;
    // const toggleTrainingsContent = () => {
    //     var hint_trainings = document.getElementById(
    //         "users_content_display_trainings"
    //     ) as HTMLInputElement;

    //     hint_trainings.className =
    //         hint_trainings.className !== "show" ? "show" : "hide";
    //     if (hint_trainings.className === "show") {
    //         hint_trainings.style.display = "block";
    //         window.setTimeout(() => {
    //             hint_trainings.style.opacity = "1";
    //             hint_trainings.style.transform = "scale(1)";
    //         }, 0);
    //     }
    //     if (hint_trainings.className === "hide") {
    //         hint_trainings.style.opacity = "0";
    //         hint_trainings.style.transform = "scale(0)";
    //         window.setTimeout(function () {
    //             hint_trainings.style.display = "none";
    //         }, 700); // timed to match animation-duration
    //     }
    // };
    useEffect(() => {
        if (user.user_type === TRAINEE) {
            user.appartenir_content_type.map((_) => {
                _.sign != null
                    ? setHandleEnableNavLink(false)
                    : setHandleEnableNavLink(!handleEnableNavLink);
            });
        }
    }, [user]);

    const doLogout = () => {
        localStorage.clear();
        updateToken("");
        navigate("/login");
    };

    return (
        <nav className="sidenav">
            {isMobile ? <CurrentUserDetailsComponent /> : null}
            {menuRoutes.map((navig) => (
                <NavLink
                    id="testDisabled"
                    key={navig.path}
                    to={handleEnableNavLink ? navig.path : "#"}
                    state={{ label: `${navig.label}` }}
                    className={({ isActive }) =>
                        [
                            "sidenav__route",
                            isActive ? "sidenav__route--current" : null,
                        ]
                            .filter(Boolean)
                            .join(" ")
                    }
                >
                    <i className={"las " + navig.icon}></i>
                    <Text
                        variant="tiny"
                        style={{
                            fontWeight: "bold",
                            color: "#f4f3f3",
                        }}
                    >
                        {navig.label}
                    </Text>
                </NavLink>
            ))}
            <div className="sidenav_footer">
                <ActionButton onClick={doLogout}>
                    <Text style={{ fontWeight: "bolder" }}>Déconnexion</Text>
                </ActionButton>
            </div>
        </nav>
    );
};

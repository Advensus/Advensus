import { Text } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserRouteHooks } from "../../../hooks";
import { IRole } from "../../../lib";
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
    useEffect(() => {
        console.log(menuRoutes);
    }, []);
    const menuRoutes = useUserRouteHooks();

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

    const toggleBlockContent2 = () => {
        var hint = document.getElementById(
            "users_content_display"
        ) as HTMLInputElement;

        hint.className = hint.className !== "show" ? "show" : "hide";
        if (hint.className === "show") {
            hint.style.display = "block";
            window.setTimeout(() => {
                hint.style.opacity = "1";
                hint.style.transform = "scale(1)";
            }, 0);
        }
        if (hint.className === "hide") {
            hint.style.opacity = "0";
            hint.style.transform = "scale(0)";
            window.setTimeout(function () {
                hint.style.display = "none";
            }, 700); // timed to match animation-duration
        }
    };

    return (
        <nav className="sidenav">
            {isMobile ? <CurrentUserDetailsComponent /> : null}
            {menuRoutes.map((navig) => (
                <NavLink
                    key={navig.path}
                    to={navig.path}
                    state={{ label: `${navig.label}` }}
                    // state={{ navig: navig }}
                    onClick={toggleBlockContent2}
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
                        style={{ fontWeight: "bold", color: "#f4f3f3" }}
                    >
                        {navig.label}
                    </Text>
                </NavLink>
            ))}
            {/* <div className="sidenav_footer">The nav footer</div> */}
        </nav>
    );
};

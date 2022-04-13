import { FontIcon, IIconProps, SearchBox, Text } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { IconButton } from "@fluentui/react/lib/Button";
import { CurrentUserDetailsComponent } from "../user/current-user-details/current_user_details.component";

export interface IHeaderDashboardProps {
    default_props?: boolean;
}

const menuIcon: IIconProps = { iconName: "ResponsesMenu" };

export const HeaderDashboardComponent: React.FC<IHeaderDashboardProps> = () => {
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

    useEffect(() => {
        if (isMobile) {
            mobileCloseNav();
        } else {
            openNav();
        }
    }, [isMobile]);

    const openNav = () => {
        (
            document.getElementById("sidenav_panel") as HTMLInputElement
        ).style.width = "250px";
        console.log(
            "the test:",
            (document.getElementById("section") as HTMLInputElement).offsetWidth
        );
    };
    const closeNav = () => {
        (
            document.getElementById("sidenav_panel") as HTMLInputElement
        ).style.width = "60px";
        (
            document.getElementById("section") as HTMLInputElement
        ).style.marginLeft = "0";
    };
    const mobileCloseNav = () => {
        (
            document.getElementById("sidenav_panel") as HTMLInputElement
        ).style.width = "0";
        (
            document.getElementById("section") as HTMLInputElement
        ).style.marginLeft = "0";
    };

    const toggleNav = () => {
        let sidenavBar = document.getElementById(
            "sidenav_panel"
        ) as HTMLInputElement;

        if (sidenavBar.offsetWidth >= 200) {
            closeNav();
        } else {
            openNav();
        }
    };

    return (
        <div className="header_dashboard_container">
            <div className="header_left">
                <div className="header_toggle">
                    <IconButton
                        iconProps={menuIcon}
                        title="Menu"
                        className="toggle_button"
                        onClick={toggleNav}
                    />
                </div>
                <CurrentUserDetailsComponent />
            </div>
            <div className="header_center">
                <SearchBox
                    placeholder="Search"
                    onSearch={(newValue) => console.log("value is " + newValue)}
                    className="header_dashboard_search"
                />
            </div>
            <div className="header_right">Right div Logo</div>
        </div>
    );
};

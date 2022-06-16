import React, { useEffect, useState } from "react";
import { FontIcon, IIconProps, SearchBox, Text } from "@fluentui/react";
import { Image, IImageProps, ImageFit } from "@fluentui/react/lib/Image";
import { IconButton } from "@fluentui/react/lib/Button";
import { CurrentUserDetailsComponent } from "../users_components/current-user-details/current_user_details.component";
import { useAuthStore } from "../../stores";
import CompanyService from "../../services/company.service";
import { ICompany } from "../../lib/interfaces/Company";
import { prefixer } from "../../services/urls";
import { SUPER_USER } from "../../lib";

export interface IHeaderDashboardProps {
    default_props?: boolean;
}

const imageProps: IImageProps = {
    imageFit: ImageFit.cover,
    width: "100%",
    height: "100%",
    // Show a border around the image (just for demon stration purposes)
    styles: (props) => ({
        root: { backgroundSize: "cover" },
    }),
};

const menuIcon: IIconProps = { iconName: "ResponsesMenu" };

export const HeaderDashboardComponent: React.FC<IHeaderDashboardProps> = () => {
    const { user } = useAuthStore();

    const [organization, setOrganization] = useState<ICompany>();
    const [trainingComp, setTrainingComp] = useState<ICompany>();

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

    useEffect(() => {
        console.log("le current user:", user);
    }, [user]);

    const openNav = () => {
        (
            document.getElementById("sidenav_panel") as HTMLInputElement
        ).style.width = "170px";
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

        if (sidenavBar.offsetWidth >= 170) {
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
                <CurrentUserDetailsComponent user={user} />
            </div>
            <div className="header_center">
                {user?.user_type === SUPER_USER ? (
                    <SearchBox
                        placeholder="Search"
                        onSearch={(newValue) =>
                            console.log("value is " + newValue)
                        }
                        className="header_dashboard_search"
                    />
                ) : (
                    <Text
                        variant="xLargePlus"
                        style={{ fontWeight: "bold", color: "#fff" }}
                    >
                        {user?.organisme_formation &&
                            user.organisme_formation[0] != undefined &&
                            user.organisme_formation[0].company_name}
                        {user.appartenir_societe &&
                            user.appartenir_societe[0] != undefined &&
                            user.appartenir_societe[0].company_name}
                    </Text>
                )}
            </div>
            <div className="header_right">
                <Image
                    {...imageProps}
                    src={
                        user &&
                        user.organisme_formation &&
                        user.organisme_formation[0] != undefined
                            ? prefixer +
                              user.organisme_formation[0].company_logo
                            : user &&
                              user.appartenir_societe &&
                              user.appartenir_societe[0] != undefined
                            ? prefixer + user.appartenir_societe[0].company_logo
                            : "https://images.unsplash.com/photo-1638913659197-46040471de1d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470"
                    }
                    alt='"none" on an image larger than the frame.'
                />
            </div>
        </div>
    );
};

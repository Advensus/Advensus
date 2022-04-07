import React from "react";
import {
    ActionButton,
    DefaultButton,
    Callout,
    Link,
    Text,
    mergeStyleSets,
    FontWeights,
} from "@fluentui/react";
import { useBoolean, useId } from "@fluentui/react-hooks";

export interface INavBarProps {
    default_props?: boolean;
}

export const NavBarComponent: React.FC<INavBarProps> = () => {
    const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
        useBoolean(false);
    const buttonId = useId("callout-button");
    const labelId = useId("callout-label");
    const descriptionId = useId("callout-description");
    window.onscroll = () => {
        if (document.documentElement.scrollTop > 100) {
            (
                document.getElementById("navbar") as HTMLInputElement
            ).style.background = "#cd2a2a";
            // (
            //     document.getElementById("navbar") as HTMLInputElement
            // ).style.opacity = "1";
            (
                document.getElementById("logo") as HTMLInputElement
            ).style.fontSize = "25px";
        } else {
            (
                document.getElementById("navbar") as HTMLInputElement
            ).style.background = "#de4225";
            // (
            //     document.getElementById("navbar") as HTMLInputElement
            // ).style.background = "0";
            (
                document.getElementById("logo") as HTMLInputElement
            ).style.fontSize = "35px";
        }
    };

    return (
        <div className="navbarcomponent" id="navbar">
            <div className="navbar-left">
                <a href="#" id="logo">
                    Logo
                </a>
                {/* <div className="navbar-center"></div> */}
            </div>
            <div id="navbar-right">
                {/* <a href="#">Fonctionnalités</a> */}
                <ActionButton
                    text="Fonctionnalités"
                    className="navbaractionbutton"
                    id={buttonId}
                    onClick={toggleIsCalloutVisible}
                    // text={isCalloutVisible ? "Hide callout" : "Show callout"}
                    // className={styles.button}
                />
                {isCalloutVisible && (
                    <Callout
                        // className={styles.callout}
                        className="calloutclass"
                        ariaLabelledBy={labelId}
                        ariaDescribedBy={descriptionId}
                        gapSpace={0}
                        target={`#${buttonId}`}
                        onDismiss={toggleIsCalloutVisible}
                        setInitialFocus
                    >
                        <Text
                            block
                            variant="xLarge"
                            className={styles.title}
                            id={labelId}
                        >
                            Callout title here
                        </Text>
                        <div>
                            <Text block variant="small" id={descriptionId}>
                                Message body is optional. If help documentation
                                is available, consider adding a link to learn
                                more at the bottom.
                            </Text>
                            <Link
                                href="http://microsoft.com"
                                target="_blank"
                                className={styles.link}
                            >
                                Sample link
                            </Link>
                        </div>
                        <div>other element</div>
                    </Callout>
                )}
                <a href="#" id="link">
                    Ressources
                </a>
                <a href="#">Contact</a>
                <DefaultButton
                    text="CONNEXION"
                    className="navbardefaultbutton"
                />
            </div>
        </div>
    );
};

const styles = mergeStyleSets({
    button: {
        width: 130,
    },
    callout: {
        width: "100%",
        maxWidth: "90%",
        padding: "20px 24px",
    },
    title: {
        marginBottom: 12,
        fontWeight: FontWeights.semilight,
    },
    link: {
        display: "block",
        marginTop: 20,
    },
});

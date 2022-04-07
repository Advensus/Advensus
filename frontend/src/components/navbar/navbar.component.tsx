import React from "react";
import {
    ActionButton,
    DefaultButton,
    Callout,
    Text,
    mergeStyleSets,
    FontWeights,
} from "@fluentui/react";
import { useBoolean, useId } from "@fluentui/react-hooks";
import { Link, useNavigate } from "react-router-dom";

export interface INavBarProps {
    default_props?: boolean;
}

export const NavBarComponent: React.FC<INavBarProps> = () => {
    let navigate = useNavigate();
    const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
        useBoolean(false);
    const buttonId = useId("callout-button");
    const labelId = useId("callout-label");
    const descriptionId = useId("callout-description");
    window.onscroll = () => {
        if (document.documentElement.scrollTop > 58) {
            (
                document.getElementById("navbar") as HTMLInputElement
            ).style.background = "#d7d0d0";
            // (
            //     document.getElementById("navbar") as HTMLInputElement
            // ).style.opacity = "1";
            (
                document.getElementById("logo") as HTMLInputElement
            ).style.fontSize = "25px";
        } else {
            (
                document.getElementById("navbar") as HTMLInputElement
            ).style.background = "#cedbe8";
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
                {/* <a href="#" id="logo">
                    Logo
                </a> */}
                <Link to="/" id="logo">
                    Logo
                </Link>
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
                        // className="{styles.callout}, calloutclass"
                        className="calloutclass"
                        // ariaLabel=""
                        ariaLabelledBy={labelId}
                        ariaDescribedBy={descriptionId}
                        gapSpace={0}
                        target={`#${buttonId}`}
                        onDismiss={toggleIsCalloutVisible}
                        setInitialFocus
                    >
                        <div className="calloutcontent">
                            <div className="calloutcontenti">
                                <Text variant="large">
                                    Formation à distance
                                </Text>
                                <div>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Distinctio suscipit in
                                        labore! Facere doloremque, odio
                                        distinctio vitae tempora consequuntur,
                                        voluptatibus qui ratione adipisci
                                        aspernatur reprehenderit error unde quia
                                        nesciunt dolores.
                                    </p>
                                </div>
                            </div>
                            <div className="calloutcontenti">
                                <Text variant="large">Emagement numérique</Text>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Expedita suscipit nulla
                                    incidunt omnis perspiciatis at doloremque
                                    hic, fugiat neque obcaecati optio, id ea
                                    maiores voluptas officiis eveniet quam,
                                    exercitationem sapiente.
                                </p>
                            </div>
                            <div className="calloutcontenti">
                                <Text variant="large">
                                    Gestion administrative
                                </Text>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Pariatur quibusdam optio
                                    laboriosam itaque sint. Quia sapiente quis,
                                    iure laborum, explicabo, cupiditate quisquam
                                    aut in saepe eum animi vel harum placeat!
                                </p>
                            </div>
                        </div>
                    </Callout>
                )}

                <Link to="#">Ressoureces</Link>
                <Link to="#">Contact</Link>
                <DefaultButton
                    text="CONNEXION"
                    className="navbardefaultbutton"
                    onClick={() => navigate("/auth/login")}
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
        maxWidth: "98%",
        // padding: "20px 24px",
        // fontSize:
    },
    title: {
        marginBottom: 12,
        fontWeight: FontWeights.semilight,
        fontSize: "large",
    },
    link: {
        display: "block",
        marginTop: 20,
    },
});

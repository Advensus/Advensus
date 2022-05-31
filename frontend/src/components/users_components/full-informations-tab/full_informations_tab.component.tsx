import {
    IconButton,
    IIconProps,
    Pivot,
    PivotItem,
    SearchBox,
    Text,
    TooltipHost,
} from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import {
    Dropdown,
    DropdownMenuItemType,
    IDropdownOption,
    IDropdownStyles,
} from "@fluentui/react/lib/Dropdown";
import React, { FormEvent, useEffect, useState } from "react";
import { SmallCompanyCardComponent, TrainingDetailsComponent } from "../..";
import {
    ITraining,
    IUser,
    PATH_LABEL_COMPANY,
    PATH_LABEL_CUSTOMER,
    PATH_LABEL_ORGANIZATION,
    PATH_LABEL_RESOURCES,
    PATH_LABEL_SERVICES,
} from "../../../lib";
import TrainingService from "../../../services/training.service";
import UserService from "../../../services/user.service";
import { BookingCardComponent } from "../../booking_component/booking-card/booking_card.component";
import { TrainingOrgTraineesDisplayComponent } from "../../training_org_components/training_org_trainees_display/training_org_trainees_display";
import { UserDetailsComponent } from "../user-details/user_details.component";
import { Panel } from "@fluentui/react/lib/Panel";
import { useBoolean } from "@fluentui/react-hooks";
import { ICompany } from "../../../lib/interfaces/Company";
import { CompanyDetailsComponent } from "../../company_components/company_details/company_details.component";

export interface IFullInformationsTabProps {
    default_props?: boolean;
    contentId?: string;
    currentPath: string;
    company?: ICompany;
}

const planIcon: IIconProps = { iconName: "PlanView" };

export const FullInformationsTabComponent: React.FC<
    IFullInformationsTabProps
> = ({ contentId, currentPath, company }) => {
    const [content, setContent] = useState<IUser>();
    const [training, setTraining] = useState<ITraining>();
    const [currentTab, setCurrentTab] = useState<PivotItem>();
    const tooltipId = useId("toolt!p");
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
        useBoolean(false);

    const [selectedBooking, setSelectedBooking] =
        React.useState<IDropdownOption>();

    const onChange = (
        event: FormEvent<HTMLDivElement>,
        item?: IDropdownOption<any>
    ): void => {
        setSelectedBooking(item);
    };

    useEffect(() => {
        if (contentId) {
            if (currentPath === PATH_LABEL_SERVICES) {
                const emptyContent = {} as IUser;
                setContent(emptyContent);
            } else {
                const emptyTraining = {} as ITraining;
                setTraining(emptyTraining);
            }
            if (
                currentPath === PATH_LABEL_RESOURCES ||
                currentPath === PATH_LABEL_SERVICES ||
                currentPath === PATH_LABEL_CUSTOMER
            ) {
                getContentById(contentId);
            }
            if (currentPath === PATH_LABEL_COMPANY) {
                console.log("on lance ge getCompanyById ici");
                console.log({ company });
            }
        }
    }, [contentId, currentTab]);

    useEffect(() => {
        console.log("the tab current:", selectedBooking);
    }, [selectedBooking]);

    const getContentById = (id: string) => {
        const serviceToCall =
            currentPath === PATH_LABEL_SERVICES
                ? TrainingService.get_training_by_id(id)
                : UserService.get_user_by_id(id);

        serviceToCall
            .then((response) => {
                if (response.status !== 200) {
                    return;
                }

                return response.json();
            })
            .then(
                currentPath === PATH_LABEL_SERVICES
                    ? (resp: ITraining) => {
                          console.log({ resp });
                          setTraining(resp);
                      }
                    : (resp: IUser) => {
                          console.log({ resp });
                          setContent(resp);
                      }
            )
            .catch((err) => {
                console.log("error while getting content by his id:", err);
            });
    };

    return (
        <div className="full_infos_tab_container">
            <div className="full_infos_tab_header">
                <div className="full_infos_tab_header_title">
                    {(currentPath === PATH_LABEL_RESOURCES ||
                        currentPath === PATH_LABEL_CUSTOMER) && (
                        <Text>
                            {content?.username !== undefined &&
                                content?.username.toUpperCase()}{" "}
                            {""}
                            {content?.first_name}
                        </Text>
                    )}
                    {currentPath === PATH_LABEL_CUSTOMER && (
                        <TooltipHost content="Planifier" id={tooltipId}>
                            <IconButton
                                iconProps={planIcon}
                                // menuIconProps={{ iconName: "ClipboardListAdd" }}
                                ariaLabel="add"
                                // onClick={() =>
                                //     showAddForm(
                                //         pathLabel === PATH_LABEL_RESOURCES
                                //             ? TEACHEAR_FORM
                                //             : pathLabel === PATH_LABEL_CUSTOMER
                                //             ? TRAINEE_FORM
                                //             : SERVICES_FORM
                                //     )
                                // }
                            />
                        </TooltipHost>
                    )}
                    {currentPath === PATH_LABEL_SERVICES && (
                        <Text>{training?.intitule}</Text>
                    )}
                    {(currentPath === PATH_LABEL_ORGANIZATION ||
                        currentPath === PATH_LABEL_COMPANY) && (
                        <Text style={{ fontWeight: "bold" }}>
                            {company?.company_name}
                        </Text>
                    )}
                </div>
                <hr className="full_infos_tab_hr_dashed" />
            </div>
            <div
                className={
                    currentTab?.props.headerText === "Services" ||
                    currentTab?.props.headerText === "Réservations"
                        ? "full_infos_tab_body_services "
                        : "full_infos_tab_body"
                }
            >
                <Pivot
                    aria-label="Links of Large Tabs Pivot Example"
                    // linkFormat="tabs"
                    linkSize="large"
                    onLinkClick={(item) => {
                        setCurrentTab(item);
                    }}
                >
                    {/* FOR DETAILS TAB */}
                    <PivotItem
                        headerText="Details"
                        className="label_details_tab_container"
                    >
                        {currentPath === PATH_LABEL_SERVICES ? (
                            <>
                                <TrainingDetailsComponent
                                    detailTraining={training}
                                />
                                {/* JUST FOR SERVICES */}
                                <div className="full_infos_resources_own">
                                    <Text variant="large"> Mes Ressources</Text>
                                    <hr className="full_infos_hr_solid" />
                                    <div className="resources_own_small_card_container">
                                        <div className="resources_own_start">
                                            <div className="res_cycle">
                                                <Text
                                                    variant="small"
                                                    style={{
                                                        color: "#fff",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    RES
                                                </Text>
                                            </div>
                                            <div className="res_info">
                                                <Text
                                                    variant="large"
                                                    style={{
                                                        fontWeight: "lighter",
                                                    }}
                                                >
                                                    Name blabla bla
                                                </Text>
                                                <Text
                                                    className="tag_online"
                                                    variant="tiny"
                                                >
                                                    Online
                                                </Text>
                                            </div>
                                        </div>
                                        <IconButton
                                            menuIconProps={{
                                                iconName: "ChevronRightSmall",
                                            }}
                                            className="res_action"
                                        />
                                    </div>
                                </div>
                            </>
                        ) : currentPath === PATH_LABEL_COMPANY ||
                          currentPath === PATH_LABEL_ORGANIZATION ? (
                            <CompanyDetailsComponent
                                company={company}
                                currentPath={currentPath}
                            />
                        ) : (
                            <UserDetailsComponent
                                contentToDetail={content}
                                currentPath={currentPath}
                            />
                        )}
                        {/* FOR SERVICES TAB */}
                    </PivotItem>
                    {currentPath === PATH_LABEL_RESOURCES && (
                        <PivotItem
                            headerText="Formations"
                            className="label_service_tab_container"
                        >
                            {" "}
                            <Text
                                variant="mediumPlus"
                                style={{ fontWeight: "bold" }}
                            >
                                Par défaut
                            </Text>
                            <hr className="full_infos_hr_solid" />
                            <div className="display_serv_item">
                                <Text
                                    variant="small"
                                    style={{ fontWeight: "bolder" }}
                                >
                                    Service name
                                </Text>
                            </div>
                            <div className="display_serv_item">
                                <Text
                                    variant="small"
                                    style={{ fontWeight: "bolder" }}
                                >
                                    Service name
                                </Text>
                            </div>
                            <div className="display_serv_item">
                                <Text
                                    variant="small"
                                    style={{ fontWeight: "bolder" }}
                                >
                                    Service name
                                </Text>
                            </div>
                        </PivotItem>
                    )}
                    {/* FOR BOOKING TAB */}
                    {(currentPath === PATH_LABEL_RESOURCES ||
                        currentPath === PATH_LABEL_CUSTOMER) && (
                        <PivotItem
                            headerText="Réservations"
                            className="label_booking_tab_container"
                        >
                            <Dropdown
                                label="Voir toutes les réservations"
                                selectedKey={
                                    selectedBooking
                                        ? selectedBooking.key
                                        : undefined
                                }
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange={onChange}
                                placeholder="Select an option"
                                options={dropdownControlledBookingState}
                                // styles={dropdownStyles}
                                className="booking_dropdown_state"
                            />
                            <div className="result_display_booking">
                                {/* <div className="booking_not_found">
                                    <Text
                                        variant="medium"
                                        style={{ color: "grey" }}
                                    >
                                        No Booking
                                    </Text>
                                </div> */}
                                <Text
                                    variant="small"
                                    style={{ marginTop: 5, fontWeight: "bold" }}
                                >
                                    {selectedBooking?.text}
                                </Text>
                                <hr className="booking_result_hr_solid" />
                                <div className="booking_list">
                                    <BookingCardComponent
                                        openPanel={openPanel}
                                    />
                                    <BookingCardComponent
                                        openPanel={openPanel}
                                    />
                                    <BookingCardComponent
                                        openPanel={openPanel}
                                    />
                                    <div>
                                        <br />
                                        <br />
                                        <Panel
                                            isLightDismiss
                                            isOpen={isOpen}
                                            onDismiss={dismissPanel}
                                            closeButtonAriaLabel="Close"
                                            headerText="Détails de la Réservation"
                                        >
                                            <p>
                                                'This panel uses "light dismiss"
                                                behavior: it can be closed by
                                                clicking or tapping ' + 'the
                                                area outside the panel (or using
                                                the close button as usual).';
                                            </p>
                                        </Panel>
                                    </div>
                                </div>
                            </div>
                        </PivotItem>
                    )}

                    {currentPath === PATH_LABEL_ORGANIZATION && (
                        <PivotItem headerText="Stagiaires">
                            <TrainingOrgTraineesDisplayComponent
                                openPanel={openPanel}
                            />
                            <div>
                                <br />
                                <br />
                                <Panel
                                    isLightDismiss
                                    isOpen={isOpen}
                                    onDismiss={dismissPanel}
                                    closeButtonAriaLabel="Close"
                                    headerText="Détails Stagaire"
                                >
                                    <p>
                                        'This panel uses "light dismiss"
                                        behavior: it can be closed by clicking
                                        or tapping ' + 'the area outside the
                                        panel (or using the close button as
                                        usual).';
                                    </p>
                                </Panel>
                            </div>
                        </PivotItem>
                    )}
                    {currentPath === PATH_LABEL_COMPANY && (
                        <PivotItem headerText="Organisme(s)">
                            <div>
                                <SearchBox
                                    placeholder="Search"
                                    underlined={true}
                                    className="item_organisation_searcbar"
                                />
                                <SmallCompanyCardComponent
                                    openPanel={openPanel}
                                />
                                <SmallCompanyCardComponent
                                    openPanel={openPanel}
                                />
                                <SmallCompanyCardComponent
                                    openPanel={openPanel}
                                />
                                <SmallCompanyCardComponent
                                    openPanel={openPanel}
                                />
                                <SmallCompanyCardComponent
                                    openPanel={openPanel}
                                />
                                <SmallCompanyCardComponent
                                    openPanel={openPanel}
                                />
                                <SmallCompanyCardComponent
                                    openPanel={openPanel}
                                />
                            </div>
                            <div>
                                <br />
                                <br />
                                <Panel
                                    isLightDismiss
                                    isOpen={isOpen}
                                    onDismiss={dismissPanel}
                                    closeButtonAriaLabel="Close"
                                    headerText={company?.company_name}
                                >
                                    <p>
                                        'This panel uses "light dismiss"
                                        behavior: it can be closed by clicking
                                        or tapping ' + 'the area outside the
                                        panel (or using the close button as
                                        usual).';
                                    </p>
                                    <div>{company?.company_adress}</div>
                                </Panel>
                            </div>
                        </PivotItem>
                    )}
                </Pivot>
            </div>
        </div>
    );
};

const dropdownControlledBookingState = [
    { key: "upcoming", text: "Réservation(s) à venir" },
    { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },

    { key: "past", text: "Réservation(s) passée(s)" },
    { key: "divider_2", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "cancelled", text: "Réservation(s) annulée(s)" },
];
const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { borderRadius: "10px" },
};

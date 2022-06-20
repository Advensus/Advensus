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
import {
    AttributeDisplayComponent,
    SmallCompanyCardComponent,
    TrainingDetailsComponent,
    EmptyComponent,
} from "../..";
import {
    ITraining,
    IUser,
    PATH_LABEL_COMPANY,
    PATH_LABEL_CUSTOMER,
    PATH_LABEL_ORGANIZATION,
    PATH_LABEL_RESOURCES,
    PATH_LABEL_SERVICES,
    TRAINEE,
} from "../../../lib";
import TrainingService from "../../../services/training.service";
import UserService from "../../../services/user.service";
import { BookingCardComponent } from "../../booking_component/booking-card/booking_card.component";
import { TrainingOrgTraineesDisplayComponent } from "../../training_org_components/training_org_trainees_display/training_org_trainees_display";
import { UserDetailsComponent } from "../user-details/user_details.component";
import { Panel } from "@fluentui/react/lib/Panel";
import { useBoolean } from "@fluentui/react-hooks";
import { ICompany, IOrg } from "../../../lib/interfaces/Company";
import { CompanyDetailsComponent } from "../../company_components/company_details/company_details.component";
import { CertificateCardComponent } from "../../certificate_card/certificate_card.component";
import { CertificateFormComponent } from "../../forms/certificate_form/certificateForm.component";
import { TrainingProgramFormComponent } from "../../forms/training_program_form/trainingProgramForm.component";
import { ICertificate } from "../../../lib/interfaces/Certificate";
import { LoadingComponent } from "../../loading_component/Loading.component";
import CompanyService from "../../../services/company.service";
import { useNavigate } from "react-router-dom";

export interface IFullInformationsTabProps {
    default_props?: boolean;
    contentId?: string;
    user?: IUser;
    trainings?: ITraining[];
    training?: ITraining;
    currentPath: string;
    company?: ICompany;
    org?: IOrg;
}

const planIcon: IIconProps = { iconName: "PlanView" };
const addIcon: IIconProps = { iconName: "Add" };

export const FullInformationsTabComponent: React.FC<
    IFullInformationsTabProps
> = ({ contentId, currentPath, company, trainings, user, org, training }) => {
    const navigate = useNavigate();

    const [content, setContent] = useState<IUser>();
    // const [training, setTraining] = useState<ITraining>();
    const [formersTrainings, setFormersTrainings] = useState<IUser[]>([]);
    const [currentTab, setCurrentTab] = useState<PivotItem>();
    const tooltipId = useId("toolt!p");
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
        useBoolean(false);
    const [showCertificateForm, setShowCertificateForm] =
        useState<Boolean>(false);
    const [showTrainingProgramForm, setShowTrainingProgramForm] =
        useState<Boolean>(false);
    const [selectedBooking, setSelectedBooking] =
        React.useState<IDropdownOption>();
    const [certificates, setCertificates] = useState<ICertificate[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [filteredCertif, setFilteredCertif] = useState<ICertificate[]>([]);
    const [filteredCompanyOrg, setFilteredCompanyOrg] = useState<ICompany[]>(
        []
    );
    const [filteredOrgTrainees, setFilteredOrgTrainees] = useState<IUser[]>([]);
    const [traineesOrg, setTraineesOrg] = useState<IUser[]>([]);
    const [orgsCompant, setOrgsCompant] = useState<ICompany[]>([]);

    const onChange = (
        event: FormEvent<HTMLDivElement>,
        item?: IDropdownOption<any>
    ): void => {
        setSelectedBooking(item);
    };
    const filterIcon: IIconProps = { iconName: "Filter" };

    useEffect(() => {
        console.log({ training });
        console.log({ currentPath });
        if (org && currentPath === PATH_LABEL_ORGANIZATION) {
            getTraineeByOrgId(org.id);
        }
        if (company && currentPath === PATH_LABEL_COMPANY) {
            getOrgByCompnanyId(company.id);
        }
        if (training && currentPath === PATH_LABEL_SERVICES) {
            getFormerByTrainingId(training.id);
            getCertificateByTrainingId(training.id);
        }
        if (contentId) {
            if (currentPath === PATH_LABEL_SERVICES) {
                const emptyContent = {} as IUser;
                setContent(emptyContent);
                // getCertificateByTrainingId(contentId);
            }
            // else {
            //     const emptyTraining = {} as ITraining;
            //     setTraining(emptyTraining);
            // }
            if (
                currentPath === PATH_LABEL_RESOURCES ||
                currentPath === PATH_LABEL_SERVICES ||
                currentPath === PATH_LABEL_CUSTOMER
            ) {
                // getContentById(contentId);
            }
            if (currentPath === PATH_LABEL_COMPANY) {
                console.log("on lance ge getCompanyById ici");
                console.log({ company });
            }
        }
    }, [contentId, currentTab, search, training]);

    useEffect(() => {
        console.log("the tab current:", selectedBooking);
    }, [selectedBooking]);

    // const getContentById = (id: string) => {
    //     const serviceToCall =
    //         currentPath === PATH_LABEL_SERVICES
    //             ? TrainingService.get_training_by_id(id)
    //             : UserService.get_user_by_id(id);

    //     serviceToCall
    //         .then((response) => {
    //             if (response.status !== 200) {
    //                 return;
    //             }

    //             return response.json();
    //         })
    //         .then(
    //             currentPath === PATH_LABEL_SERVICES
    //                 ? (resp: ITraining) => {
    //                       setTraining(resp);
    //                   }
    //                 : (resp: IUser) => {
    //                       console.log({ resp });
    //                       setContent(resp);
    //                   }
    //         )
    //         .catch((err) => {
    //             console.log("error while getting content by his id:", err);
    //         });
    // };

    const filterCertificates = (searchTerm: string) => {
        return certificates.filter(
            (_) =>
                `${_.intitule} ${_.code} ${_.objectif}`.indexOf(searchTerm) !==
                -1
        );
    };
    const filterCompanyOrg = (searchTerm: string) => {
        return orgsCompant.filter(
            (_) =>
                `${_.company_name} ${_.company_adress} ${_.company_phone_number}`.indexOf(
                    searchTerm
                ) !== -1
        );
    };
    const filterOrgTrainees = (searchTerm: string) => {
        return traineesOrg.filter(
            (_) =>
                `${_.first_name} ${_.username} ${_.email} ${_.adress}`.indexOf(
                    searchTerm
                ) !== -1
        );
    };

    const getTraineeByOrgId = (orgId: string) => {
        if (filterOrgTrainees.length > 0) setLoading(true);
        UserService.get_trainee_by_org_id(orgId)
            .then((response) => {
                if (response.status !== 200) {
                    return;
                }
                setLoading(false);
                return response.json();
            })
            .then((resTrainee: IUser[]) => {
                setTraineesOrg(resTrainee);

                const searchByKeyWord = search
                    ? filterOrgTrainees(search)
                    : resTrainee;
                setFilteredOrgTrainees(searchByKeyWord);
                setLoading(false);
            })
            .catch((err) => {
                console.log("error while getting trainee by org id:", err);
                setLoading(false);
            });
    };

    const getOrgByCompnanyId = (companyId: string) => {
        if (filteredCompanyOrg.length > 0) setLoading(true);
        CompanyService.get_org_by_compnany_id(companyId)
            .then((response) => {
                if (response.status !== 200) {
                    return;
                }
                setLoading(false);
                return response.json();
            })
            .then((respOrg: ICompany[]) => {
                setOrgsCompant(respOrg);

                const searchByKeyWord = search
                    ? filterCompanyOrg(search)
                    : respOrg;
                setFilteredCompanyOrg(searchByKeyWord);
                setLoading(false);
            })
            .catch((err) => {
                console.log("error while getting org by company id:", err);
                setLoading(false);
            });
    };

    const getFormerByTrainingId = (idTraining: string) => {
        UserService.get_former_by_training_id(idTraining)
            .then((response) => {
                if (response.status !== 200) {
                    return;
                }
                setLoading(false);
                return response.json();
            })
            .then((respFormer: IUser[]) => {
                console.log({ respFormer });
                setFormersTrainings(respFormer);
                setLoading(false);
            })
            .catch((err) => {
                console.log("error while getting former by training id:", err);
                setLoading(false);
            });
    };

    const getCertificateByTrainingId = (id: string) => {
        if (filterCertificates.length > 0) setLoading(true);
        TrainingService.get_certificate_by_training_id(id)
            .then((response) => {
                if (response.status !== 200) {
                    return;
                }
                setLoading(false);
                return response.json();
            })
            .then((respCertif: ICertificate[]) => {
                console.log("response in get certif:", respCertif);
                setCertificates(respCertif);
                setLoading(false);

                const searchByKeyWord = search
                    ? filterCertificates(search)
                    : respCertif;
                setFilteredCertif(searchByKeyWord);
            })
            .catch((err) => {
                console.log("error while getting certif by training id:", err);
                setLoading(false);
            });
    };

    const showAddCertifForm = () => {
        // showAddTrainingProgramForm();
        setShowTrainingProgramForm(false);
        showCertificateForm
            ? setShowCertificateForm(!showCertificateForm)
            : setShowCertificateForm(!showCertificateForm);
    };
    const showAddTrainingProgramForm = () => {
        // showAddCertifForm();
        setShowCertificateForm(false);
        showTrainingProgramForm
            ? setShowTrainingProgramForm(!showTrainingProgramForm)
            : setShowTrainingProgramForm(!showTrainingProgramForm);
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
                    {currentPath === PATH_LABEL_CUSTOMER &&
                        user?.user_type === TRAINEE && (
                            <TooltipHost content="Planifier" id={tooltipId}>
                                <IconButton
                                    iconProps={planIcon}
                                    ariaLabel="add"
                                    onClick={() => {
                                        console.log("on fait le navigate ici");
                                        navigate("/dashboard/planne", {
                                            state: { userInfos: user },
                                        });
                                    }}
                                />
                            </TooltipHost>
                        )}
                    {currentPath === PATH_LABEL_SERVICES &&
                        !showCertificateForm &&
                        !showTrainingProgramForm && (
                            <Text>{training?.intitule}</Text>
                        )}
                    {currentPath === PATH_LABEL_SERVICES && (
                        <>
                            <TooltipHost
                                content="Ajouter programme"
                                id={tooltipId}
                            >
                                <IconButton
                                    menuIconProps={{ iconName: "Add" }}
                                    ariaLabel="add"
                                    onClick={showAddTrainingProgramForm}
                                />
                            </TooltipHost>
                            <TooltipHost
                                content="Nouvelle Certification"
                                id={tooltipId}
                            >
                                <IconButton
                                    menuIconProps={{ iconName: "Add" }}
                                    ariaLabel="add"
                                    onClick={showAddCertifForm}
                                />
                            </TooltipHost>
                        </>
                    )}
                    {currentPath === PATH_LABEL_COMPANY && (
                        <Text style={{ fontWeight: "bold" }}>
                            {company?.company_name}
                        </Text>
                    )}
                    {currentPath === PATH_LABEL_ORGANIZATION && (
                        <Text style={{ fontWeight: "bold" }}>
                            {org?.company_name}
                        </Text>
                    )}
                </div>
                <hr className="full_infos_tab_hr_dashed" />
            </div>
            {!showCertificateForm && !showTrainingProgramForm && (
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
                                        <Text variant="large">
                                            Mes Ressources
                                        </Text>
                                        <hr className="full_infos_hr_solid" />
                                        {loading ? (
                                            <LoadingComponent />
                                        ) : formersTrainings.length ? (
                                            formersTrainings.map((_) => (
                                                <div
                                                    className="resources_own_small_card_container"
                                                    key={_.id}
                                                >
                                                    <div className="resources_own_start">
                                                        <div className="res_cycle">
                                                            <Text
                                                                variant="small"
                                                                style={{
                                                                    color: "#fff",
                                                                    fontWeight:
                                                                        "bold",
                                                                }}
                                                            >
                                                                RES
                                                            </Text>
                                                        </div>
                                                        <div className="res_info">
                                                            <Text
                                                                variant="large"
                                                                style={{
                                                                    fontWeight:
                                                                        "lighter",
                                                                }}
                                                            >
                                                                {_.first_name +
                                                                    " " +
                                                                    _.username}
                                                            </Text>
                                                            <Text
                                                                className="tag_online"
                                                                variant="tiny"
                                                            >
                                                                Online
                                                            </Text>
                                                        </div>
                                                    </div>
                                                    <Panel
                                                        isLightDismiss
                                                        isOpen={isOpen}
                                                        onDismiss={dismissPanel}
                                                        closeButtonAriaLabel="Close"
                                                        headerText="Détails du formateur"
                                                    >
                                                        <br />
                                                        <AttributeDisplayComponent
                                                            keyWord="Formateur Id"
                                                            valueWord={_.id}
                                                        />
                                                        <AttributeDisplayComponent
                                                            keyWord="Prénom"
                                                            valueWord={
                                                                _.first_name
                                                            }
                                                        />
                                                        <AttributeDisplayComponent
                                                            keyWord="Nom"
                                                            valueWord={
                                                                _.username
                                                            }
                                                        />
                                                        <AttributeDisplayComponent
                                                            keyWord="Email"
                                                            valueWord={_.email}
                                                        />
                                                        <AttributeDisplayComponent
                                                            keyWord="Adress"
                                                            valueWord={_.adress}
                                                        />
                                                        <AttributeDisplayComponent
                                                            keyWord="Sté Formateur"
                                                            valueWord={
                                                                _.appartenir_societe &&
                                                                _
                                                                    ?.appartenir_societe[0]
                                                                    ?.company_name
                                                            }
                                                        />
                                                    </Panel>
                                                    <IconButton
                                                        menuIconProps={{
                                                            iconName:
                                                                "ChevronRightSmall",
                                                        }}
                                                        className="res_action"
                                                        onClick={openPanel}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <EmptyComponent
                                                messageText="Pas de Formateur pour cette
                                                    Formation"
                                            />
                                        )}
                                    </div>
                                </>
                            ) : currentPath === PATH_LABEL_COMPANY ||
                              currentPath === PATH_LABEL_ORGANIZATION ? (
                                <CompanyDetailsComponent
                                    company={company}
                                    org={org}
                                    currentPath={currentPath}
                                />
                            ) : (
                                <UserDetailsComponent
                                    contentToDetail={user}
                                    currentPath={currentPath}
                                />
                            )}
                        </PivotItem>
                        {/* FOR SERVICES TAB */}
                        {currentPath === PATH_LABEL_SERVICES && (
                            <PivotItem
                                headerText="Certifications"
                                className="label_certif_tab_container"
                            >
                                <SearchBox
                                    placeholder="Search"
                                    onEscape={(ev) => {
                                        setSearch("");
                                    }}
                                    onClear={(ev) => {
                                        setSearch("");
                                    }}
                                    onChange={(_, newValue) =>
                                        setSearch(newValue || "")
                                    }
                                    className="label_service_tab_certif_search"
                                />
                                <hr className="certif_hr_solid" />
                                <div className="label_certif_tab_display_card">
                                    {loading ? (
                                        <LoadingComponent />
                                    ) : filteredCertif.length > 0 ? (
                                        filteredCertif.map((_) => (
                                            <div key={_.id}>
                                                <CertificateCardComponent
                                                    openPanel={openPanel}
                                                    key={_.id}
                                                    certificate={_}
                                                />
                                                <Panel
                                                    isLightDismiss
                                                    isOpen={isOpen}
                                                    onDismiss={dismissPanel}
                                                    closeButtonAriaLabel="Close"
                                                    headerText={
                                                        "Certification" +
                                                        " " +
                                                        _.intitule
                                                    }
                                                >
                                                    <br />
                                                    <AttributeDisplayComponent
                                                        keyWord="Code"
                                                        valueWord={_.code}
                                                    />
                                                    <AttributeDisplayComponent
                                                        keyWord="Objectifs"
                                                        valueWord={_.objectif}
                                                    />
                                                    <AttributeDisplayComponent
                                                        keyWord="Compétences à tester"
                                                        valueWord={
                                                            _.competence_atteste
                                                        }
                                                    />
                                                    <AttributeDisplayComponent
                                                        keyWord="Modalités d'évaluation"
                                                        valueWord={
                                                            _.modalite_evaluation
                                                        }
                                                    />
                                                    <br />
                                                    <Text
                                                        variant="large"
                                                        style={{
                                                            fontWeight:
                                                                "bolder",
                                                            marginLeft: "20px",
                                                        }}
                                                    >
                                                        Programme
                                                    </Text>
                                                    <hr className="certif_hr_solid" />
                                                    {/* <br /> */}
                                                    {_.programmes.length > 0 ? (
                                                        <div>
                                                            {_.programmes.map(
                                                                (program) => (
                                                                    <div
                                                                        key={
                                                                            program.id
                                                                        }
                                                                    >
                                                                        <AttributeDisplayComponent
                                                                            keyWord="Libellé"
                                                                            valueWord={
                                                                                program.intitule
                                                                            }
                                                                        />
                                                                        <AttributeDisplayComponent
                                                                            keyWord="Description"
                                                                            valueWord={
                                                                                program.description
                                                                            }
                                                                        />
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <EmptyComponent messageText="Pas encore de programme pour cette Certification" />
                                                    )}
                                                </Panel>
                                            </div>
                                        ))
                                    ) : (
                                        <EmptyComponent messageText="Aucun élément" />
                                    )}
                                </div>
                            </PivotItem>
                        )}

                        {/* FOR RESOURCES */}
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
                                {user &&
                                    user.competence &&
                                    user.competence.map((_) => (
                                        <div
                                            className="display_serv_item"
                                            key={_.id}
                                        >
                                            <Text
                                                variant="small"
                                                style={{ fontWeight: "bolder" }}
                                            >
                                                {_.intitule}
                                            </Text>
                                        </div>
                                    ))}
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
                                        style={{
                                            marginTop: 5,
                                            fontWeight: "bold",
                                        }}
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
                                                    'This panel uses "light
                                                    dismiss" behavior: it can be
                                                    closed by clicking or
                                                    tapping ' + 'the area
                                                    outside the panel (or using
                                                    the close button as
                                                    usual).';
                                                </p>
                                            </Panel>
                                        </div>
                                    </div>
                                </div>
                            </PivotItem>
                        )}

                        {currentPath === PATH_LABEL_ORGANIZATION && (
                            <PivotItem headerText="Stagiaires">
                                <SearchBox
                                    placeholder="Filtrer"
                                    iconProps={filterIcon}
                                    onEscape={(ev) => {
                                        setSearch("");
                                    }}
                                    onClear={(ev) => {
                                        setSearch("");
                                    }}
                                    onChange={(_, newValue) =>
                                        setSearch(newValue || "")
                                    }
                                    className="label_trainee_tab_search"
                                />
                                {loading ? (
                                    <LoadingComponent />
                                ) : filteredOrgTrainees.length ? (
                                    filteredOrgTrainees.map((_) => (
                                        <div key={_.id}>
                                            <TrainingOrgTraineesDisplayComponent
                                                openPanel={openPanel}
                                                trainee={_}
                                                key={_.id}
                                            />
                                            <Panel
                                                isLightDismiss
                                                isOpen={isOpen}
                                                onDismiss={dismissPanel}
                                                closeButtonAriaLabel="Close"
                                                headerText="Détails Stagaire"
                                            >
                                                <br />
                                                <AttributeDisplayComponent
                                                    keyWord="ID"
                                                    valueWord={_.id}
                                                />
                                                <AttributeDisplayComponent
                                                    keyWord="Prénom"
                                                    valueWord={_.first_name}
                                                />
                                                <AttributeDisplayComponent
                                                    keyWord="Nom"
                                                    valueWord={_.username}
                                                />
                                                <AttributeDisplayComponent
                                                    keyWord="Email"
                                                    valueWord={_.email}
                                                />
                                                <AttributeDisplayComponent
                                                    keyWord="Tel"
                                                    valueWord={_.phone_number}
                                                />
                                                <AttributeDisplayComponent
                                                    keyWord="Adresse"
                                                    valueWord={_.adress}
                                                />
                                            </Panel>
                                        </div>
                                    ))
                                ) : (
                                    <EmptyComponent messageText="Aucun Stagiaire trouvé" />
                                )}
                            </PivotItem>
                        )}
                        {currentPath === PATH_LABEL_COMPANY && (
                            <PivotItem headerText="Organisme(s)">
                                <div>
                                    <SearchBox
                                        placeholder="Search"
                                        underlined={true}
                                        onEscape={(ev) => {
                                            setSearch("");
                                        }}
                                        onClear={(ev) => {
                                            setSearch("");
                                        }}
                                        onChange={(_, newValue) =>
                                            setSearch(newValue || "")
                                        }
                                        className="item_organisation_searcbar"
                                    />
                                    {loading ? (
                                        <LoadingComponent />
                                    ) : filteredCompanyOrg.length ? (
                                        filteredCompanyOrg.map((_) => (
                                            <SmallCompanyCardComponent
                                                openPanel={openPanel}
                                                org={_}
                                                key={_.id}
                                            />
                                        ))
                                    ) : (
                                        <EmptyComponent messageText="Aucun O-F trouvée" />
                                    )}
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
                                            behavior: it can be closed by
                                            clicking or tapping ' + 'the area
                                            outside the panel (or using the
                                            close button as usual).';
                                        </p>
                                        <div>{company?.company_adress}</div>
                                    </Panel>
                                </div>
                            </PivotItem>
                        )}
                    </Pivot>
                </div>
            )}
            {/* DISPALY FORMS */}
            {showCertificateForm ? (
                <div className="full_infos_tab_display_form">
                    <CertificateFormComponent
                        trainings={trainings}
                        cancel={() => setShowCertificateForm(false)}
                    />
                </div>
            ) : showTrainingProgramForm ? (
                <div className="full_infos_tab_display_form">
                    <TrainingProgramFormComponent
                        certificates={certificates}
                        cancel={() => setShowTrainingProgramForm(false)}
                    />
                </div>
            ) : null}
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

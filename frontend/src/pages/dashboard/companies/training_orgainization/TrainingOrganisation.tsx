import React, { useEffect, useState } from "react";
import { useId } from "@fluentui/react-hooks";
import {
    IIconProps,
    IDropdownOption,
    TooltipHost,
    IconButton,
    SearchBox,
    Dropdown,
    IDropdownStyles,
    DropdownMenuItemType,
    Text,
} from "@fluentui/react";
import { useLocation } from "react-router-dom";
import {
    TrainingOrganizationCardComponent,
    TrainingOrganizationFormComponent,
    FullInformationsTabComponent,
    EmptyComponent,
} from "../../../../components";
import {
    PATH_LABEL_RESOURCES,
    NewUserDtoIn,
    PATH_LABEL_ORGANIZATION,
    ORGANIZATION_FORM,
} from "../../../../lib";
import CompanyService from "../../../../services/company.service";
import { ICompany, IOrg } from "../../../../lib/interfaces/Company";
import {
    NewCompanyDtoIn,
    TrainingOrganizationDtoIn,
} from "../../../../lib/dto/company.dto";
import { LoadingComponent } from "../../../../components/loading_component/Loading.component";

export interface ITrainingOrganisationPageProps {
    default_props?: boolean;
}

interface IPath {
    label: string;
}
const ALL_ORG_KEY = "all";
const ALL_ORG_TXT = "Tout";

const filterIcon: IIconProps = { iconName: "Filter" };
const addIcon: IIconProps = { iconName: "Add" };

export const TrainingOrganisationPage: React.FC<
    ITrainingOrganisationPageProps
> = () => {
    const location = useLocation();

    const tooltipId = useId("tooltip");
    const [showForm, setShowForm] = useState<Boolean>(false);
    const [formToDisplay, setFormToDisplay] = useState<string>("");
    const [pathLabel, setPathLabel] = useState<string>("");
    const [theOrganization, setTheOrganization] = useState<IOrg>();

    const [organization, setOrganization] = useState<IOrg[]>([]);

    const [selectedSortedItem, setSelectedSortedItem] =
        React.useState<IDropdownOption>();
    const [selectedFilteredSte, setSelectedFiltererSte] =
        React.useState<IDropdownOption>();
    const [loading, setLoading] = useState<boolean>(true);
    const [trainingsCompanies, setTrainingsCompanies] = useState<
        IDropdownOption[]
    >([]);
    const [filteredOrgs, setFilteredOrgs] = useState<IOrg[]>([]);
    const [search, setSearch] = useState<string>("");

    const onChangeSorted = (
        event: React.FormEvent<HTMLDivElement>,
        item?: IDropdownOption
    ): void => {
        setSelectedSortedItem(item);
    };

    const onChangeFiltered = (
        event: React.FormEvent<HTMLDivElement>,
        item?: IDropdownOption
    ): void => {
        setSelectedFiltererSte(item);
    };

    useEffect(() => {
        if (location.state) {
            const thePath = location.state as IPath;
            setPathLabel(thePath.label);
        }
    }, [location.pathname]);

    useEffect(() => {
        toggleOrganizationsContent();
        getSociete();
    }, []);
    useEffect(() => {
        getOrganization();
    }, [selectedFilteredSte, search]);

    const filterOrgsByTerm = (searchTerm: string) => {
        return filteredOrgs.filter(
            (_) =>
                `${_.company_name} ${_.company_phone_number} ${_.company_adress}`.indexOf(
                    searchTerm
                ) !== -1
        );
    };

    const getOrganization = async () => {
        await CompanyService.get_all_organization()
            .then(async (response) => {
                if (response.status !== 200) {
                    //@TODO #4
                    // alert('error getting users');
                    console.log("the error resp", response);
                    return [];
                }
                setLoading(false);
                return response.json();
            })
            .then((respOrganisations: IOrg[]) => {
                console.log("the Organisations datas:", respOrganisations);
                setOrganization(respOrganisations);

                const filterOrgBySte =
                    selectedFilteredSte &&
                    selectedFilteredSte.key != ALL_ORG_KEY
                        ? search
                            ? filterOrgsByTerm(search)
                            : respOrganisations.filter(
                                  (_) =>
                                      _.societe_formation.id ===
                                      selectedFilteredSte.key
                              )
                        : search
                        ? selectedFilteredSte &&
                          selectedFilteredSte.key != ALL_ORG_KEY
                            ? respOrganisations.filter(
                                  (_) =>
                                      _.societe_formation.id ===
                                      selectedFilteredSte.key
                              )
                            : filterOrgsByTerm(search)
                        : respOrganisations;
                console.log({ filterOrgBySte });
                setFilteredOrgs(filterOrgBySte);
                setLoading(false);
            })
            .catch((err) => {
                console.log("error while getting tainings organisations");
                setLoading(false);
            });
    };

    const getSociete = async () => {
        // setLoading(true);
        await CompanyService.get_all_societe()
            .then(async (response) => {
                if (response.status !== 200) {
                    //@TODO #4
                    // alert('error getting users');
                    console.log("the error resp", response);
                    setLoading(false);
                    return [];
                }
                return response.json();
            })
            .then((respCompanies: ICompany[]) => {
                console.log("the companies datas:", respCompanies);
                const comps = respCompanies.map((_) => {
                    return { key: _.id, text: _.company_name };
                });
                comps.push({ key: ALL_ORG_KEY, text: ALL_ORG_TXT });
                setTrainingsCompanies(comps);
                setLoading(false);
            })
            .catch((err) => {
                console.log("error while getting tainings companies");
                setLoading(false);
            });
    };

    // users_content_display_organisation;
    const toggleOrganizationsContent = () => {
        var hint_organisations = document.getElementById(
            "users_content_display_organization"
        ) as HTMLInputElement;

        hint_organisations.className =
            hint_organisations.className !== "show" ? "show" : "hide";
        if (hint_organisations.className === "show") {
            hint_organisations.style.display = "block";
            window.setTimeout(() => {
                hint_organisations.style.opacity = "1";
                hint_organisations.style.transform = "scale(1)";
            }, 0);
        }
        if (hint_organisations.className === "hide") {
            hint_organisations.style.opacity = "0";
            hint_organisations.style.transform = "scale(0)";
            window.setTimeout(function () {
                hint_organisations.style.display = "none";
            }, 700); // timed to match animation-duration
        }
    };

    const toggleFullInfosTab = (org: IOrg) => {
        // console.log({ id });
        setTheOrganization(org);
        var hint = document.getElementById(
            "display_tab_ii"
        ) as HTMLInputElement;
        var first_tab = document.getElementById(
            "users_content_display_organization"
        ) as HTMLInputElement;

        hint.className = hint.className !== "show" ? "show" : "hide";
        if (hint) {
            if (hint.className === "show") {
                hint.style.display = "block";
                window.setTimeout(() => {
                    hint.style.opacity = "1";
                    hint.style.transform = "scale(1)";
                }, 0);
                first_tab.style.width = "150px";
            }
            if (hint.className === "hide") {
                hint.style.opacity = "0";
                hint.style.transform = "scale(0)";
                window.setTimeout(function () {
                    hint.style.display = "none";
                }, 700); // timed to match animation-duration
                first_tab.style.width = "550px";
            }
        }
    };

    const showAddForm = (displayForm: string) => {
        console.log("the form to display:", displayForm);
        setFormToDisplay(displayForm);
        showForm ? setShowForm(!showForm) : setShowForm(!showForm);
    };

    const handleOnCreate = (data: IOrg) => {
        setOrganization([data, ...organization]);
        setShowForm(false);
    };

    return (
        <div className="user_page_container">
            <div id="users_content_display_organization">
                <div className="display_tab">
                    <div className="tab_header">
                        <div className="tab_title">
                            {!showForm ? (
                                // LIST TITLE
                                <Text>O-F</Text>
                            ) : (
                                // FORM TITLE
                                <Text>Ajouter O-F</Text>
                            )}
                            <TooltipHost content="Ajouter O-F" id={tooltipId}>
                                <IconButton
                                    iconProps={addIcon}
                                    ariaLabel="add"
                                    onClick={() =>
                                        showAddForm(ORGANIZATION_FORM)
                                    }
                                />
                            </TooltipHost>
                        </div>
                        <hr className="hr_dashed" />
                        {!showForm ? (
                            <>
                                <div
                                    className={
                                        pathLabel === PATH_LABEL_RESOURCES
                                            ? "tab_header_contentii"
                                            : "tab_header_content"
                                    }
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
                                    />
                                    <div className="filter_box">
                                        <Dropdown
                                            selectedKey={
                                                selectedSortedItem
                                                    ? selectedSortedItem.key
                                                    : undefined
                                            }
                                            onChange={onChangeSorted}
                                            placeholder="Trier par"
                                            options={dropdownControlledSortBy}
                                            styles={dropdownStyles}
                                        />
                                        <Dropdown
                                            selectedKey={
                                                selectedFilteredSte
                                                    ? selectedFilteredSte.key
                                                    : undefined
                                            }
                                            onChange={onChangeFiltered}
                                            placeholder="Filtrer par Société"
                                            options={trainingsCompanies}
                                            styles={dropdownStyles}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                    {!showForm ? (
                        <div className="tab_content_scroll">
                            <div>
                                <Text>
                                    Total(
                                    {filteredOrgs.length})
                                </Text>
                                <hr className="hr_solid" />
                            </div>
                            <div className="tab_content_trainee">
                                {loading ? (
                                    <LoadingComponent />
                                ) : filteredOrgs.length ? (
                                    filteredOrgs.map((_) => (
                                        <TrainingOrganizationCardComponent
                                            toggleTab={() =>
                                                toggleFullInfosTab(_)
                                            }
                                            company={_}
                                            key={_.id}
                                        />
                                    ))
                                ) : (
                                    <EmptyComponent messageText="Aucune Organisation" />
                                )}
                            </div>
                        </div>
                    ) : (
                        <TrainingOrganizationFormComponent
                            cancel={() => setShowForm(false)}
                            onCreate={handleOnCreate}
                        />
                    )}
                </div>
            </div>
            <div id="display_tab_ii">
                <FullInformationsTabComponent
                    contentId={theOrganization?.id}
                    currentPath={pathLabel}
                    org={theOrganization}
                />
            </div>
        </div>
    );
};

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: {} };

const dropdownControlledSortBy = [
    { key: "name", text: "Nom" },
    { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "date_added", text: "Date ajoute" },
    { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "most_booking", text: "Réservations" },
];

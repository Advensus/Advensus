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
} from "../../../../components";
import {
    PATH_LABEL_RESOURCES,
    NewUserDtoIn,
    PATH_LABEL_ORGANIZATION,
    ORGANIZATION_FORM,
} from "../../../../lib";
import CompanyService from "../../../../services/company.service";
import { ICompany } from "../../../../lib/interfaces/Company";
import { TrainingOrganizationDtoIn } from "../../../../lib/dto/company.dto";

export interface ITrainingOrganisationPageProps {
    default_props?: boolean;
}

interface IPath {
    label: string;
}

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
    const [theOrganization, setTheOrganization] = useState<ICompany>();

    const [organization, setOrganization] = useState<ICompany[]>([]);

    const [selectedSortedItem, setSelectedSortedItem] =
        React.useState<IDropdownOption>();
    const [selectedFilteredItem, setSelectedFiltererItem] =
        React.useState<IDropdownOption>();

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
        setSelectedFiltererItem(item);
    };

    useEffect(() => {
        if (location.state) {
            const thePath = location.state as IPath;
            setPathLabel(thePath.label);
        }
    }, [location.pathname]);

    useEffect(() => {
        toggleOrganizationsContent();
        getOrganization();
    }, []);

    const getOrganization = async () => {
        await CompanyService.get_all_organization()
            .then(async (response) => {
                if (response.status !== 200) {
                    //@TODO #4
                    // alert('error getting users');
                    console.log("the error resp", response);
                    return [];
                }
                return response.json();
            })
            .then((respOrganisations: ICompany[]) => {
                console.log("the Organisations datas:", respOrganisations);
                setOrganization(respOrganisations);
            })
            .catch((err) => {
                console.log("error while getting tainings organisations");
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

    const toggleFullInfosTab = (org: ICompany) => {
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

    const handleOnCreate = (data: NewUserDtoIn) => {
        console.log({ data });
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
                                        onSearch={(newValue) =>
                                            console.log("value is " + newValue)
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
                                                selectedFilteredItem
                                                    ? selectedFilteredItem.key
                                                    : undefined
                                            }
                                            onChange={onChangeFiltered}
                                            placeholder="Filtrer par OF"
                                            options={dropdownControlledFilterBy}
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
                                <Text>My "tab name" or allusersnumber()</Text>
                                <hr className="hr_solid" />
                            </div>
                            <div className="tab_content_trainee">
                                {organization
                                    ? organization.map((_) => (
                                          <TrainingOrganizationCardComponent
                                              toggleTab={() =>
                                                  toggleFullInfosTab(_)
                                              }
                                              company={_}
                                              key={_.id}
                                          />
                                      ))
                                    : null}
                            </div>
                        </div>
                    ) : (
                        <TrainingOrganizationFormComponent
                            cancel={() => setShowForm(false)}
                        />
                    )}
                </div>
            </div>
            <div id="display_tab_ii">
                <FullInformationsTabComponent
                    contentId={theOrganization?.id}
                    currentPath={pathLabel}
                    company={theOrganization}
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
const dropdownControlledFilterBy = [
    { key: "OF1", text: "OF1" },
    { key: "divid3", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "OF2", text: "OF2" },
    { key: "divid4", text: "-", itemType: DropdownMenuItemType.Divider },
    { key: "OF3", text: "OF3" },
];

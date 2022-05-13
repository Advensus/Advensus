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
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    TrainingOrganizationCardComponent,
    CompanyFormComponent,
    FullInformationsTabComponent,
} from "../../../../components";
import {
    NewUserDtoIn,
    COMPANY_FORM,
    PATH_LABEL_COMPANY,
} from "../../../../lib";
import { useId } from "@fluentui/react-hooks";
import CompanyService from "../../../../services/company.service";
import { ICompany } from "../../../../lib/interfaces/Company";

export interface ITrainingCompanyPageProps {
    default_props?: boolean;
}

interface IPath {
    label: string;
}

const filterIcon: IIconProps = { iconName: "Filter" };
const addIcon: IIconProps = { iconName: "Add" };

export const TrainingCompanyPage: React.FC<ITrainingCompanyPageProps> = () => {
    const location = useLocation();
    const [trainingsCompanies, setTrainingsCompanies] = useState<ICompany[]>(
        []
    );

    const tooltipId = useId("tooltip");
    const [showForm, setShowForm] = useState<Boolean>(false);
    const [formToDisplay, setFormToDisplay] = useState<string>("");
    const [pathLabel, setPathLabel] = useState<string>("");
    const [theCompany, setTheCompany] = useState<ICompany>();

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
            console.log("the nav:", thePath.label);
        }
    }, [location.pathname]);

    useEffect(() => {
        toggleCompaniesContent();
        getSociete();
    }, []);

    const getSociete = async () => {
        await CompanyService.get_all_societe()
            .then(async (response) => {
                if (response.status !== 200) {
                    //@TODO #4
                    // alert('error getting users');
                    console.log("the error resp", response);
                    return [];
                }
                return response.json();
            })
            .then((respCompanies: ICompany[]) => {
                console.log("the companies datas:", respCompanies);
                setTrainingsCompanies(respCompanies);
            })
            .catch((err) => {
                console.log("error while getting tainings companies");
            });
    };

    // users_content_display_companies;
    const toggleCompaniesContent = () => {
        var hint_companies = document.getElementById(
            "users_content_display_company"
        ) as HTMLInputElement;

        hint_companies.className =
            hint_companies.className !== "show" ? "show" : "hide";
        if (hint_companies.className === "show") {
            hint_companies.style.display = "block";
            window.setTimeout(() => {
                hint_companies.style.opacity = "1";
                hint_companies.style.transform = "scale(1)";
            }, 0);
        }
        if (hint_companies.className === "hide") {
            hint_companies.style.opacity = "0";
            hint_companies.style.transform = "scale(0)";
            window.setTimeout(function () {
                hint_companies.style.display = "none";
            }, 700); // timed to match animation-duration
        }
    };

    const toggleFullInfosTab = (comp: ICompany) => {
        console.log({ comp });
        console.log({ pathLabel });
        setTheCompany(comp);
        var hint = document.getElementById(
            "display_tab_ii"
        ) as HTMLInputElement;
        var first_tab = document.getElementById(
            "users_content_display_company"
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
        // pathLabel === PATH_LABEL_RESOURCES
        //     ? setTrainers([data.user, ...trainers])
        //     : setTrainees([data.user, ...trainees]);
        setShowForm(false);
    };

    return (
        <div className="user_page_container">
            <div id="users_content_display_company">
                <div className="display_tab">
                    <div className="tab_header">
                        <div className="tab_title">
                            {!showForm ? (
                                // LIST TITLE
                                <Text>Société de Formation</Text>
                            ) : (
                                // FORM TITLE
                                <Text>Ajouter Société</Text>
                            )}
                            <TooltipHost
                                content="Ajouter Société"
                                id={tooltipId}
                            >
                                <IconButton
                                    iconProps={addIcon}
                                    ariaLabel="add"
                                    onClick={() => showAddForm(COMPANY_FORM)}
                                />
                            </TooltipHost>
                        </div>
                        <hr className="hr_dashed" />
                        {!showForm ? (
                            <>
                                <div className="tab_header_content">
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
                                {trainingsCompanies.length
                                    ? trainingsCompanies.map((_) => (
                                          <TrainingOrganizationCardComponent
                                              toggleTab={(i) =>
                                                  toggleFullInfosTab(i)
                                              }
                                              company={_}
                                              key={_.id}
                                          />
                                      ))
                                    : null}
                            </div>
                        </div>
                    ) : (
                        <CompanyFormComponent />
                    )}
                </div>
            </div>
            <div id="display_tab_ii">
                <FullInformationsTabComponent
                    contentId={theCompany?.id}
                    currentPath={pathLabel}
                    company={theCompany}
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

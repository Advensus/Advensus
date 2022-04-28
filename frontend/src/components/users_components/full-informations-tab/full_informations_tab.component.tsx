import { IconButton, Label, Pivot, PivotItem, Text } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { TrainingDetailsComponent } from "../..";
import {
    ITraining,
    IUser,
    PATH_LABEL_CUSTOMER,
    PATH_LABEL_RESOURCES,
    PATH_LABEL_SERVICES,
} from "../../../lib";
import TrainingService from "../../../services/training.service";
import UserService from "../../../services/user.service";
import { UserDetailsComponent } from "../user-details/user_details.component";

export interface IFullInformationsTabProps {
    default_props?: boolean;
    contentId: string;
    currentPath: string;
}

export const FullInformationsTabComponent: React.FC<
    IFullInformationsTabProps
> = ({ contentId, currentPath }) => {
    const [content, setContent] = useState<IUser>();
    const [training, setTraining] = useState<ITraining>();

    useEffect(() => {
        console.log("Content received:", contentId, currentPath);
        if (contentId) {
            if (currentPath === PATH_LABEL_SERVICES) {
                const emptyContent = {} as IUser;
                setContent(emptyContent);
            } else {
                const emptyTraining = {} as ITraining;
                setTraining(emptyTraining);
            }
            getContentById(contentId);
        }
    }, [contentId]);

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
                {(currentPath === PATH_LABEL_RESOURCES ||
                    PATH_LABEL_CUSTOMER) && (
                    <Text>
                        {content?.username !== undefined &&
                            content?.username.toUpperCase()}{" "}
                        {""}
                        {content?.first_name}
                    </Text>
                )}
                {currentPath === PATH_LABEL_SERVICES && (
                    <Text>{training?.intitule}</Text>
                )}
                <hr className="hr_dashed" />
            </div>
            <div className="full_infos_tab_body">
                <Pivot
                    aria-label="Links of Large Tabs Pivot Example"
                    // linkFormat="tabs"
                    linkSize="large"
                >
                    <PivotItem
                        headerText="Details"
                        className="label_details_tab"
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
                        ) : (
                            <UserDetailsComponent contentToDetail={content} />
                        )}
                    </PivotItem>
                    {currentPath === PATH_LABEL_RESOURCES && (
                        <PivotItem headerText="Services">
                            <Label>Services</Label>
                        </PivotItem>
                    )}
                    {currentPath === PATH_LABEL_CUSTOMER && (
                        <PivotItem headerText="Réservations">
                            <Label>Réservation</Label>
                        </PivotItem>
                    )}
                </Pivot>
            </div>
        </div>
    );
};

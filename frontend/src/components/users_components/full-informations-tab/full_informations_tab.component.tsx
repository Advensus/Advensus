import { Label, Pivot, PivotItem, Text } from "@fluentui/react";
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
            // if (currentPath === PATH_LABEL_SERVICES) {
            //     const emptyContent = {} as IUser;
            //     setContent(emptyContent);
            // } else {
            //     const emptyTraining = {} as ITraining;
            //     setTraining(emptyTraining);
            // }
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
                <Text>Onglet title</Text>
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
                            <TrainingDetailsComponent
                                detailTraining={training}
                            />
                        ) : (
                            <UserDetailsComponent contentToDetail={content} />
                        )}
                        {/* <Label>
                        </Label> */}
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

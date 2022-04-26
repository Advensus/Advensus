import { Label, Pivot, PivotItem, Text } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { IUser } from "../../../lib";
import UserService from "../../../services/user.service";
import { UserDetailsComponent } from "../user-details/user_details.component";

export interface IFullInformationsTabProps {
    default_props?: boolean;
    contentId: string;
}

export const FullInformationsTabComponent: React.FC<
    IFullInformationsTabProps
> = ({ contentId }) => {
    const [content, setContent] = useState<IUser>();

    useEffect(() => {
        console.log({ contentId });
        if (contentId) {
            getContentById(contentId);
        }
    }, [contentId]);

    const getContentById = (id: string) => {
        UserService.get_user_by_id(id)
            .then((response) => {
                if (response.status !== 200) {
                    return;
                }

                return response.json();
            })
            .then((resp: IUser) => {
                console.log({ resp });
                setContent(resp);
            })
            .catch((err) => {
                console.log("error while getting user by his id:", err);
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
                        <UserDetailsComponent contentToDetail={content} />
                        {/* <Label>
                        </Label> */}
                    </PivotItem>
                    <PivotItem headerText="Services">
                        <Label>Services</Label>
                    </PivotItem>
                    <PivotItem headerText="Réservations">
                        <Label>Réservation</Label>
                    </PivotItem>
                </Pivot>
            </div>
        </div>
    );
};

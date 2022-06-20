import { IconButton, IIconProps, Text } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { AttributeDisplayComponent } from "../../";
import {
    ISubscription,
    IUser,
    PATH_LABEL_CUSTOMER,
    TRAINEE,
} from "../../../lib";
import { TrainingFolderCardComponent } from "../../trainings_components/training_folder_card/training_folder_card.component";

import { DefaultButton } from "@fluentui/react/lib/Button";
import { Panel } from "@fluentui/react/lib/Panel";
import { useBoolean } from "@fluentui/react-hooks";

export interface IUserDetailsProps {
    default_props?: boolean;
    contentToDetail?: IUser;
    currentPath: string;
}

const addFolderIcon: IIconProps = { iconName: "AddToShoppingList" };

export const UserDetailsComponent: React.FC<IUserDetailsProps> = ({
    contentToDetail,
    currentPath,
}) => {
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
        useBoolean(false);
    const [subscriptionInfos, setSubscriptionInfos] = useState<ISubscription[]>(
        []
    );

    useEffect(() => {
        console.log({ contentToDetail });
        console.log("infos souscription:", contentToDetail?.souscrirs);
        if (contentToDetail) {
            // contentToDetail.souscrirs
            if (contentToDetail.souscrirs)
                setSubscriptionInfos(contentToDetail.souscrirs);
            // : null;
        }
    }, [contentToDetail]);

    return (
        <div className="user_details_container">
            <div className="user_details_header">
                {/* <UsersDisplayComponent /> */}
                <div className="user_details_init">INIT</div>
                <Text variant="large">
                    {contentToDetail?.first_name} {contentToDetail?.username}
                </Text>
            </div>
            <hr />
            {contentToDetail?.user_type === TRAINEE ? (
                <AttributeDisplayComponent
                    keyWord="O-F"
                    valueWord={
                        contentToDetail?.organisme_formation &&
                        contentToDetail?.organisme_formation[0].company_name
                    }
                />
            ) : (
                <AttributeDisplayComponent
                    keyWord="Société"
                    valueWord={
                        contentToDetail?.appartenir_societe &&
                        contentToDetail?.appartenir_societe[0].company_name
                    }
                />
            )}
            <AttributeDisplayComponent
                keyWord="Stagiaire ID"
                valueWord={contentToDetail?.id}
            />
            <AttributeDisplayComponent
                keyWord="Prénom"
                valueWord={contentToDetail?.first_name}
            />
            <AttributeDisplayComponent
                keyWord="Nom"
                valueWord={contentToDetail?.username}
            />
            <AttributeDisplayComponent
                keyWord="Email"
                valueWord={contentToDetail?.email}
            />
            <AttributeDisplayComponent
                keyWord="Téléphone"
                valueWord={contentToDetail?.phone_number}
            />
            <AttributeDisplayComponent
                keyWord="Adress postale"
                valueWord={contentToDetail?.adress}
            />
            {currentPath === PATH_LABEL_CUSTOMER && (
                <div className="user_details_training_folder">
                    <div className="user_details_training_folder_head">
                        <Text>Dossier(s) de Formation(s)</Text>
                        <IconButton
                            iconProps={addFolderIcon}
                            // menuIconProps={{ iconName: "ClipboardListAdd" }}
                            ariaLabel="add"
                            title="Nouvelle Formation"
                        />
                    </div>
                    <hr className="hr_user_details_training_folder" />
                    {subscriptionInfos.length > 0
                        ? subscriptionInfos.map((_) => (
                              <div key={_.edof}>
                                  <TrainingFolderCardComponent
                                      openPanel={openPanel}
                                      key={_.edof}
                                      subscriptionDetails={_}
                                  />
                                  <div style={{ backgroundColor: "yellow" }}>
                                      <Panel
                                          isLightDismiss
                                          isOpen={isOpen}
                                          onDismiss={dismissPanel}
                                          closeButtonAriaLabel="Close"
                                          headerText="Détails du Dossier de Formation"
                                      >
                                          <br />
                                          <div>
                                              <AttributeDisplayComponent
                                                  keyWord="Edof"
                                                  valueWord={_.edof}
                                              />
                                              <AttributeDisplayComponent
                                                  keyWord="Status du dossier"
                                                  valueWord={_.training_status}
                                              />
                                              <AttributeDisplayComponent
                                                  keyWord="Début prévus"
                                                  valueWord={_.start_session}
                                              />
                                              <AttributeDisplayComponent
                                                  keyWord="Fin prévus"
                                                  valueWord={_.end_session}
                                              />
                                              <AttributeDisplayComponent
                                                  keyWord="Lieu de formation"
                                                  valueWord={_.lieu_formation}
                                              />
                                              <AttributeDisplayComponent
                                                  keyWord="Niveau actuel du stagiaire"
                                                  valueWord={_.level_start}
                                              />
                                              <AttributeDisplayComponent
                                                  keyWord="Niveau visé"
                                                  valueWord={_.level_end}
                                              />
                                              <AttributeDisplayComponent
                                                  keyWord="Durée de la formation"
                                                  valueWord={_.duration + "H"}
                                              />
                                              <AttributeDisplayComponent
                                                  keyWord="Heure(s) réalisée(s)"
                                                  valueWord={_.hour_worked}
                                              />
                                          </div>
                                      </Panel>
                                  </div>
                              </div>
                          ))
                        : null}
                </div>
            )}
        </div>
    );
};

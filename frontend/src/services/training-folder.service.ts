import BaseService from "./BaseService";
import { certificateUrls, trainingFolderUrls, trainingUrls } from "./urls";

class TrainingFolderService {
    static new_training_folder = (info: unknown) =>
        BaseService.postRequest(
            trainingFolderUrls.NEW_TRAINING_FOLDER,
            info,
            false
        );

    static get_training_folder_by_id = (id: string) =>
        BaseService.getRequest(
            trainingFolderUrls.GET_TRAINING_FOLDER_BY_ID(id),
            false
        );

    static edit_training_folder_balance = (id: string, info: unknown) =>
        BaseService.patchRequest(
            trainingFolderUrls.EDIT_TRAINING_FOLDER_BALANCE(id),
            info,
            false
        );
}

export default TrainingFolderService;

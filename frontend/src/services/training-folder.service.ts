import BaseService from "./BaseService";
import { trainingFolderUrls, trainingUrls } from "./urls";

class TrainingFolderService {
    static new_training_folder = (info: unknown) =>
        BaseService.postRequest(
            trainingFolderUrls.NEW_TRAINING_FOLDER,
            info,
            false
        );
}

export default TrainingFolderService;

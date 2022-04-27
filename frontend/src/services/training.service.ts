import BaseService from "./BaseService";
import { trainingUrls } from "./urls";

class TrainingService {
    static new_training = (info: unknown) =>
        BaseService.postRequest(trainingUrls.NEW_TRAINING, info, false);
}

export default TrainingService;

import BaseService from "./BaseService";
import { trainingUrls } from "./urls";

class TrainingService {
    static new_training = (info: unknown) =>
        BaseService.postRequest(trainingUrls.NEW_TRAINING, info, false);
    static get_all_trainings = () =>
        BaseService.getRequest(trainingUrls.GET_ALL_TRAININGS, false);
}

export default TrainingService;

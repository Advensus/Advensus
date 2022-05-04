import BaseService from "./BaseService";
import { trainingUrls } from "./urls";

class TrainingService {
    static new_training = (info: unknown) =>
        BaseService.postRequest(trainingUrls.NEW_TRAINING, info, false);
    static get_all_trainings = () =>
        BaseService.getRequest(trainingUrls.GET_ALL_TRAININGS, false);
    static get_training_by_id = (id: string) =>
        BaseService.getRequest(trainingUrls.GET_TRAINING_BY_ID(id), false);
}

export default TrainingService;

import BaseService from "./BaseService";
import {
    certificateUrls,
    subscriptionUrls,
    trainingProgramUrls,
    trainingUrls,
} from "./urls";

class TrainingService {
    static new_training = (info: unknown) =>
        BaseService.postRequest(trainingUrls.NEW_TRAINING, info, false);
    static get_all_trainings = () =>
        BaseService.getRequest(trainingUrls.GET_ALL_TRAININGS, false);
    static get_training_by_id = (id: string) =>
        BaseService.getRequest(trainingUrls.GET_TRAINING_BY_ID(id), false);

    // For Certificate
    static new_certificate = (info: unknown) =>
        BaseService.postRequest(certificateUrls.NEW_CERTIFICATE, info, false);
    static get_all_certificate = () =>
        BaseService.getRequest(certificateUrls.GET_ALL_CERTIFICATE, false);
    static get_certificate_by_training_id = (id: string) =>
        BaseService.getRequest(
            certificateUrls.GET_CERTIF_BY_TRAINING_ID(id),
            false
        );

    // For Training Program
    static new_training_program = (info: unknown) =>
        BaseService.postRequest(
            trainingProgramUrls.NEW_TRAINING_PROGRAMM,
            info,
            false
        );

    // For Subscription
    static get_all_subscription = () =>
        BaseService.getRequest(subscriptionUrls.GET_ALL_SUBSCRIPTION, false);
}

export default TrainingService;

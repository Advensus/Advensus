import BaseService from "./BaseService";
import { userUls } from "./urls";

class UserService {
    static get_all_users = () =>
        BaseService.getRequest(userUls.GET_ALL_USERS, false);

    static new_trainer = (info: unknown) =>
        BaseService.postRequest(userUls.NEW_TRAINER, info, false);

    static new_trainee = (info: unknown) =>
        BaseService.postRequest(userUls.NEW_TRAINEE, info, false);

    static new_super_rp = (info: unknown) =>
        BaseService.postRequest(userUls.NEW_SUPER_RP, info, false);

    static new_basic_rp = (info: unknown) =>
        BaseService.postRequest(userUls.NEW_BASIC_RP, info, false);

    static get_user_by_id = (id: string) =>
        BaseService.getRequest(userUls.GET_USER_BY_ID(id), false);
}

export default UserService;

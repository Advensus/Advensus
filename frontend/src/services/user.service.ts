import BaseService from "./BaseService";
import { userUls } from "./urls";

class UserService {
    static get_all_users = () =>
        BaseService.getRequest(userUls.GET_ALL_USERS, false);

    static new_trainer = (info: unknown) =>
        BaseService.postRequest(userUls.NEW_TRAINER, info, false);
}

export default UserService;

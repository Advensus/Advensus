import BaseService from "./BaseService";
import { userUls } from "./urls";

class UserService {
    static get_all_users = () =>
        BaseService.getRequest(userUls.GET_ALL_USERS, true);
}

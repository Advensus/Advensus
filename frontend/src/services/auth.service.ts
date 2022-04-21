import BaseService from "./BaseService";
import { authUrls } from "./urls";

export class AuthService {
    static login = (info: unknown) =>
        BaseService.postRequest(authUrls.LOGIN_USER, info, false);
    static register = (info: unknown) =>
        BaseService.postRequest(authUrls.REGISTER_USER, info, false);
    static currentUser = () =>
        BaseService.getRequest(authUrls.CURRENT_USER, true);
}

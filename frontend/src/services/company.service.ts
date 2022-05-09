import BaseService from "./BaseService";
import { companyUrls } from "./urls";

class CompanyService {
    static new_company = (info: unknown) =>
        BaseService.postRequest(companyUrls.NEW_COMPANY, info, false);
    static get_all_societe = () =>
        BaseService.getRequest(companyUrls.GET_ALL_SOCIETE, false);
    static get_all_organization = () =>
        BaseService.getRequest(companyUrls.GET_ALL_ORGANISATION, false);
}

export default CompanyService;

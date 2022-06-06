import BaseService from "./BaseService";
import { companyUrls } from "./urls";

class CompanyService {
    static new_company = (info: FormData) =>
        BaseService.postFileRequest(companyUrls.NEW_COMPANY, info, false);
    static new_organization = (info: FormData) =>
        BaseService.postFileRequest(companyUrls.NEW_ORGANISATION, info, false);
    static get_all_societe = () =>
        BaseService.getRequest(companyUrls.GET_ALL_SOCIETE, false);
    static get_all_organization = () =>
        BaseService.getRequest(companyUrls.GET_ALL_ORGANISATION, false);

    static get_org_by_compnany_id = (id: string) =>
        BaseService.getRequest(companyUrls.GET_ORG_BY_COMPANY_ID(id), false);
}

export default CompanyService;

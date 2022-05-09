import BaseService from "./BaseService";
import { companyUrls } from "./urls";

class CompanyService {
    static new_company = (info: unknown) =>
        BaseService.postRequest(companyUrls.NEW_COMPANY, info, false);
}

export default CompanyService;

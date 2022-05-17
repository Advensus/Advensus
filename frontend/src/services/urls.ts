// import config from 'config'
// /*Urls for the application */
export const prefixer = "http://localhost:8000/";

export const authUrls = {
    LOGIN_USER: `${prefixer}auth/login/`,
    REGISTER_USER: `${prefixer}auth/register`,
    // LOGIN_BY_OTP: (agency_id: string) => `${prefixer}auth/${agency_id}/login`,
    // REQUEST_OTP: (agency_id: string) => `${prefixer}auth/${agency_id}/send/otp`,
    CURRENT_USER: `${prefixer}auth/logged?refresh_token=${true}`,
};

export const userUls = {
    GET_ALL_USERS: `${prefixer}auth/ViewAllUser/`,
    NEW_TRAINER: `${prefixer}auth/register/formateur/`,
    NEW_TRAINEE: `${prefixer}auth/register/stagiaire/`,
    NEW_SUPER_RP: `${prefixer}auth/register/Srp/`,
    NEW_BASIC_RP: `${prefixer}auth/register/Rp/`,
    NEW_COMPANY_ADMIN: `${prefixer}auth/register/admin_societe/`,
    GET_USER_BY_ID: (id: string) => `${prefixer}auth/DetailUser/${id}`,
};

export const trainingUrls = {
    NEW_TRAINING: `${prefixer}auth/CreateFormation/`,
    GET_ALL_TRAININGS: `${prefixer}auth/GetAllFormation`,
    GET_TRAINING_BY_ID: (id: string) => `${prefixer}auth/DetailFormation/${id}`,
};

export const trainingFolderUrls = {
    NEW_TRAINING_FOLDER: `${prefixer}auth/create/souscrir/`,
};

export const companyUrls = {
    NEW_COMPANY: `${prefixer}auth/create/societe/`,
    NEW_ORGANISATION: `${prefixer}auth/create/organisme/`,
    GET_ALL_SOCIETE: `${prefixer}auth/GetAllSociete`,
    GET_ALL_ORGANISATION: `${prefixer}auth/GetAllOrganisme`,
};

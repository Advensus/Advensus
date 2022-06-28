// import config from 'config'
// /*Urls for the application */
// export const prefixer = "http://127.0.0.1:8000";
export const prefixer = "http://185.215.180.164:8000";

export const authUrls = {
    LOGIN_USER: `${prefixer}/auth/login/`,
    REGISTER_USER: `${prefixer}/auth/register`,
    // LOGIN_BY_OTP: (agency_id: string) => `${prefixer}/auth/${agency_id}/login`,
    // REQUEST_OTP: (agency_id: string) => `${prefixer}/auth/${agency_id}/send/otp`,
    CURRENT_USER: `${prefixer}/auth/logged?refresh_token=${true}`,
};

export const userUls = {
    GET_ALL_USERS: `${prefixer}/auth/GetAllUser/`,
    NEW_TRAINER: `${prefixer}/auth/register/formateur/`,
    NEW_TRAINEE: `${prefixer}/auth/register/stagiaire/`,
    NEW_SUPER_RP: `${prefixer}/auth/register/Srp/`,
    NEW_BASIC_RP: `${prefixer}/auth/register/Rp/`,
    NEW_COMPANY_ADMIN: `${prefixer}/auth/register/admin_societe/`,
    GET_USER_BY_ID: (id: string) => `${prefixer}/auth/DetailUser/${id}`,
    GET_FORMER_BY_TRAINING_ID: (id: string) =>
        `${prefixer}/auth/GetFormateurByFormation/${id}`,
    GET_TRAINEE_BY_ORG_ID: (id: string) =>
        `${prefixer}/auth/GetStagaireByOrg/${id}`,
};

export const trainingUrls = {
    NEW_TRAINING: `${prefixer}/auth/CreateFormation/`,
    GET_ALL_TRAININGS: `${prefixer}/auth/GetAllFormation`,
    GET_TRAINING_BY_ID: (id: string) =>
        `${prefixer}/auth/DetailFormation/${id}`,
};
export const certificateUrls = {
    NEW_CERTIFICATE: `${prefixer}/auth/create/certificate/`,
    GET_ALL_CERTIFICATE: `${prefixer}/auth/GetAllCertificate/`,
    GET_CERTIF_BY_TRAINING_ID: (id: string) =>
        `${prefixer}/auth/GetCertificationByFor/${id}`,
};
export const trainingProgramUrls = {
    NEW_TRAINING_PROGRAMM: `${prefixer}/auth/create/programme/`,
};
export const subscriptionUrls = {
    GET_ALL_SUBSCRIPTION: `${prefixer}/auth/GetAllSouscription/`,
};

export const trainingFolderUrls = {
    NEW_TRAINING_FOLDER: `${prefixer}/auth/create/souscrir/`,
};

export const companyUrls = {
    NEW_COMPANY: `${prefixer}/auth/create/societe/`,
    NEW_ORGANISATION: `${prefixer}/auth/create/organisme/`,
    GET_ALL_SOCIETE: `${prefixer}/auth/GetAllSociete`,
    GET_ALL_ORGANISATION: `${prefixer}/auth/GetAllOrganisme`,
    GET_ORG_BY_COMPANY_ID: (id: string) =>
        `${prefixer}/auth/GetOrganismeBySoc/${id}`,
};

export const bookingUrls = {
    NEW_BOOKING: `${prefixer}/auth/create/reservation/`,
    GET_ALL_BOOKING: `${prefixer}/auth/GetAllReservation/`,
    EDIT_BOOKING: (id: string) => `${prefixer}/auth/UpdateReservation/${id}/`,
};

export const coursesUrls = {
    NEW_COURSES: `${prefixer}/auth/create/courses/`,
};

export const documentsUrls = {
    GENERATE_NEW_DOCUMENT: `${prefixer}/auth/GenerateDocument/`,
    CREATE_NEW_DOCUMENT: `${prefixer}/auth/CreateDocument/`,
};

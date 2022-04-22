// import config from 'config'
// /*Urls for the application */
export const prefixer = "http://localhost:8000/";

export const authUrls = {
<<<<<<< HEAD
    LOGIN_USER: `${prefixer}login/admin_org`,
=======
    LOGIN_USER: `${prefixer}auth/login/`,
>>>>>>> Frontend
    REGISTER_USER: `${prefixer}auth/register`,
    // LOGIN_BY_OTP: (agency_id: string) => `${prefixer}auth/${agency_id}/login`,
    // REQUEST_OTP: (agency_id: string) => `${prefixer}auth/${agency_id}/send/otp`,
    CURRENT_USER: `${prefixer}auth/logged?refresh_token=${true}`,
};

export const userUls = {
    GET_ALL_USERS: `${prefixer}`,
};

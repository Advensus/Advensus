import { LoginDtoOut } from "../lib";

// require('isomorphic-fetch');
class BaseService {
    static getHeaders = (isFile?: boolean) => {
        const headers = new Headers();
        if (!isFile) {
            headers.append("Content-Type", "application/json");
        }
        // headers.append("Accept", "application/json");
        // headers.append("Access-Control-Allow-Origin", "*");
        // headers.append("Origin", "*");
        // headers.append("Credentials", "same-origin");
        return headers;
    };

    static getHeadersAuth = (isFile?: boolean) => {
        const headers = BaseService.getHeaders(isFile);
        const token = localStorage.getItem("access_token")
            ? localStorage.getItem("access_token") || ""
            : "";
        headers.append("Authorization", `Bearer ${JSON.parse(token)}`);
        return headers;
    };

    static getToken = () => {
        return (localStorage.getItem("access_token") || "").toString();
    };

    static postRequest = async (
        url: string,
        body: unknown,
        required_auth: boolean
    ) => {
        console.log("Nous sommes dans le post request", url, required_auth);
        const head = required_auth
            ? BaseService.getHeadersAuth()
            : BaseService.getHeaders();

        const headers = {
            method: "POST",
            headers: head,
            mode: "cors" as RequestMode,
            cache: "default" as RequestCache,
            body: JSON.stringify(body),
        };

        return fetch(url, headers);
    };

    static postFileRequest = async (
        url: string,
        body: FormData,
        required_auth: boolean
    ) => {
        const head = required_auth
            ? BaseService.getHeadersAuth(true)
            : BaseService.getHeaders(true);

        const headers = {
            method: "POST",
            headers: head,
            mode: "cors" as RequestMode,
            cache: "default" as RequestCache,
            // Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            // body: body as string,
            "Content-Type": "multipart/form-data",
            // body: JSON.stringify(body),
            body,
        };
        const response = await fetch(url, headers)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            });
        return response;
    };

    static putFileRequest = async (
        url: string,
        body: unknown,
        required_auth: boolean
    ) => {
        const head = required_auth
            ? BaseService.getHeadersAuth(true)
            : BaseService.getHeaders(true);

        const headers = {
            method: "PUT",
            headers: head,
            mode: "cors" as RequestMode,
            cache: "default" as RequestCache,
            body: body as string,
        };
        const response = await fetch(url, headers)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            });
        return response;
    };

    static putRequest = async (
        url: string,
        body: unknown,
        required_auth: boolean
    ) => {
        const head = required_auth
            ? BaseService.getHeadersAuth()
            : BaseService.getHeaders();

        const headers = {
            method: "PUT",
            headers: head,
            mode: "cors" as RequestMode,
            cache: "default" as RequestCache,
            body: JSON.stringify(body),
        };
        return fetch(url, headers);
    };

    static patchRequest = async (
        url: string,
        body: unknown,
        required_auth: boolean
    ) => {
        const head = required_auth
            ? BaseService.getHeadersAuth()
            : BaseService.getHeaders();

        const headers = {
            method: "PATCH",
            headers: head,
            mode: "cors" as RequestMode,
            cache: "default" as RequestCache,
            body: JSON.stringify(body),
        };
        return fetch(url, headers);
    };

    static deconsteRequest = async (
        url: string,
        body: Record<string, string>,
        required_auth: boolean
    ) => {
        const head = required_auth
            ? BaseService.getHeadersAuth()
            : BaseService.getHeaders();

        const headers = {
            method: "DEconstE",
            headers: head,
            mode: "cors" as RequestMode,
            cache: "default" as RequestCache,
            body: JSON.stringify(body),
        };
        return fetch(url, headers);
    };

    static getRequest = async (url: string, required_auth: boolean) => {
        const head = required_auth
            ? BaseService.getHeadersAuth()
            : BaseService.getHeaders();

        const headers = {
            method: "GET",
            headers: head,
            mode: "cors" as RequestMode,
            cache: "default" as RequestCache,
        };
        return fetch(url, headers);
    };

    static deleteRequest = async (
        url: string,
        body: unknown,
        required_auth: boolean
    ) => {
        let head = required_auth
            ? BaseService.getHeadersAuth()
            : BaseService.getHeaders();

        let headers = {
            method: "DELETE",
            headers: head,
            mode: "cors" as RequestMode,
            cache: "default" as RequestCache,
            body: JSON.stringify(body),
        };
        return fetch(url, headers);
    };
}

export default BaseService;

import BaseService from "./BaseService";
import { bookingUrls, coursesUrls, documentsUrls } from "./urls";

class DocumentsService {
    static generate_new_adm_document = (info: unknown) =>
        BaseService.postRequest(
            documentsUrls.GENERATE_NEW_DOCUMENT,
            info,
            false
        );
    static create_new_document = (info: unknown) =>
        BaseService.postRequest(documentsUrls.CREATE_NEW_DOCUMENT, info, false);
    // static edit_booking = (id: string, info: unknown) =>
    //     BaseService.patchRequest(bookingUrls.EDIT_BOOKING(id), info, false);

    // COURSES
    // static create_new_courses = (info: unknown) =>
    //     BaseService.postRequest(coursesUrls.NEW_COURSES, info, false);
    // static get_all_bookings = () =>
    //     BaseService.getRequest(bookingUrls.GET_ALL_BOOKING, false);
}

export default DocumentsService;

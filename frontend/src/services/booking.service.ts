import BaseService from "./BaseService";
import { bookingUrls, coursesUrls } from "./urls";

class BookingService {
    static add_new_booking = (info: unknown) =>
        BaseService.postRequest(bookingUrls.NEW_BOOKING, info, false);

    // COURSES
    static create_new_courses = (info: unknown) =>
        BaseService.postRequest(coursesUrls.NEW_COURSES, info, false);
    static get_all_bookings = () =>
        BaseService.getRequest(bookingUrls.GET_ALL_BOOKING, false);
}

export default BookingService;

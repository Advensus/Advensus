export interface IBooking {
    id: string;
    courses: string;
    TaskID: string;
    OwnerID: string;
    Title: string;
    Description: string;
    StartTimezone: string;
    Start: string;
    End: string;
    EndTimezone: string;
    RecurrenceRule: string;
    RecurrenceID: string;
    RecurrenceException: string;
    isAllDay: string;
}

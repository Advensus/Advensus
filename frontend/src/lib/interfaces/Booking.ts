// export interface IBooking {
//     id: string;
//     courses: string;
//     TaskID: string;
//     OwnerID: string;
//     Title: string;
//     Description: string;
//     StartTimezone: string;
//     Start: string;
//     End: string;
//     EndTimezone: string;
//     RecurrenceRule: string;
//     RecurrenceID: string;
//     RecurrenceException: string;
//     isAllDay: string;
// }

export interface IBooking {
    id: string;
    title: string;
    description: string;
    status: string;
    start_date: Date | string;
    end_date: Date | string;
    reserver: string;
    proposer: string;
    concerner: string;
}

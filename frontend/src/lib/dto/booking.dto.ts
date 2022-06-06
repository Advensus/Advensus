export interface NewBookingDto {
    title: string;
    description: string;
    status: string;
    start_date: Date | null | undefined | string;
    end_date: Date | null | undefined | string;
    reserver: string[];
    proposer: string;
    concerner: string;

    superviser?: string;
    assister?: string[];
    lier?: string;
}

export interface NewCoursesDto {
    superviser: string;
    assister: string;
    lier: string;
}

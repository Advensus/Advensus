export interface NewBookingDto {
    title: string;
    description: string;
    status: string;
    start_date: Date | null | undefined | string;
    start?: Date;
    end_date: Date | null | undefined | string;
    end?: Date;
    reserver: string[];
    proposer?: string | null;
    concerner: string;

    superviser?: string;
    assister?: string;
    lier?: string;
}

export interface NewCoursesDto {
    superviser: string;
    assister: string;
    lier: string;
}

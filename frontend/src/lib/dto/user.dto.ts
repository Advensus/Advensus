export interface NewUserDto {
    username: string;
    first_name: string;
    email: string;
    phone_number: string;
    adress: string;
    password: string;
    horaire?: string;
    competence?: string;
    cv?: File;
    organisme?: string;
}

export interface NewUserDtoIn {
    username: string;
    first_name: string;
    email: string;
    phone_number: string;
    adress: string;
    horaire?: string;
    competence?: string;
    cv?: File;
    organisme?: string;
}

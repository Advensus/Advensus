export interface IUser {
    id: string;
    username: string;
    first_name: string;
    email: string;
    phone_number: string;
    adress: string;

    is_active?: true;
    avatar?: null;
    signature_former?: null;
    user_type?: string;
    session_token?: string;
    horaire?: string;
    cv?: File;
    competence?: string;
    trainee_level?: string;
    organisme?: string;
}

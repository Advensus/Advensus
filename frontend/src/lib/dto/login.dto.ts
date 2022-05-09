export interface LoginDtoIn {
    email: string;
    password: string;
}

export interface LoginDtoOut {
    // tokens: {
    //     refresh: string;
    //     access: string;
    // };
    tokens: string;
    email: string;
    username: string;
    user_type: string;
    is_active: Boolean;
    id: string;
}

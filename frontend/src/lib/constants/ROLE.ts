export const SUPER_USER = "";
export const ADMIN_OF = "is_admin";
export const SUPER_RP = "is_sup_planificateur";
export const RP = "is_planificateur";
export const TEACHEAR = "is_formateur";
export const TRAINEE = "is_client";

// export const SUPER_USER = 0;
// export const ADMIN_OF = 100;
// export const SUPER_RP = 54;
// export const RP = 9;
// export const TEACHEAR = -3;
// export const TRAINEE = 21;

export const ROLES = [SUPER_USER, ADMIN_OF, SUPER_RP, RP, TEACHEAR, TRAINEE];

export type IRole = typeof ROLES[number];

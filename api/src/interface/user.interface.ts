export interface IUserLocal {
    email: string;
    password: string;
}

export interface IUser {
    _id?: string;
    name: string;
    local: IUserLocal;
    comparePassword: (
        password: string,
        hashedPassword: string
    ) => Promise<boolean>;
}

export interface UserForm {
    name: string;
    email: string;
    password: string;
}

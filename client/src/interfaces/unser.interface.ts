export interface IUserLocal {
    email: string;
    password: string;
}

export interface IUser {
    _id?: string;
    userName: string;
    local: IUserLocal;
    _v?: string;
}

export interface UserForm {
    userName: string;
    email: string;
    password: string;
}

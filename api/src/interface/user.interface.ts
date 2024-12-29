import { Document } from "mongoose";
export interface IUserLocal {
    email: string;
    password: string;
}

export interface IUser extends Document {
    userName: string;
    local: IUserLocal;
    comparePassword: (
        password: string,
        hashedPassword: string
    ) => Promise<boolean>;
}

export interface UserForm {
    userName: string;
    email: string;
    password: string;
}

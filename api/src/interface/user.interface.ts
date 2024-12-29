import { Document } from "mongoose";

export interface IUserLocal {
    email: string;
    password: string;
}

export interface IUser extends Document {
    name: string;
    local: IUserLocal;
}

export interface UserForm {
    name: string;
    email: string;
    password: string;
}

import mongoose, { Model } from "mongoose";
import { IUser } from "../../interface/user.interface";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userName: { type: String, required: true },
        local: {
            email: { type: String, required: true },
            password: { type: String, required: true },
        },
    },
    { collection: "users" }
);

userSchema.statics.hashPassword = async (password: string) => {
    try {
        const hash = await bcrypt.hash(password, 12);
        return hash;
    } catch (error) {
        throw error;
    }
};

userSchema.methods.comparePassword = (
    password: string,
    hashPassword: string
) => {
    return bcrypt.compare(password, hashPassword);
};

interface IUserModel extends Model<IUser> {
    hashPassword: (password: string) => string;
}
export const User = mongoose.model<IUser, IUserModel>("user", userSchema);

import mongoose, { Schema } from "mongoose";
import { IUser } from "../../interface/user.interface";
const userSchema = new Schema(
    {
        name: { type: String, required: true },
        local: {
            email: { type: String, required: true },
            password: { type: String, required: true },
        },
    },
    { collection: "users" }
);

export const User = mongoose.model<IUser>("user", userSchema);

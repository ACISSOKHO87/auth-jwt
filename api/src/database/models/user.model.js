const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        userName: { String, required: true },
        local: {
            email: { String, required: true },
            password: { String, required: true },
        },
    },
    { collection: "user" }
);

export const User = mongoose.model("User", userSchema);

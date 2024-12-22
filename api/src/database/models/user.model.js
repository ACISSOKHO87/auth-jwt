const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        userName: { type: String, required: true },
        local: {
            email: { type: String, required: true },
            password: { type: String, required: true },
        },
    },
    { collection: "user" }
);

module.exports = mongoose.model("User", userSchema);

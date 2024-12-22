const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

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

userSchema.statics.hashPassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password, 12);
        return hash;
    } catch (error) {
        throw error;
    }
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.local.password);
};

module.exports = mongoose.model("User", userSchema);

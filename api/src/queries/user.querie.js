const User = require("../database/models/user.model");

exports.createUser = async (body) => {
    try {
        const newUser = {
            ...body,
        };

        return newUser.save();
    } catch (error) {
        throw error;
    }
};

exports.findUserByEmail = (email) => {
    return User.findOne({ "local.email": email });
};

exports.findUserById = (id) => {
    return User.findById(id);
};

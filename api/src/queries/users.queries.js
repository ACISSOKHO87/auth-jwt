const User = require("../database/models/user.model");

exports.createUser = async (body) => {
    try {
        const hash = await User.hashPassword(body.local.password);
        const newUser = new User({
            ...body,
            local: {
                email: body.local.email,
                password: hash,
            },
        });

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

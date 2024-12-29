import { User } from "../database/model/user.model";
import { UserForm } from "../interface/user.interface";

export const createUser = async (user: UserForm) => {
    try {
        const hash = await User.hashPassword(user.password);
        const newUser = new User({
            name: user.userName,
            local: {
                email: user.email,
                password: hash,
            },
        });

        return newUser.save();
    } catch (error) {
        throw error;
    }
};

export const findUserByEmail = (email: string) => {
    return User.findOne({ "local.email": email });
};

export const findUserById = (id: string) => {
    return User.findById(id);
};

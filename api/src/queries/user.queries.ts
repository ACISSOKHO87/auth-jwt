import { User } from "../database/model/user.model";
import { UserForm } from "../interface/user.interface";

export const createUser = async (body: UserForm) => {
    try {
        const hash = await User.hashPassword(body.password);
        const newUser = new User({
            name: body.name,
            local: {
                email: body.email,
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

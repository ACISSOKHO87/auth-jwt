const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const {
    findUserByEmail,
    createUser,
    findUserById,
} = require("../queries/users.queries");
const User = require("../database/models/user.model");
const secret = "2838d531-443a-4d62-83fb-a9f1942f88c4";
const {
    createJwtToken,
    extractUserFromToken,
} = require("../config/jwt.config");

exports.signup = async (req, res) => {
    try {
        const body = req.body;
        const email = await findUserByEmail(body.local.email);
        if (email) {
            res.json({
                status: StatusCodes.BAD_REQUEST,
                message: "L'email existe, Veuillez vous connecter",
            });
        } else {
            const userSaved = await createUser(body);
            res.json({
                status: StatusCodes.CREATED,
                message: "User enregistré avec succès",
                userSaved,
            });
        }
    } catch (error) {
        throw error;
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        console.log(user);
        if (user) {
            const compare = await user.comparePassword(password);
            if (compare) {
                const token = createJwtToken(user);
                res.cookie("token", token);
                res.json({
                    status: StatusCodes.OK,
                    token,
                    user,
                });
            } else {
                res.json({
                    status: StatusCodes.NOT_FOUND,
                    message:
                        "Email ou mot de passe invalide, Veuillez réessayer",
                });
            }
        } else {
            res.json({
                status: StatusCodes.NOT_FOUND,
                message: "Email ou mot de passe invalide, Veuillez réessayer",
            });
        }
    } catch (error) {
        throw error;
    }
};

exports.profil = async (req, res) => {
    try {
        const user = await findUserById(req.userId);
        res.json({
            status: StatusCodes.OK,
            user,
        });
    } catch (error) {
        throw error;
    }
};

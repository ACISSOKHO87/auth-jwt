import { StatusCodes } from "http-status-codes";
// import { User } from "../database/model/user.model";

import { Request, Response } from "express";

import { findUserByEmail, createUser } from "../queries/user.queries";
import { createJwtToken } from "../config/jwt.config";

export const signup = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const user = await findUserByEmail(body.email);
        if (user) {
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
        console.log(error);
        res.json({
            status: StatusCodes.BAD_REQUEST,
            message: "Incident, Veuillez réessayer plus tard",
        });
    }
};

exports.signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        if (user) {
            const compare = await user.comparePassword(
                password,
                user.local.password
            );
            console.log(compare);
            if (compare) {
                const token = createJwtToken(user._id);
                res.cookie("token", token, { httpOnly: true });
                res.json({
                    status: StatusCodes.OK,
                    user,
                });
            } else {
                res.json({
                    status: StatusCodes.BAD_REQUEST,
                    message:
                        "Email ou mot de passe invalide, Veuillez réessayer",
                });
            }
        } else {
            res.json({
                status: StatusCodes.BAD_REQUEST,
                message: "Email ou mot de passe invalide, Veuillez réessayer",
            });
        }
    } catch (error) {
        res.json({
            status: StatusCodes.BAD_REQUEST,
            message: "Email ou mot de passe invalide, Veuillez réessayer",
        });
    }
};

// exports.currentUser = async (req: Request, res: Response) => {
//     const userId = req.userId;
//     try {
//         const user = await findUserById(userId);
//         res.json({
//             status: StatusCodes.OK,
//             user,
//         });
//     } catch (error) {
//         throw error;
//     }
// };

exports.signout = (_: Request, res: Response) => {
    res.clearCookie("token");
    res.json({
        status: StatusCodes.OK,
        message: "User déconnecté",
    });
};

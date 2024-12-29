import { StatusCodes } from "http-status-codes";
// import { User } from "../database/model/user.model";

import { Request, Response } from "express";

import {
    findUserByEmail,
    createUser,
    findUserById,
} from "../queries/user.queries";
import { createJwtToken } from "../config/jwt.config";
import { UserForm } from "../interface/user.interface";

export const signup = async (req: Request, res: Response) => {
    const body: UserForm = req.body;
    try {
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

export const signin = async (req: Request, res: Response) => {
    console.log("req.body: ", req.body);
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
                const token = createJwtToken(user);
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
            message: "Incident, veuillez réessayez plus tart",
        });
    }
};

export const currentUser = async (req: Request, res: Response) => {
    const userId = req.body.userId;
    try {
        const user = await findUserById(userId);
        res.json({
            status: StatusCodes.OK,
            user,
        });
    } catch (error) {
        throw error;
    }
};

export const signout = (_: Request, res: Response) => {
    res.clearCookie("token");
    res.json({
        status: StatusCodes.OK,
        message: "User déconnecté",
    });
};

import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

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
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        if (user) {
            const compare = await user.comparePassword(
                password,
                user.local.password
            );
            if (compare) {
                const token = createJwtToken(user);
                res.cookie("token", token, { path: "/", httpOnly: true });
                res.json(user);
            } else {
                res.status(StatusCodes.BAD_REQUEST).json(
                    "Email ou mot de passe invalide"
                );
            }
        } else {
            res.status(StatusCodes.BAD_REQUEST).json(
                "Email ou mot de passe invalide"
            );
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(
            "Email ou mot de passe invalide"
        );
    }
};

export const currentUser = async (req: Request, res: Response) => {
    const { token } = req.cookies;
    try {
        const decodeToken = jwt.verify(token, process.env.SECRET!);
        const user = await findUserById(decodeToken.sub as string);
        if (user) {
            res.json(user);
        } else {
            res.json(null);
        }
    } catch (error) {
        res.json(null);
    }
};

export const signout = (_: Request, res: Response) => {
    res.clearCookie("token");
    res.end();
};

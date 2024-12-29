import { NextFunction, Request, Response } from "express";
import { IUser } from "../interface/user.interface";

const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

export const createJwtToken = (user: IUser) => {
    const jwtToken = jwt.sign(
        {
            sub: user._id!.toString(),
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // durée de validité 24h
            algorithm: "RS256",
        },
        process.env.SECRET
    );
    return jwtToken;
};

export const extractUserFromToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET, (err: any, decode: any) => {
        if (err) {
            res.clearCookie("token");
            res.json({
                status: StatusCodes.UNAUTHORIZED,
                message: "Token invalide",
            });
        } else {
            req.body.userId = decode.sub;
            next();
        }
    });
};

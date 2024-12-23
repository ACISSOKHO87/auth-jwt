const jwt = require("jsonwebtoken");
const { findUserById } = require("../queries/users.queries");
const { StatusCodes } = require("http-status-codes");
const secret = "2838d531-443a-4d62-83fb-a9f1942f88c4";

export const createJwtToken = (user) => {
    const jwtToken = jwt.sign({ sub: user._id.toString() }, secret);
    return jwtToken;
};

export const extractUserFromToken = async (req, res, next) => {
    const token = req.cookies.jwt;
    jwt.verify(token, secret, (err, decode) => {
        if (err) {
            res.json({
                status: StatusCodes.BAD_REQUEST,
                message: "Token invalide",
            });
        } else {
            req.userId = decode.sub;
            next();
        }
    });
};

const jwt = require("jsonwebtoken");
const { findUserById } = require("../queries/users.queries");
const { StatusCodes } = require("http-status-codes");
const secret = "2838d531-443a-4d62-83fb-a9f1942f88c4";

exports.createJwtToken = (user) => {
    const jwtToken = jwt.sign(
        {
            sub: user._id.toString(),
            exp: Math.floor(Date.now() / 1000) + 2,
        },
        secret
    );
    return jwtToken;
};

exports.extractUserFromToken = async (req, res, next) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, (err, decode) => {
        if (err) {
            res.clearCookie("token");
            res.json({
                status: StatusCodes.UNAUTHORIZED,
                message: "Token invalide",
            });
        } else {
            req.userId = decode.sub;
            next();
        }
    });
};

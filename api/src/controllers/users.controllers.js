const { StatusCodes } = require("http-status-codes");
const { findUserByEmail, createUser } = require("../queries/users.queries");

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
            });
        }
    } catch (error) {
        throw error;
    }
};

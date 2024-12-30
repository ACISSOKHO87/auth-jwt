import mongoose from "mongoose";

export const MongodbClient = {
    initialize: async () => {
        try {
            const DB_URL = `mongodb+srv://${process.env.DB_USER!}:${process.env
                .DB_PASS!}@cluster0.cheuw.mongodb.net/authJwt?retryWrites=true&w=majority`;
            const client = mongoose.connect(DB_URL);
            client.then(() => console.log("Connexion à la DB réussie"));
        } catch (error) {
            console.log(error);
        }
    },
};

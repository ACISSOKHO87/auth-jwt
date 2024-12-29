import mongoose from "mongoose";

export const MongodbClient = {
    initialize: () => {
        try {
            const client = mongoose.connect(process.env.MONGO_URL!);
            client.then(() => console.log("Connexion à la DB réussie"));
        } catch (error) {
            console.log(error);
        }
    },
};

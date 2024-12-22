const mongoose = require("mongoose");

const MongodbClient = {
    initialize: () => {
        try {
            const client = mongoose.connect("mongodb://localhost:27017/test");
            client.then(() => console.log("Connexion à la DB réussie"));
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = MongodbClient;

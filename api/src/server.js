const express = require("express");
const MongodbClient = require("./database/index.js");
const { StatusCodes } = require("http-status-codes");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

const PORT = 9500;

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.get("/api", (req, res) => {
    res.json({
        status: 200,
        data: {
            message: "Bienvenue sur auth with jsonwebtoken",
        },
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    MongodbClient.initialize();
});

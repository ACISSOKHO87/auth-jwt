const express = require("express");
const MongodbClient = require("./database/index.js");
const { StatusCodes } = require("http-status-codes");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

const usersRoutes = require("./routes/users.routes.js");
const PORT = 9500;

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use("/api/user", usersRoutes);
app.get("/api", (req, res) => {
    res.json({
        status: 200,
        message: "Bienvenue sur auth with jsonwebtoken",
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    MongodbClient.initialize();
});

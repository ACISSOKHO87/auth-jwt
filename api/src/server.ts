import express, { Application, Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import helmet from "helmet";
import cookie from "cookie-parser";
import { MongodbClient } from "./database";
import userRoutes from "./routes/user.routes";

const PORT = parseInt(process.env.PORT as string, 10) || 9500;
dotenv.config();
const app: Application = express();

app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use("/api/user", userRoutes);

app.get("/api", (_: Request, res: Response) => {
    res.json({
        status: 200,
        message: "Bienvenue sur auth with jsonwebtoken",
    });
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    MongodbClient.initialize();
});

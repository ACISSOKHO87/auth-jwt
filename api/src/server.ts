import express, { Application } from "express";
import cors from "cors";

import * as dotenv from "dotenv";
import { MongodbClient } from "./database";

const PORT = 9500;
dotenv.config();
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, () => {
    MongodbClient.initialize();
});

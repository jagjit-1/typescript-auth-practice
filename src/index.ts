import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import router from "./router";

const app = express();
dotenv.config();

app.use(cors({
    credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("server running on http://localhost:8080/")
});


mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL || "").then(() => console.log("connected"));
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use('/', router());
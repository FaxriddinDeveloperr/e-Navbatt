import express from "express";
import { config } from "dotenv";
import { connectDB } from "./db/index.js";
import adminRouter from "./routes/admin.routes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import fs from "fs";
import path from "path";
config();

const app = express();
const PORT = +process.env.PORT;

app.use(express.json());
app.use(cookieParser());
await connectDB();
app.use(morgan("dev"));

const __dirmane = path.resolve();
const filename = fs.createReadStream(path.join(__dirmane, "access.log"), {
  flags: "a",
});

if (process.env.NODE_ENV) {
    morgan('combined',{
        stream:filename
    })
} else {
    morgan.use(morgan('dev'))
}

app.use("/admin", adminRouter);

app.listen(PORT, () => console.log("Server running on port", PORT));

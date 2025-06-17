import dotenv from "dotenv";
dotenv.config();
import router from "./routes/signUp.routes.js";
import express from "express";
import connectDb from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.listen(port, () => {
  connectDb();
  console.log(`server has been started at port: ${port}`);
});

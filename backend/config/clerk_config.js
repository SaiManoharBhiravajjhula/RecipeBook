import dotenv from "dotenv";
dotenv.config();
import { createClerkClient } from "@clerk/backend";

const clerk = new createClerkClient({ secretKey: process.env.SECRET_KEY });
console.log({ secretKey: process.env.SECRET_KEY });

export default clerk;

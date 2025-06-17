import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected sucessfully");
  } catch (error) {
    console.log("connection error", error);
  }
};

export default connectDb;

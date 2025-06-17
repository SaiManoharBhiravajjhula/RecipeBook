import express from "express";
import User from "../models/user.model.js";
import clerk from "../config/clerk_config.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    const existingEmail = await User.findOne({ email });
    if (!existingEmail) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    const session = await clerk.users.verifySession(existingEmail.clerkId);

    res.status(200).json({ message: "User logged in successfully", session });
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "error while logging in user" });
  }
});

export default router;

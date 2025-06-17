import express from "express";
import User from "../models/user.model.js";
import clerk from "../config/clerk_config.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({
        message: "Email already exists. please use a different email",
      });
    }

    const user = await clerk.users.createUser({
      emailAddress: [email],
      firstName: firstName,
      lastName: lastName,
      skipPasswordRequirement: true,
    });

    const newUser = new User({
      firstName,
      lastName,
      email,
      clerkId: user.id,
    });
    await newUser.save();
    res.status(201).json({
      message: "user created Successfully",
      user: newUser,
    });

    console.log("user created", newUser);
  } catch (error) {
    console.log(`error while creating user: ${error.message}`);
    return res.status(500).json({
      message: "error while registering user",
    });
  }
});

export default router;

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password, email, userType, categories } = req.body;

    // Check for minimum password length on the server side
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      password: hashedPassword,
      email,
      userType,
      categories,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error:", error);
    if (error.code === 11000) {
      // Handle duplicate email error
      res.status(400).json({ error: "Email already exists" });
    } else if (error.errors && error.errors.password) {
      // Handle password validation error
      res.status(400).json({ error: error.errors.password.message });
    } else {
      res.status(500).json({ error: "Registration failed" });
    }
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Authentication failed - User doesn't exist" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Authentication failed - Password doesn't match" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        userType: user.userType,
        categories: user.categories,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("Authtoken", token);

    res.json({
      status: true,
      message: "Login successful",
      token,
      userType: user.userType,
      categories: user.categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("Authtoken");
  res.status(200).send("Logout successful");
});

module.exports = router;

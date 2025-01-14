// Default login route for all roles
const express = require("express");
const router = express.Router();
const User = require("../schema/user");
const Admin = require("../schema/adminSchema");
const Doctor = require("../schema/doctorSchema");
const HealthStaff = require("../schema/healthStaff");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    let user = await User.findOne({ email }).select("+password +role");
    let role = "Patient";

    // If user is not found, check for admin
    if (!user) {
      user = await Admin.findOne({ email }).select("+password +role");
      role = "Admin";
    }

    // If admin is not found, check for doctor
    if (!user) {
      user = await Doctor.findOne({ email }).select("+password +role");
      role = "Doctor";
    }

    // If doctor is not found, check for health staff
    if (!user) {
      user = await HealthStaff.findOne({ email }).select("+password +role");
      role = "Health Staff";
    }

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Check if the passwords match
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Passwords match, user is authenticated
    console.log("Role Before JWT Sign:", role);
    // Generate a token
    const token = jwt.sign(
      { userId: user._id, role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    // Return the token and role to the client
    console.log(role);
    res.json({ token, role });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      error: "An error occurred during login. Please try again later.",
    });
  }
});

module.exports = router;

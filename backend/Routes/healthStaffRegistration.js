const express = require("express");
const router = express.Router();
const HealthStaff = require("../schema/healthStaff"); // Assuming the schema for health staff
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
 
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if health staff already exists with the provided email
    const existingHealthStaff = await HealthStaff.findOne({ email });
    if (existingHealthStaff) {
      return res
        .status(400)
        .json({ error: "Health Staff with this email already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save new health staff document
    const newHealthStaff = new HealthStaff({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      image: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`
      // ... other health staff-specific fields
    });

    await newHealthStaff.save();

    // Send a success response
    res.json({success:true,
       message: "Health Staff registration successful" });
  } catch (error) {
    console.error("An error occurred during health staff registration:", error);
    res.status(500).json({
      success:false,
      message:
        "An error occurred during health staff registration. Please try again later.",
    });
  }
});

module.exports = router;

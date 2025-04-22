const mongoose = require("mongoose");

const healthStaffSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Core Member",
    enum: ["Pending", "pending", "Core Member"],
  },
  image: {
    type: String,
    // required: true,
  },
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

const HealthStaff = mongoose.model("HealthStaff", healthStaffSchema);

module.exports = HealthStaff;

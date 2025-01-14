const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  adminCode: { type: String, required: true },
  contactNumber: { type: String, required: true },
  role: { type: String, default: "Admin",  },//enum: ["Pending", "Admin"]
  // ... other admin-specific fields
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

//
/** 
* Paste one or more documents here

{
  "_id": {
    "$oid": "663c8b2b735155d082903b3e"
  firstName: "admin",
  "lastName": "admin1",
  "email": "admin1@admin.com",
  "password": "admin123!",
  "adminCode": "123456",
  "contactNumber": "1234567890",
  "role": "Admin",
  }
}
*/
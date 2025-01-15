const express = require("express");
const router = express.Router();
const Admission = require("../schema/admissionSchema");
// const Patient = require("../schema/Patients"); // Import the user schema

const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Authentication failed. Token invalid." });
    }

    req.user = decodedToken;
    next();
  });
};

// API route to save Admission form data
router.post("/", async (req, res) => {
  try {
    const admissionData = req.body;

    // Create a new admission record in the database
    const newAdmission = await Admission.create(admissionData);

    res.status(201).json(newAdmission); // Return the newly created admission record
  } catch (error) {
    console.error("Error submitting admission form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting admission form" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const admissions = await Admission.find(); // Fetch all admission records from the database
    res.status(200).json(admissions); // Return the fetched admission records
  } catch (error) {
    console.error("Error fetching admission data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching admission data" });
  }
});

// module.exports = router;

// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const { page = 1, limit = 10 } = req.query;
//     const admissions = await Admission.find()
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .exec();
    
//     const count = await Admission.countDocuments();

//     res.status(200).json({
//       admissions,
//       totalPages: Math.ceil(count / limit),
//       currentPage: page
//     });
//   } catch (error) {
//     console.error("Error fetching admission data:", error);
//     res.status(500).json({ error: "An error occurred while fetching admission data" });
//   }
// });
// Updated GET route to fetch data and send it to the Flask app for prediction
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const admissions = await Admission.find(); // Fetch all admission records from the database

//     // Example: Prepare data to send to the Flask app
//     const inputData = admissions.map(admission => {
//       return {
//         feature1: admission.feature1, // Adjust according to your schema
//         feature2: admission.feature2, // Adjust according to your schema
//         // Add more features as required
//       };
//     });

//     // Send data to Flask app for prediction
//     const response = await axios.post('http://localhost:5000/api/predict', inputData);

//     res.status(200).json(response.data); // Return the prediction results
//   } catch (error) {
//     console.error("Error fetching admission data or predicting:", error);
//     res.status(500).json({ error: "An error occurred while fetching admission data or predicting" });
//   }
// });

module.exports = router;
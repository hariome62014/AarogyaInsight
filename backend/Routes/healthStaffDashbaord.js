const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Patient = require("../schema/admissionSchema.js"); // User Assuming the schema for patients
const Admission = require ("../schema/admissionSchema.js")
const Patients = require ("../schema/patientsSchema.js")
const textReports  = require ( "../schema/textSchema.js")
// // GET all patients
// router.get("/patients", async (req, res) => {
//   try {
//     const token = req.header("Authorization");

//     if (!token) {
//       return res.status(401).json({ error: "Authentication token not found." });
//     }

//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     if (decodedToken.role !== "Health Staff") {
//       return res.status(403).json({ error: "Insufficient role permissions." });
//     }

//     const patients = await Patient.find();
//     res.json(patients);
//   } catch (error) {
//     console.error("Error fetching patients:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching patients" });
//   }
// });

// // GET patient by ID
// router.get("/patients/:id", async (req, res) => {
//   try {
//     const token = req.header("Authorization");

//     if (!token) {
//       return res.status(401).json({ error: "Authentication token not found." });
//     }

//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     if (decodedToken.role !== "Health Staff") {
//       return res.status(403).json({ error: "Insufficient role permissions." });
//     }

//     const patient = await Patient.findById(req.params.id);
//     res.json(patient);
//   } catch (error) {
//     console.error("Error fetching patient:", error);
//     res.status(500).json({ error: "An error occurred while fetching patient" });
//   }
// });

// module.exports = router;
// GET all patients
router.get("/patients", async (req, res) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ error: "Authentication token not found." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decodedToken.role !== "HealthStaff") {
      return res.status(403).json({ error: "Insufficient role permissions." });
    }

    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching patients" });
  }
});

router.get("/reports", async (req, res) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ error: "Authentication token not found." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decodedToken.role !== "HealthStaff") {
      return res.status(403).json({ error: "Insufficient role permissions." });
    }

    const send = await textReports.find();
    res.json(send);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching patients" });
  }
});


router.get("/analytics", async (req, res) => {
  try {
    // Existing metrics
    const totalAdmissions = await Admission.countDocuments({});
    const totalDischarged = await Admission.countDocuments({ dischtime: { $ne: null } });
    const totalDeceased = await Admission.countDocuments({ hospital_expire_flag: { $ne: 0 } });
    const patientrows = await Patients.countDocuments({});

    // Gender count for pie chart
    const genderCount = await Admission.aggregate([
      {
        $lookup: {
          from: "patients", // Collection name for Patients (lowercase by convention in MongoDB)
          localField: "subject_id",
          foreignField: "SUBJECT_ID",
          as: "patientDetails",
        },
      },
      {
        $unwind: "$patientDetails",
      },
      {
        $group: {
          _id: "$patientDetails.GENDER",
          count: { $sum: 1 },
        },
      },
    ]);

    // Existing distributions
    const raceDistribution = await Admission.aggregate([
      { $group: { _id: "$race", count: { $sum: 1 } } },
    ]);

    const insuranceDistribution = await Admission.aggregate([
      { $group: { _id: "$insurance", count: { $sum: 1 } } },
    ]);

    // Age distribution for bar chart
    const ageDistribution = await Admission.aggregate([
      {
        $bucket: {
          groupBy: "$age", // Field to group by
          boundaries: [0, 18, 30, 40, 50, 60, 70, 80, 90, 100], // Define age ranges
          default: "100+", // Optional: Group ages above the last boundary
          output: {
            count: { $sum: 1 }, // Count documents in each age range
          },
        },
      },
    ]);

    res.json({
      totalAdmissions,
      totalDischarged,
      totalDeceased,
      raceDistribution,
      insuranceDistribution,
      patientrows,
      genderCount, // Added gender count for pie chart
      ageDistribution, // Added age distribution for bar chart
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;

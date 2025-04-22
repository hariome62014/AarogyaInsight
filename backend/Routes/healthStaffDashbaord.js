const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Patient = require("../schema/admissionSchema.js"); // User Assuming the schema for patients
const Admission = require("../schema/admissionSchema.js")
const Patients = require("../schema/patientsSchema.js")
const textReports = require("../schema/textSchema.js")
require("dotenv").config();

// router.get("/patients", async (req, res) => {
//   // try {
//   //   const tokenwithBearer = req.header("Authorization");

//   //   // Remove the "Bearer " prefix if present
//   //   const token = tokenwithBearer.startsWith("Bearer ")
//   //     ? tokenwithBearer.slice(7).trim()
//   //     : null;

//     // Log incoming request for debugging purposes
//     // console.log("Authorization Header:", token);

//     // // Check if token exists
//     // if (!token) {
//     //   return res.status(401).json({
//     //     success: false,
//     //     message: "Authentication token not found.",
//     //   });
//     // }

//     // let decodedToken;
//     // try {
//     //   decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     //   console.log("decodedToken",decodedToken);
//     // } catch (error) {
//     //   console.error("Error verifying token:", error.message);
//     //   return res.status(401).json({
//     //     success: false,
//     //     message: "Invalid or expired authentication token.",
//     //   });
//     // }

//     // Role-based access control
//     // if (decodedToken.role !== "Core Member") {
//     //   return res.status(403).json({
//     //     success: false,
//     //     message: "Insufficient role permissions to access this resource.",
//     //   });
//     // }

//     // Fetch patients data from the database
//     try {
//       const patients = await Patient.find();

//       console.log("data   aaa raha ",patients);

//       return res.status(200).json({
//         success: true,
//         message: "Patients retrieved successfully.",
//         data: patients,
       
//       });
//     } catch (dbError) {
//       console.error("Database error while fetching patients:", dbError.message);
//       return res.status(500).json({
//         success: false,
//         message: "An error occurred while fetching patients from the database.",
//       });
//     }
//   // } catch (error) {
//   //   // Handle unexpected errors
//   //   console.error("Unexpected error:", error.message);
//   //   return res.status(500).json({
//   //     success: false,
//   //     message: "An unexpected error occurred. Please try again later.",
//   //   });
//   // }

// });


// router.get("/patients", async (req, res) => {
//   try {
//     // Extract pagination parameters
//     const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
//     const limit = parseInt(req.query.limit) || 10; // Default to 10 records per page

//     // Calculate the number of documents to skip
//     const skip = (page - 1) * limit;

//     // Fetch data with pagination
//     const [patients, totalCount] = await Promise.all([
//       Patient.find().skip(skip).limit(limit), // Fetch the records for the current page
//       Patient.countDocuments(), // Get the total count of records
//     ]);

//     // Calculate total pages
//     const totalPages = Math.ceil(totalCount / limit);

//     res.json({
//       data: patients,
//       currentPage: page,
//       totalPages,
//       totalRecords: totalCount,
//     });
//   } catch (error) {
//     console.error("Error fetching patients:", error);
//     res.status(500).json({ error: "Failed to fetch patient data." });
//   }
// });



router.get("/patients", async (req, res) => {
  try {
    // Extract pagination and filtering parameters
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 records per page
    const diagnoses = req.query.diagnoses ? req.query.diagnoses.split(",") : []; // Array of selected diagnoses
    const searchQuery = req.query.searchQuery ? parseInt(req.query.searchQuery) : null; // Parse searchQuery as integer

    console.log("selectedDiagnoses2pp: ", diagnoses);

    // Build the filter object
    const filter = {};

    // Add diagnosis filter if diagnoses are provided
    if (diagnoses.length > 0) {
      // Use $all with $regex to match diagnoses in the comma-separated diagnosis field
      filter.diagnosis = {
        $all: diagnoses.map((diagnosis) => new RegExp(`\\b${diagnosis}\\b`, "i")), // Match whole words, case-insensitive
      };
    }

    // Add searchQuery filter if searchQuery is provided and is a valid number
    if (searchQuery !== null && !isNaN(searchQuery)) {
      filter.subject_id = searchQuery; // Exact match for subject_id (integer)
    }

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch data with pagination and filtering
    const [patients, totalCount] = await Promise.all([
      Patient.find(filter).skip(skip).limit(limit), // Fetch filtered records for the current page
      Patient.countDocuments(filter), // Get the total count of filtered records
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      data: patients,
      currentPage: page,
      totalPages,
      totalRecords: totalCount,
    });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Failed to fetch patient data." });
  }
});

// router.get("/reports", async (req, res) => {
//   try {
//     // const token = req.header("Authorization");

//     // if (!token) {
//     //   return res.status(401).json({ error: "Authentication token not found." });
//     // }

//     // const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     // if (decodedToken.role !== "Core Member") {
//     //   return res.status(403).json({ error: "Insufficient role permissions." });
//     // }

//     const send = await textReports.find();
//     console.log ( send  , " sending this data ");
//     res.json(send);
//   } catch (error) {
//     console.error("Error fetching patients:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching patients" });
//   }
// });


router.get('/reports', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1; // Current page
    const limit = parseInt(req.query.limit, 10) || 5; // Items per page
    const searchQuery = req.query.searchQuery ? parseInt(req.query.searchQuery) : null; // Parse searchQuery as integer

    console.log("ReportsearchQuery: ",searchQuery);

    // Build the filter object
    const filter = {};

    // Add searchQuery filter if searchQuery is provided and is a valid number
    if (searchQuery !== null && !isNaN(searchQuery)) {
      filter.id = searchQuery; // Assuming `subject_id` is the field to filter by
    }

    // Fetch total count for calculating total pages
    const totalCount = await textReports.countDocuments(filter); // Count filtered documents
    const totalPages = Math.ceil(totalCount / limit);

    // Fetch paginated data with filtering
    const reports = await textReports.find(filter).skip((page - 1) * limit).limit(limit);

    res.status(200).json({
      items: reports, // Current page data
      totalPages,     // Total number of pages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching reports' });
  }
});

// router.get("/reports", async (req, res) => {
//   try {

//     console.log("Reached reports");
//     // const token = req.header("Authorization");

//     // if (!token) {
//     //   return res.status(401).json({ error: "Authentication token not found." });
//     // }

//     // const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     // if (decodedToken.role !== "HealthStaff") {
//     //   return res.status(403).json({ error: "Insufficient role permissions." });
//     // }


//     const send = await textReports.find();
//     console.log("Sending the Data",send);
//     return res.json(send);
//   } catch (error) {
//     console.error("Error fetching patients:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching patients" });
//   }
// });



// router.get("/analytics", async (req, res) => {
//   try {
//     // Existing metrics
//     const totalAdmissions = await Admission.countDocuments({});
//     const totalDischarged = await Admission.countDocuments({ dischtime: { $ne: null } });
//     const totalDeceased = await Admission.countDocuments({ hospital_expire_flag: { $ne: 0 } });
//     const patientrows = await Patients.countDocuments({});

//     // Gender count for pie chart
//     const genderCount = await Admission.aggregate([
//       { $group: { _id: "$gender", count: { $sum: 1 } } },
//     ]);

//     // Existing distributions
//     const raceDistribution = await Admission.aggregate([
//       { $group: { _id: "$ethnicity", count: { $sum: 1 } } },
//     ]);

//     const insuranceDistribution = await Admission.aggregate([
//       { $group: { _id: "$insurance", count: { $sum: 1 } } },
//     ]);

//     // Age distribution for bar chart
//     const ageDistribution = await Admission.aggregate([
//       {
//         $bucket: {
//           groupBy: "$age", // Field to group by
//           boundaries: [0, 18, 30, 40, 50, 60, 70, 80, 90, 100], // Define age ranges
//           default: "100+", // Optional: Group ages above the last boundary
//           output: {
//             count: { $sum: 1 }, // Count documents in each age range
//           },
//         },
//       },
//     ]);

//     const topDiagnoses = await Admission.aggregate([
//       { $match: { diagnosis: { $ne: null } } }, // Filter out null/empty diagnoses
//       { $group: { _id: "$diagnosis", count: { $sum: 1 } } }, // Group by diagnosis
//       { $sort: { count: -1 } },
//       { $skip: 1 }, // Skip the first document
//       { $limit: 10 } 

//     ]);


//     const maritalStatusDistribution = await Admission.aggregate([
//       { $match: { marital_status: { $ne: null } } }, // Filter out null/empty statuses
//       { $group: { _id: "$marital_status", count: { $sum: 1 } } } // Group by marital status
//     ]);


//     res.json({
//       totalAdmissions,
//       totalDischarged,
//       totalDeceased,
//       raceDistribution,
//       insuranceDistribution,
//       patientrows,
//       genderCount, // Added gender count for pie chart
//       ageDistribution, // Added age distribution for bar chart
//       topDiagnoses,
//       maritalStatusDistribution
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// router.get("/analytics", async (req, res) => {
//   try {
//     const { diagnoses } = req.query; // Get diagnoses filter from query params

//     // Build a filter object
//     const filter = diagnoses
//       ? { diagnosis: { $in: Array.isArray(diagnoses) ? diagnoses : [diagnoses] } }
//       : {};

//     // Filter data based on selected diagnoses
//     const totalAdmissions = await Admission.countDocuments(filter);
//     const totalDischarged = await Admission.countDocuments({
//       ...filter,
//       dischtime: { $ne: null },
//     });
//     const totalDeceased = await Admission.countDocuments({
//       ...filter,
//       hospital_expire_flag: { $ne: 0 },
//     });

//     const genderCount = await Admission.aggregate([
//       { $match: filter },
//       { $group: { _id: "$gender", count: { $sum: 1 } } },
//     ]);

//     const raceDistribution = await Admission.aggregate([
//       { $match: filter },
//       { $group: { _id: "$ethnicity", count: { $sum: 1 } } },
//     ]);

//     const insuranceDistribution = await Admission.aggregate([
//       { $match: filter },
//       { $group: { _id: "$insurance", count: { $sum: 1 } } },
//     ]);

//     const ageDistribution = await Admission.aggregate([
//       { $match: filter },
//       {
//         $bucket: {
//           groupBy: "$age",
//           boundaries: [0, 18, 30, 40, 50, 60, 70, 80, 90, 100],
//           default: "100+",
//           output: { count: { $sum: 1 } },
//         },
//       },
//     ]);

//     const maritalStatusDistribution = await Admission.aggregate([
//       { $match: { ...filter, marital_status: { $ne: null } } },
//       { $group: { _id: "$marital_status", count: { $sum: 1 } } },
//     ]);

//     res.json({
//       totalAdmissions,
//       totalDischarged,
//       totalDeceased,
//       genderCount,
//       raceDistribution,
//       insuranceDistribution,
//       ageDistribution,
//       maritalStatusDistribution,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// Endpoint to fetch analytics
// router.post("/analytics", async (req, res) => {
//   const { diagnoses } = req.body;

//   try {
//     const matchStage = diagnoses?.length ? { diagnosis: { $in: diagnoses } } : {};

//     const analytics = await Admission.aggregate([
//       { $match: matchStage },
//       {
//         $facet: {
//           totalAdmissions: [{ $count: "count" }],
//           totalDischarged: [{ $match: { discharge_location: { $ne: null } } }, { $count: "count" }],
//           totalDeceased: [{ $match: { hospital_expire_flag: 1 } }, { $count: "count" }],
//           raceDistribution: [{ $group: { _id: "$ethnicity", count: { $sum: 1 } } }],
//           insuranceDistribution: [{ $group: { _id: "$insurance", count: { $sum: 1 } } }],
//           genderCount: [{ $group: { _id: "$gender", count: { $sum: 1 } } }],
//           ageDistribution: [{ $bucket: { groupBy: "$age", boundaries: [0, 20, 40, 60, 80, 100], default: "80+", output: { count: { $sum: 1 } } } }],
//           maritalStatusDistribution: [{ $group: { _id: "$marital_status", count: { $sum: 1 } } }],
//           topDiagnoses: [{ $group: { _id: "$diagnosis", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 10 }],
//         },
//       },
//     ]);

//     const result = analytics[0] || {};
//     res.status(200).json({
//       totalAdmissions: result.totalAdmissions[0]?.count || 0,
//       totalDischarged: result.totalDischarged[0]?.count || 0,
//       totalDeceased: result.totalDeceased[0]?.count || 0,
//       raceDistribution: result.raceDistribution || [],
//       insuranceDistribution: result.insuranceDistribution || [],
//       genderCount: result.genderCount || [],
//       ageDistribution: result.ageDistribution || [],
//       maritalStatusDistribution: result.maritalStatusDistribution || [],
//       topDiagnoses: result.topDiagnoses || [],
//     });
//   } catch (error) {
//     console.error("Error fetching analytics data:", error);
//     res.status(500).json({ message: "Failed to fetch analytics." });
//   }
// });


// router.post("/analytics", async (req, res) => {
//   const { diagnoses } = req.body;

//   try {
//     // Build the $match stage to check if all selected diagnoses are present
//     const matchStage = diagnoses?.length
//       ? { diagnosis: { $all: diagnoses } }
//       : {};

//     const analytics = await Admission.aggregate([
//       {
//         // Convert diagnosis column to an array of strings, only if it's a string
//         $set: {
//           diagnosis: {
//             $cond: {
//               if: { $eq: [{ $type: "$diagnosis" }, "string"] },
//               then: {
//                 $reduce: {
//                   input: { $split: ["$diagnosis", ","] },
//                   initialValue: [],
//                   in: {
//                     $concatArrays: [
//                       "$$value",
//                       [{ $trim: { input: "$$this" } }], // Trim whitespace
//                     ],
//                   },
//                 },
//               },
//               else: [], // Set to an empty array if it's not a string
//             },
//           },
//         },
//       },
//       { $match: matchStage }, // Match rows where all diagnoses are present
//       {
//         $facet: {
//           totalAdmissions: [{ $count: "count" }], // Count total admissions
//           totalDischarged: [
//             { $match: { discharge_location: { $ne: null } } }, // Match discharged patients
//             { $count: "count" },
//           ],
//           totalDeceased: [
//             { $match: { hospital_expire_flag: 1 } }, // Match deceased patients
//             { $count: "count" },
//           ],
//           raceDistribution: [
//             { $group: { _id: "$ethnicity", count: { $sum: 1 } } }, // Group by ethnicity
//           ],
//           insuranceDistribution: [
//             { $group: { _id: "$insurance", count: { $sum: 1 } } }, // Group by insurance
//           ],
//           genderCount: [
//             { $group: { _id: "$gender", count: { $sum: 1 } } }, // Group by gender
//           ],
//           ageDistribution: [
//             {
//               $bucket: {
//                 groupBy: "$age", // Group by age range
//                 boundaries: [0, 20, 40, 60, 80, 100],
//                 default: "80+",
//                 output: { count: { $sum: 1 } },
//               },
//             },
//           ],
//           maritalStatusDistribution: [
//             { $group: { _id: "$marital_status", count: { $sum: 1 } } }, // Group by marital status
//           ],
//           topDiagnoses: [
//             { $unwind: "$diagnosis" }, // Break array into individual values
//             { $group: { _id: "$diagnosis", count: { $sum: 1 } } }, // Group by diagnosis
//             { $sort: { count: -1 } }, // Sort by frequency
//             { $limit: 10 }, // Get top 10 diagnoses
//           ],
//         },
//       },
//     ]);

//     const result = analytics[0] || {};
//     res.status(200).json({
//       totalAdmissions: result.totalAdmissions[0]?.count || 0,
//       totalDischarged: result.totalDischarged[0]?.count || 0,
//       totalDeceased: result.totalDeceased[0]?.count || 0,
//       raceDistribution: result.raceDistribution || [],
//       insuranceDistribution: result.insuranceDistribution || [],
//       genderCount: result.genderCount || [],
//       ageDistribution: result.ageDistribution || [],
//       maritalStatusDistribution: result.maritalStatusDistribution || [],
//       topDiagnoses: result.topDiagnoses || [],
//     });
//   } catch (error) {
//     console.error("Error fetching analytics data:", error);
//     res.status(500).json({ message: "Failed to fetch analytics." });
//   }
// });


// router.post("/analytics", async (req, res) => {
//   const { diagnoses, mortality } = req.body;

//   try {
//     // Build the $match stage for diagnoses
//     const matchStage = diagnoses?.length
//       ? { diagnosis: { $all: diagnoses } }
//       : {};

//     // Add Mortality-specific filtering to the $match stage
//     if (mortality === "admission") {
//       matchStage.hospital_expire_flag = 0; // Exclude deceased patients
//     } else if (mortality === "deceased") {
//       matchStage.hospital_expire_flag = 1; // Include only deceased patients
//     }

//     // Build the aggregation pipeline
//     const pipeline = [
//       {
//         // Convert diagnosis column to an array of strings if it's a string
//         $set: {
//           diagnosis: {
//             $cond: {
//               if: { $eq: [{ $type: "$diagnosis" }, "string"] },
//               then: {
//                 $reduce: {
//                   input: { $split: ["$diagnosis", ","] },
//                   initialValue: [],
//                   in: {
//                     $concatArrays: [
//                       "$$value",
//                       [{ $trim: { input: "$$this" } }],
//                     ],
//                   },
//                 },
//               },
//               else: [],
//             },
//           },
//         },
//       },
//       { $match: matchStage }, // Apply the dynamic match stage
//     ];

//     // Add facets based on the Mortality selection
//     if (!mortality) {
//       pipeline.push({
//         $facet: {
//           totalAdmissions: [{ $count: "count" }], // Count total admissions
//           totalDischarged: [
//             { $match: { discharge_location: { $ne: null } } },
//             { $count: "count" },
//           ],
//           totalDeceased: [
//             { $match: { hospital_expire_flag: 1 } },
//             { $count: "count" },
//           ],
//           raceDistribution: [
//             { $group: { _id: "$ethnicity", count: { $sum: 1 } } },
//           ],
//           insuranceDistribution: [
//             { $group: { _id: "$insurance", count: { $sum: 1 } } },
//           ],
//           maritalStatusDistribution: [
//             { $group: { _id: "$marital_status", count: { $sum: 1 } } },
//           ],
//           genderCount: [
//             { $group: { _id: "$gender", count: { $sum: 1 } } },
//           ],
//           ageDistribution: [
//             {
//               $bucket: {
//                 groupBy: "$age",
//                 boundaries: [0, 20, 40, 60, 80, 100],
//                 default: "80+",
//                 output: { count: { $sum: 1 } },
//               },
//             },
//           ],
//           topDiagnoses: [
//             { $unwind: "$diagnosis" },
//             { $group: { _id: "$diagnosis", count: { $sum: 1 } } },
//             { $sort: { count: -1 } },
//             { $limit: 10 },
//           ],
//         },
//       });
//     } else {
//       pipeline.push({
//         $facet: {
//           raceDistribution: [
//             { $group: { _id: "$ethnicity", count: { $sum: 1 } } },
//           ],
//           insuranceDistribution: [
//             { $group: { _id: "$insurance", count: { $sum: 1 } } },
//           ],
//           maritalStatusDistribution: [
//             { $group: { _id: "$marital_status", count: { $sum: 1 } } },
//           ],
//           genderCount: [
//             { $group: { _id: "$gender", count: { $sum: 1 } } },
//           ],
//           ageDistribution: [
//             {
//               $bucket: {
//                 groupBy: "$age",
//                 boundaries: [0, 20, 40, 60, 80, 100],
//                 default: "80+",
//                 output: { count: { $sum: 1 } },
//               },
//             },
//           ],
//           maritalStatusDistribution: [
//             { $group: { _id: "$marital_status", count: { $sum: 1 } } },
//           ],
//           topDiagnoses: [
//             { $unwind: "$diagnosis" },
//             { $group: { _id: "$diagnosis", count: { $sum: 1 } } },
//             { $sort: { count: -1 } },
//             { $limit: 10 },
//           ],
//         },
//       });
//     }

//     // Execute the aggregation pipeline
//     const analytics = await Admission.aggregate(pipeline);

//     const result = analytics[0] || {};
//     res.status(200).json({
//       totalAdmissions: result.totalAdmissions?.[0]?.count || 0,
//       totalDischarged: result.totalDischarged?.[0]?.count || 0,
//       totalDeceased: result.totalDeceased?.[0]?.count || 0,
//       raceDistribution: result.raceDistribution || [],
//       insuranceDistribution: result.insuranceDistribution || [],
//       genderCount: result.genderCount || [],
//       ageDistribution: result.ageDistribution || [],
//       maritalStatusDistribution: result.maritalStatusDistribution || [],
//       topDiagnoses: result.topDiagnoses || [],
//     });
//   } catch (error) {
//     console.error("Error fetching analytics data:", error);
//     res.status(500).json({ message: "Failed to fetch analytics." });
//   }
// });


// router.post("/analytics", async (req, res) => {
//   const { diagnoses, mortality } = req.body;

//   try {
//     // Build the $match stage for diagnoses
//     const matchStage = diagnoses?.length
//       ? { diagnosis: { $all: diagnoses } } // Filter based on selected diagnoses
//       : {}; // If no diagnoses are selected, no filtering on diagnosis

//     // If mortality is selected, include mortality filter
//     if (mortality) {
//       if (mortality === "admission") {
//         matchStage.hospital_expire_flag = 0; // Only include admissions (not deceased)
//       } else if (mortality === "deceased") {
//         matchStage.hospital_expire_flag = 1; // Only include deceased patients
//       }
//     }

//     // Build the aggregation pipeline
//     const pipeline = [
//       {
//         // Convert diagnosis column to an array of strings if it's a string
//         $set: {
//           diagnosis: {
//             $cond: {
//               if: { $eq: [{ $type: "$diagnosis" }, "string"] },
//               then: {
//                 $reduce: {
//                   input: { $split: ["$diagnosis", ","] },
//                   initialValue: [],
//                   in: {
//                     $concatArrays: [
//                       "$$value",
//                       [{ $trim: { input: "$$this" } }], // Trim spaces
//                     ],
//                   },
//                 },
//               },
//               else: [],
//             },
//           },
//         },
//       },
//       { $match: matchStage }, // Apply the dynamic match stage based on diagnosis and mortality
//     ];

//     // Add a facet for general statistics (will work with or without mortality filter)
//     pipeline.push({
//       $facet: {
//         totalAdmissions: [{ $count: "count" }],
//         totalDeceased: [{ $match: { hospital_expire_flag: 1 } }, { $count: "count" }],
//         totalDischarged: [
//           { $match: { discharge_location: { $ne: null } } },
//           { $count: "count" },
//         ],
//         raceDistribution: [
//           { $group: { _id: "$ethnicity", count: { $sum: 1 } } },
//         ],
//         insuranceDistribution: [
//           { $group: { _id: "$insurance", count: { $sum: 1 } } },
//         ],
//         maritalStatusDistribution: [
//           { $group: { _id: "$marital_status", count: { $sum: 1 } } },
//         ],
//         genderCount: [
//           { $group: { _id: "$gender", count: { $sum: 1 } } },
//         ],
//         ageDistribution: [
//           {
//             $bucket: {
//               groupBy: "$age",
//               boundaries: [0, 20, 40, 60, 80, 100],
//               default: "80+",
//               output: { count: { $sum: 1 } },
//             },
//           },
//         ],
//         topDiagnoses: [
//           { $unwind: "$diagnosis" },
//           { $group: { _id: "$diagnosis", count: { $sum: 1 } } },
//           { $sort: { count: -1 } },
//           { $limit: 10 },
//         ],
//       },
//     });

//     // Execute the aggregation pipeline
//     const analytics = await Admission.aggregate(pipeline);

//     const result = analytics[0] || {};

//     // Prepare response based on the calculated results
//     const response = {
//       totalAdmissions: result.totalAdmissions?.[0]?.count || 0,
//       totalDeceased: result.totalDeceased?.[0]?.count || 0,
//       totalDischarged: result.totalDischarged?.[0]?.count || 0,
//       raceDistribution: result.raceDistribution || [],
//       insuranceDistribution: result.insuranceDistribution || [],
//       maritalStatusDistribution: result.maritalStatusDistribution || [],
//       genderCount: result.genderCount || [],
//       ageDistribution: result.ageDistribution || [],
//       topDiagnoses: result.topDiagnoses || [],
//     };

//     res.status(200).json(response);
//   } catch (error) {
//     console.error("Error fetching analytics data:", error);
//     res.status(500).json({ message: "Failed to fetch analytics." });
//   }
// });


router.post("/analytics", async (req, res) => {
  const { diagnoses, mortality, los } = req.body;

  console.log("LOSDATA: ",los);

  try {
    // Build the $match stage for diagnoses
    const matchStage = diagnoses?.length
      ? { diagnosis: { $all: diagnoses } } // Filter based on selected diagnoses
      : {}; // If no diagnoses are selected, no filtering on diagnosis

    // If mortality is selected, include mortality filter
    if (mortality) {
      if (mortality === "admission") {
        matchStage.hospital_expire_flag = 0; // Only include admissions (not deceased)
      } else if (mortality === "deceased") {
        matchStage.hospital_expire_flag = 1; // Only include deceased patients
      }
    }

   // Map LOS selection to corresponding ranges
const losMapping = {

  // ["<=3", ">3 and <=7", ">7 and <=14",">14"]
  "<=3": 0,              // "0-3" mapped to 0 in the dataset
  ">3 and <=7": 1,             // "4-10" mapped to 1
  ">7 and <=14": 2,            // "11-30" mapped to 2
  ">14": 3,  // "greater than 30" mapped to 3
};

// If LOS is selected, include LOS filter
if (los !== null && los !== undefined) {
  const losValue = losMapping[los];
  if (losValue !== undefined) {
    matchStage.los = losValue;
  }
}


    // Build the aggregation pipeline
    const pipeline = [
      {
        // Convert diagnosis column to an array of strings if it's a string
        $set: {
          diagnosis: {
            $cond: {
              if: { $eq: [{ $type: "$diagnosis" }, "string"] },
              then: {
                $reduce: {
                  input: { $split: ["$diagnosis", ","] },
                  initialValue: [],
                  in: {
                    $concatArrays: [
                      "$$value",
                      [{ $trim: { input: "$$this" } }], // Trim spaces
                    ],
                  },
                },
              },
              else: [],
            },
          },
        },
      },
      { $match: matchStage }, // Apply the dynamic match stage based on diagnosis, mortality, and LOS
    ];

    // Add a facet for general statistics (will work with or without mortality filter)
    pipeline.push({
      $facet: {
        totalAdmissions: [{ $count: "count" }],
        totalDeceased: [{ $match: { hospital_expire_flag: 1 } }, { $count: "count" }],
        totalDischarged: [
          { $match: { discharge_location: { $ne: null } } },
          { $count: "count" },
        ],
        raceDistribution: [
          { $group: { _id: "$ethnicity", count: { $sum: 1 } } },
        ],
        insuranceDistribution: [
          { $group: { _id: "$insurance", count: { $sum: 1 } } },
        ],
        maritalStatusDistribution: [
          { $group: { _id: "$marital_status", count: { $sum: 1 } } },
        ],
        genderCount: [
          { $group: { _id: "$gender", count: { $sum: 1 } } },
        ],
        // ageDistribution: [
        //   {
        //     $bucket: {
        //       groupBy: "$age",
        //       boundaries: [0, 20, 40, 60, 80, 100],
        //       default: "80+",
        //       output: { count: { $sum: 1 } },
        //     },
        //   },
        // ],
        ageDistribution: [
          {
            $bucket: {
              groupBy: "$age",
              boundaries: [0, 20, 40, 60, 80, 100],
              default: "80+",
              output: { count: { $sum: 1 } },
            },
          },
        ],
        topDiagnoses: [
          { $unwind: "$diagnosis" },
          { $group: { _id: "$diagnosis", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 },
        ],
      },
    });

    // Execute the aggregation pipeline
    const analytics = await Admission.aggregate(pipeline);

    const result = analytics[0] || {};

    // Prepare response based on the calculated results
    const response = {
      totalAdmissions: result.totalAdmissions?.[0]?.count || 0,
      totalDeceased: result.totalDeceased?.[0]?.count || 0,
      totalDischarged: result.totalDischarged?.[0]?.count || 0,
      raceDistribution: result.raceDistribution || [],
      insuranceDistribution: result.insuranceDistribution || [],
      maritalStatusDistribution: result.maritalStatusDistribution || [],
      genderCount: result.genderCount || [],
      ageDistribution: result.ageDistribution || [],
      topDiagnoses: result.topDiagnoses || [],
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({ message: "Failed to fetch analytics." });
  }
});








// Endpoint to get distinct diagnoses
router.get("/diagnoses", async (req, res) => {
  const { search } = req.query; // Optional search term

  try {
    let query = {};
    if (search) {
      query.diagnosis = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    const diagnoses = await Admission.distinct("diagnosis", query); // Fetch distinct diagnoses

    // Split values by both comma and semicolon, remove `?` prefix, and deduplicate
    const allDiagnoses = diagnoses
      .filter(d => typeof d === "string" && d.trim() !== "") // Filter non-strings and empty strings
      .flatMap(d => 
        d.split(/[,;]+/) // Split by both comma and semicolon
         .map(diag => diag.trim().replace(/^\?/, "")) // Trim whitespace and remove `?` prefix
      )
      .filter(diag => diag !== ""); // Remove any empty strings after processing

    const uniqueDiagnoses = [...new Set(allDiagnoses)]; // Deduplicate diagnoses

    uniqueDiagnoses.sort((a, b) => a.localeCompare(b)); // Sort alphabetically

    res.status(200).json({ diagnoses: uniqueDiagnoses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch diagnoses" });
  }
});



// router.get("/diagnoses", async (req, res) => {
//   const { search } = req.query; // Optional search term

//   try {
//     let query = {};
//     if (search) {
//       query.diagnosis = { $regex: search, $options: "i" }; // Case-insensitive search
//     }

//     const diagnoses = await Admission.distinct("diagnosis", query); // Fetch distinct diagnoses
//     const filteredDiagnoses = diagnoses.filter(d => typeof d === "string" && d.trim() !== ""); // Filter non-strings and empty strings

//     filteredDiagnoses.sort((a, b) => a.localeCompare(b)); // Sort alphabetically

//     res.status(200).json({ diagnoses: filteredDiagnoses });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to fetch diagnoses" });
//   }
// });







module.exports = router;

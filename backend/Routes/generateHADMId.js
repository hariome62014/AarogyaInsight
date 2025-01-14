const express = require("express");
const router = express.Router();
const Admission = require("../schema/admissionSchema"); // Assuming you have an "Admission" schema

// Define the hospital abbreviation
const hospitalAbbreviation = "HADM";

router.get("/", async (req, res) => {
  //   try {
  //     const subject_id = req.query.subject_id;

  //     // Find the highest serial number for the specified patientId
  //     const highestAdmission = await Admission.findOne({ subject_id })
  //       .sort({ hadm_id: -1 })
  //       .select("hadm_id");

  //     let serialNumber = 1;

  //     if (highestAdmission && highestAdmission.hadm_id) {
  //       const latestSerial = parseInt(
  //         highestAdmission.hadm_id.split(hospitalAbbreviation)[1]
  //       );

  //       if (!isNaN(latestSerial)) {
  //         serialNumber = latestSerial + 100;
  //       }
  //     }

  //     const paddedSerialNumber = serialNumber.toString().padStart(4, "0");
  //     const hadm_id = `${hospitalAbbreviation}${paddedSerialNumber}`;

  //     res.json({ hadm_id });
  //   } catch (error) {
  //     console.error("Error generating HADMId:", error);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // });

  try {
    // Retrieve the highest hadm_id
    const highestAdmission = await Admission.findOne().sort({ hadm_id: -1 });
    const highest_hadm_id = highestAdmission ? highestAdmission.hadm_id : 0;

    // Generate a new hadm_id by adding 100
    const hadm_id = highest_hadm_id + 100;

    res.json({ hadm_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;

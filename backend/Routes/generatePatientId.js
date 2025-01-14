const express = require("express");
const router = express.Router();
const Patients = require("../schema/user");

// Define the hospital abbreviation
const hospitalAbbreviation = "ABC";

router.get("/", async (req, res) => {
  try {
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Find the highest patient ID in the database with the "Patient" role for the current year
    const highestPatient = await Patients.findOne({
      role: "Patient",
      subject_id: { $regex: `^${hospitalAbbreviation}${currentYear}` },
    })
      .sort({ subject_id: -1 })
      .select("subject_id");

    let serialNumber = 1;

    if (highestPatient && highestPatient.subject_id) {
      // Extract the serial number from the patient ID
      const latestSerial = parseInt(
        highestPatient.subject_id.split(currentYear)[1]
      );

      if (!isNaN(latestSerial)) {
        serialNumber = latestSerial + 1;
      }
    }

    console.log("serial number:", serialNumber);

    // Generate a patient ID with the desired format
    const paddedSerialNumber = serialNumber.toString().padStart(4, "0");

    console.log("padded serial number:", paddedSerialNumber);
    const subject_id = `${hospitalAbbreviation}${currentYear}${paddedSerialNumber}`;

    res.json({ subject_id });
  } catch (error) {
    console.error("Error generating patient ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

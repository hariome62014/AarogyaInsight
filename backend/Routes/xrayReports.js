const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const XRayReport = require('../schema/xraySchema'); // Import the schema

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/xray-reports/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

router.post("/", upload.array('images', 10), async (req, res) => {
  try {
    const { subjectId, hadmId } = req.body;
    const imageUrls = req.files.map(file => file.path);

    // Create XRayReport instances for each image
    const xrayReports = imageUrls.map(imageUrl => ({
      subject_Id: subjectId,
      hadm_Id: hadmId,
      image: imageUrl
    }));

    // Save all X-ray reports to the database
    await XRayReport.insertMany(xrayReports);

    res.status(200).json({ message: 'X-ray reports uploaded successfully' });
  } catch (error) {
    console.error("Error uploading X-ray reports:", error);
    res.status(500).json({ error: "An error occurred while uploading X-ray reports" });
  }
});

module.exports = router;

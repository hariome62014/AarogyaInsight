const express = require('express');
const mongoose = require('mongoose');
const Admission = require('../schema/admissionSchema'); // Import the Admission model
const router = express.Router();




router.get('analytics', async (req, res) => {
    console.log ( "call to hua")
  try {
    const totalAdmissions = await Admission.countDocuments({});
    const totalDischarged = await Admission.countDocuments({ dischtime: { $ne: null } });
    const totalDeceased = await Admission.countDocuments({ deathtime: { $ne: null } });

    const raceDistribution = await Admission.aggregate([
      { $group: { _id: '$race', count: { $sum: 1 } } }
    ]);

    const insuranceDistribution = await Admission.aggregate([
      { $group: { _id: '$insurance', count: { $sum: 1 } } }
    ]);

    console.log ( "yaha tak aa raha ")

    res.json({
      totalAdmissions,
      totalDischarged,
      totalDeceased,
      raceDistribution,
      insuranceDistribution,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


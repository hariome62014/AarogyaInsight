import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const ICUSTaysForm = () => {
  const [formData, setFormData] = useState({
    patientId: "", // Foreign key
    hospitalAdmissionId: "", // Foreign key
    stay_id: "", // Primary key
    firstcareunit: "",
    lastcareunit: "",
    intime: "",
    outtime: "",
    los: "",
    // Add more fields for the rest of the form data
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const icuStaysData = {
    ...formData,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the formData to the backend for further processing
    try {
      // Send the data to the backend using a POST request
      const response = await fetch("http://localhost:5000/api/icustays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(icuStaysData),
      });

      if (response.ok) {
        console.log("ICU Stays form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit ICU Stays form:", response);
      }
    } catch (error) {
      console.error("Error submitting ICU Stays form:", error);
    }
  };

  return (
    <form
      style={{
        margin: "30px",
        marginLeft: "10px",
        border: "2px solid blue",
        padding: "20px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        ICU Stays Form
      </Typography>
      <TextField
        label="Patient Id"
        name="patientId"
        value={formData.patientId}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Hospital Admission ID"
        name="hospitalAdmissionId"
        value={formData.hospitalAdmissionId}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Stay ID"
        name="stay_id"
        value={formData.stay_id}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="First Care Unit"
        name="firstcareunit"
        value={formData.firstcareunit}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Last Care Unit"
        name="lastcareunit"
        value={formData.lastcareunit}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="In Time"
        name="intime"
        value={formData.intime}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Out Time"
        name="outtime"
        value={formData.outtime}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Length of Stay (LOS)"
        name="los"
        value={formData.los}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      {/* Add more fields for the rest of the form data */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ICUSTaysForm;

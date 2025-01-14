import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const ProceduresICDForm = () => {
  const [formData, setFormData] = useState({
    patientId: "", // Foreign key
    hospitalAdmissionId: "", // Foreign key
    seq_number: "",
    chartdate: "",
    icd_code: "",
    icd_version: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const proceduresICDData = {
    ...formData,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the formData to the backend for further processing
    try {
      // Send the data to the backend using a POST request
      const response = await fetch("http://localhost:5000/api/procedures-icd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proceduresICDData),
      });

      if (response.ok) {
        console.log("Procedures ICD form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit Procedures ICD form:", response);
      }
    } catch (error) {
      console.error("Error submitting Procedures ICD form:", error);
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
        Procedures ICD Form
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
        label="Sequence Number"
        name="seq_number"
        value={formData.seq_number}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Chart Date"
        name="chartdate"
        value={formData.chartdate}
        type="date"
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="ICD Code"
        name="icd_code"
        value={formData.icd_code}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="ICD Version"
        name="icd_version"
        value={formData.icd_version}
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

export default ProceduresICDForm;

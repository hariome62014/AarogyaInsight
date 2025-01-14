import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const DiagnosesICDForm = () => {
  const [formData, setFormData] = useState({
    seq_no: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the formData to the backend for further processing
    try {
      // Send the data to the backend using a POST request
      const response = await fetch("http://localhost:5000/api/diagnoses_icd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("diagnoses_icd form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit diagnoses_icd form:", response);
      }
    } catch (error) {
      console.error("Error submitting diagnoses_icd form:", error);
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
        Diagnoses ICD Details
      </Typography>
      <TextField
        label="Sequence Number"
        name="seq_no"
        value={formData.seq_no}
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

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default DiagnosesICDForm;

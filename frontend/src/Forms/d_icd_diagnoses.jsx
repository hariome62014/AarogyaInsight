import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const ICDForm = () => {
  const [formData, setFormData] = useState({
    icdCode: "",
    icdVersion: "",
    longTitle: "",
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
      const response = await fetch(
        "http://localhost:5000/api/d_icd_diagnoses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("d_icd_diagnoses form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit d_icd_diagnoses form:", response);
      }
    } catch (error) {
      console.error("Error submitting d_icd_diagnoses form:", error);
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
        ICD Diagnoses Details
      </Typography>
      <TextField
        label="ICD Code"
        name="icdCode"
        value={formData.icdCode}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="ICD Version"
        name="icdVersion"
        value={formData.icdVersion}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Long Title"
        name="longTitle"
        value={formData.longTitle}
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

export default ICDForm;

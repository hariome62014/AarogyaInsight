import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const DRGCodesForm = () => {
  const [formData, setFormData] = useState({
    drg_type: "",
    drg_code: "",
    description: "",
    drg_severity: "",
    drg_mortality: "",
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
      const response = await fetch("http://localhost:5000/api/drgcodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("DRG Codes form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit DRG Codes form:", response);
      }
    } catch (error) {
      console.error("Error submitting DRG Codes form:", error);
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
        DRG Codes Details
      </Typography>
      <TextField
        label="DRG Type"
        name="drg_type"
        value={formData.drg_type}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="DRG Code"
        name="drg_code"
        value={formData.drg_code}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="DRG Severity"
        name="drg_severity"
        value={formData.drg_severity}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="DRG Mortality"
        name="drg_mortality"
        value={formData.drg_mortality}
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

export default DRGCodesForm;

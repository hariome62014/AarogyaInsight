import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const PatientsForm = () => {
  const [formData, setFormData] = useState({
    subject_id: "",
    gender: "",
    anchor_age: "",
    anchor_year: "",
    anchor_year_group: "",
    dod: "",
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
      const response = await fetch("http://localhost:5000/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("patients' form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit patients' form:", response);
      }
    } catch (error) {
      console.error("Error submitting patients' form:", error);
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
        PATIENTS DETAILS
      </Typography>
      <TextField
        label="SUBJECT ID"
        name="subject_id"
        value={formData.subject_id}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="GENDER"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="ANCHOR AGE"
        name="anchor_age"
        value={formData.anchor_age}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="ANCHOR_YEAR"
        name="anchor_year"
        value={formData.anchor_year}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="ANCHOR_YEAR GROUP"
        name="anchor_year_group"
        value={formData.anchor_year_group}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="DOD"
        name="dod"
        value={formData.dod}
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

export default DHCPsForm;

import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const CaregiversForm = () => {
  const [formData, setFormData] = useState({
    caregiver_id: "", // Primary key
    // Add more fields for the rest of the form data
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const caregiversData = {
    ...formData,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the formData to the backend for further processing
    try {
      // Send the data to the backend using a POST request
      const response = await fetch("http://localhost:5000/api/caregivers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(caregiversData),
      });

      if (response.ok) {
        console.log("Caregivers form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit Caregivers form:", response);
      }
    } catch (error) {
      console.error("Error submitting Caregivers form:", error);
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
        Caregivers Form
      </Typography>
      <TextField
        label="Caregivers ID"
        name="caregiver_id"
        value={formData.caregiver_id}
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

export default CaregiversForm;

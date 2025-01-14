import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const PoeDetailsForm = () => {
  const [formData, setFormData] = useState({
    poe_id: "", // Foreign key
    poe_seq: "", // Foreign key
    patientId: "", // Foreign key
    field_name: "",
    field_value: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const poeDetailsData = {
    ...formData,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the formData to the backend for further processing
    try {
      // Send the data to the backend using a POST request
      const response = await fetch("http://localhost:5000/api/poe-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(poeDetailsData),
      });

      if (response.ok) {
        console.log("POE Details form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit POE Details form:", response);
      }
    } catch (error) {
      console.error("Error submitting POE Details form:", error);
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
        POE Details Form
      </Typography>
      <TextField
        label="POE ID"
        name="poe_id"
        value={formData.poe_id}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="POE Sequence"
        name="poe_seq"
        value={formData.poe_seq}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
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
        label="Field Name"
        name="field_name"
        value={formData.field_name}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Field Value"
        name="field_value"
        value={formData.field_value}
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

export default PoeDetailsForm;

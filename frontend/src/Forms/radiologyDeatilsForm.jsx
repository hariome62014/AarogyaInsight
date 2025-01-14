import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RadiologyDetailsForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    note_id: "",
    subject_id: "",
    field_name: "",
    field_value: "",
    field_ordinal: "",
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

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("Authentication token not found. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/radiology_details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Radiology details form submitted successfully!");
        navigate("/dashboard"); // Replace with the appropriate route
      } else {
        console.error("Failed to submit radiology details form:", response);
      }
    } catch (error) {
      console.error("Error submitting radiology details form:", error);
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
        Radiology Details Form
      </Typography>
      <TextField
        label="Note ID"
        name="note_id"
        value={formData.note_id}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Patient ID"
        name="subject_id"
        value={formData.subject_id}
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
      <TextField
        label="Field Ordinal"
        name="field_ordinal"
        value={formData.field_ordinal}
        type="number"
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

export default RadiologyDetailsForm;

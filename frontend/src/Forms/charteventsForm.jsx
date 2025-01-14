import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const ChartEventsForm = () => {
  const [formData, setFormData] = useState({
    stay_id: "", // Primary key
    patientId: "", // Foreign key
    hospitalAdmissionId: "", // Foreign key
    caregiver_id: "", // Foreign key
    charttime: "",
    storetime: "",
    item_id: "",
    value: "",
    valuenum: "",
    valueuom: "",
    warning: "",
    // Add more fields for additional data
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const chartEventsData = {
    ...formData,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the formData to the backend for further processing
    try {
      // Send the data to the backend using a POST request
      const response = await fetch("http://localhost:5000/api/chartevents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chartEventsData),
      });

      if (response.ok) {
        console.log("Chart Events form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit Chart Events form:", response);
      }
    } catch (error) {
      console.error("Error submitting Chart Events form:", error);
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
        Chart Events Form
      </Typography>
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
        label="Patient ID"
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
        label="Caregiver ID"
        name="caregiver_id"
        value={formData.caregiver_id}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Chart Time"
        name="charttime"
        type="datetime-local"
        value={formData.charttime}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Store Time"
        name="storetime"
        type="datetime-local"
        value={formData.storetime}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Item ID"
        name="item_id"
        value={formData.item_id}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Value"
        name="value"
        value={formData.value}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Value Number"
        name="valuenum"
        type="number"
        value={formData.valuenum}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Value Unit of Measurement"
        name="valueuom"
        value={formData.valueuom}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Warning"
        name="warning"
        value={formData.warning}
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

export default ChartEventsForm;

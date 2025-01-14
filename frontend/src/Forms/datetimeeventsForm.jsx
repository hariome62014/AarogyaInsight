import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const DateTimeEventsForm = () => {
  const [formData, setFormData] = useState({
    patientId: "", // Foreign key
    hospitalAdmissionId: "", // Foreign key
    stay_id: "", // Foreign key
    caregiver_id: "", // Foreign key
    charttime: "",
    storetime: "",
    itemid: "",
    value: "",
    valueuom: "",
    warning: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const dateTimeEventsData = {
    ...formData,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the formData to the backend for further processing
    try {
      // Send the data to the backend using a POST request
      const response = await fetch("http://localhost:5000/api/datetimeevents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dateTimeEventsData),
      });

      if (response.ok) {
        console.log("DateTimeEvents form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit DateTimeEvents form:", response);
      }
    } catch (error) {
      console.error("Error submitting DateTimeEvents form:", error);
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
        DateTimeEvents Form
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
        value={formData.charttime}
        onChange={handleChange}
        type="datetime-local"
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Store Time"
        name="storetime"
        value={formData.storetime}
        onChange={handleChange}
        type="datetime-local"
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Item ID"
        name="itemid"
        value={formData.itemid}
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
        label="Value UOM"
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

export default DateTimeEventsForm;

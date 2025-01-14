import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const PharmacyForm = () => {
  const [formData, setFormData] = useState({
    patientId: "", // Foreign key
    hospitalAdmissionId: "", // Foreign key
    pharmacy_id: "", // Primary key
    poe_id: "",
    starttime: "",
    stoptime: "",
    medication: "",
    proc_type: "",
    status: "",
    entertime: "",
    verifiedtime: "",
    route: "",
    frequency: "",
    disp_shed: "",
    infusion_type: "",
    sliding_scale: "",
    lockout_interval: "",
    basal_rate: "",
    one_hr_max: "",
    doses_per_24_hr: "",
    duration: "",
    duration_interval: "",
    expiration_value: "",
    expiration_unit: "",
    expiration_date: "",
    dispensation: "",
    fill_quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const pharmacyData = {
    ...formData,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the formData to the backend for further processing
    try {
      // Send the data to the backend using a POST request
      const response = await fetch("http://localhost:5000/api/pharmacy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pharmacyData),
      });

      if (response.ok) {
        console.log("Pharmacy form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit Pharmacy form:", response);
      }
    } catch (error) {
      console.error("Error submitting Pharmacy form:", error);
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
        Pharmacy Form
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
        label="Pharmacy ID"
        name="pharmacy_id"
        value={formData.pharmacy_id}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="POE ID"
        name="poe_id"
        value={formData.poe_id}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      // ... (previous code)
      <TextField
        label="Start Time"
        name="starttime"
        value={formData.starttime}
        type="time" // You can adjust the input type as needed
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Stop Time"
        name="stoptime"
        value={formData.stoptime}
        type="time" // You can adjust the input type as needed
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Medication"
        name="medication"
        value={formData.medication}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Procedure Type"
        name="proc_type"
        value={formData.proc_type}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Enter Time"
        name="entertime"
        value={formData.entertime}
        type="time" // You can adjust the input type as needed
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Verified Time"
        name="verifiedtime"
        value={formData.verifiedtime}
        type="time" // You can adjust the input type as needed
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Route"
        name="route"
        value={formData.route}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Frequency"
        name="frequency"
        value={formData.frequency}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Dispensation Schedule"
        name="disp_shed"
        value={formData.disp_shed}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Infusion Type"
        name="infusion_type"
        value={formData.infusion_type}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Sliding Scale"
        name="sliding_scale"
        value={formData.sliding_scale}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Lockout Interval"
        name="lockout_interval"
        value={formData.lockout_interval}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Basal Rate"
        name="basal_rate"
        value={formData.basal_rate}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="One Hour Max"
        name="one_hr_max"
        value={formData.one_hr_max}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Doses Per 24 Hours"
        name="doses_per_24_hr"
        value={formData.doses_per_24_hr}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Duration"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Duration Interval"
        name="duration_interval"
        value={formData.duration_interval}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Expiration Value"
        name="expiration_value"
        value={formData.expiration_value}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Expiration Unit"
        name="expiration_unit"
        value={formData.expiration_unit}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Expiration Date"
        name="expiration_date"
        value={formData.expiration_date}
        type="date" // You can adjust the input type as needed
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Dispensation"
        name="dispensation"
        value={formData.dispensation}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Fill Quantity"
        name="fill_quantity"
        value={formData.fill_quantity}
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

export default PharmacyForm;

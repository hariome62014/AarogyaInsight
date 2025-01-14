import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const PrescriptionsForm = () => {
  const [formData, setFormData] = useState({
    patientId: "", // Foreign key
    hospitalAdmissionId: "", // Foreign key
    poe_id: "", // Foreign key
    poe_seq: "", // Foreign key
    order_provider_id: "",
    starttime: "",
    stoptime: "",
    drug_type: "",
    drug: "",
    formulary_drug_cd: "",
    gsn: "",
    ndc: "",
    prod_strength: "",
    form_rx: "",
    dose_val_rx: "",
    dose_unit_rx: "",
    form_val_disp: "",
    form_unit_disp: "",
    doses_per_24_hrs: "",
    route: "",
    // Add more fields for the rest of the form data
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const prescriptionsData = {
    ...formData,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the formData to the backend for further processing
    try {
      // Send the data to the backend using a POST request
      const response = await fetch("http://localhost:5000/api/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prescriptionsData),
      });

      if (response.ok) {
        console.log("Prescriptions form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit Prescriptions form:", response);
      }
    } catch (error) {
      console.error("Error submitting Prescriptions form:", error);
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
        Prescriptions Form
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
        label="Order Provider ID"
        name="order_provider_id"
        value={formData.order_provider_id}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Start Time"
        name="starttime"
        type="datetime-local"
        value={formData.starttime}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Stop Time"
        name="stoptime"
        type="datetime-local"
        value={formData.stoptime}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Drug Type"
        name="drug_type"
        value={formData.drug_type}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Drug"
        name="drug"
        value={formData.drug}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Formulary Drug Code"
        name="formulary_drug_cd"
        value={formData.formulary_drug_cd}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="GSN"
        name="gsn"
        value={formData.gsn}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="NDC"
        name="ndc"
        value={formData.ndc}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Product Strength"
        name="prod_strength"
        value={formData.prod_strength}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Form RX"
        name="form_rx"
        value={formData.form_rx}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Dose Value RX"
        name="dose_val_rx"
        value={formData.dose_val_rx}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Dose Unit RX"
        name="dose_unit_rx"
        value={formData.dose_unit_rx}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Form Value Disp"
        name="form_val_disp"
        value={formData.form_val_disp}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Form Unit Disp"
        name="form_unit_disp"
        value={formData.form_unit_disp}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Doses per 24 Hrs"
        name="doses_per_24_hrs"
        value={formData.doses_per_24_hrs}
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

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default PrescriptionsForm;

import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const PoeForm = () => {
  const [formData, setFormData] = useState({
    patientId: "", // Foreign key
    hospitalAdmissionId: "", // Foreign key
    poe_id: "", // Primary key
    poe_seq: "",
    ordertime: "",
    order_type: "",
    order_subtype: "",
    transaction_type: "",
    discontinue_of_poe_id: "",
    discontinued_by_poe_id: "",
    order_provider_id: "",
    order_status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const poeData = {
    ...formData,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the formData to the backend for further processing
    try {
      // Send the data to the backend using a POST request
      const response = await fetch("http://localhost:5000/api/poe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(poeData),
      });

      if (response.ok) {
        console.log("POE form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit POE form:", response);
      }
    } catch (error) {
      console.error("Error submitting POE form:", error);
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
        POE Form
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
        label="POE Seq"
        name="poe_seq"
        value={formData.poe_seq}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Order Time"
        name="ordertime"
        value={formData.ordertime}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Order Type"
        name="order_type"
        value={formData.order_type}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Order Subtype"
        name="order_subtype"
        value={formData.order_subtype}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Transaction Type"
        name="transaction_type"
        value={formData.transaction_type}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Discontinue of POE ID"
        name="discontinue_of_poe_id"
        value={formData.discontinue_of_poe_id}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Discontinued by POE ID"
        name="discontinued_by_poe_id"
        value={formData.discontinued_by_poe_id}
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
        label="Order Status"
        name="order_status"
        value={formData.order_status}
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

export default PoeForm;

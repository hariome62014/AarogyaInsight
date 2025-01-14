import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const IngredientEventsForm = () => {
  const [formData, setFormData] = useState({
    patientId: "", // Foreign key
    hospitalAdmissionId: "", // Foreign key
    stay_id: "", // Foreign key
    caregiver_id: "", // Foreign key
    starttime: "",
    endtime: "",
    storetime: "",
    itemid: "",
    amount: "",
    amountuom: "",
    rate: "",
    rateuom: "",
    orderid: "", // Primary key
    linkorderid: "",
    statusdescription: "",
    originalrate: "",
    originalamount: "",
    // Add more fields for additional data
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const ingredientEventsData = {
    ...formData,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the formData to the backend for further processing
    try {
      // Send the data to the backend using a POST request
      const response = await fetch(
        "http://localhost:5000/api/ingredientevents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ingredientEventsData),
        }
      );

      if (response.ok) {
        console.log("IngredientEvents form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit IngredientEvents form:", response);
      }
    } catch (error) {
      console.error("Error submitting IngredientEvents form:", error);
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
        IngredientEvents Form
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
      // ...
      <TextField
        label="Start Time"
        name="starttime"
        value={formData.starttime}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="End Time"
        name="endtime"
        value={formData.endtime}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Store Time"
        name="storetime"
        value={formData.storetime}
        onChange={handleChange}
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
        label="Amount"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Amount UOM"
        name="amountuom"
        value={formData.amountuom}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Rate"
        name="rate"
        value={formData.rate}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Rate UOM"
        name="rateuom"
        value={formData.rateuom}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Order ID"
        name="orderid"
        value={formData.orderid}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Link Order ID"
        name="linkorderid"
        value={formData.linkorderid}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Status Description"
        name="statusdescription"
        value={formData.statusdescription}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Original Rate"
        name="originalrate"
        value={formData.originalrate}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Original Amount"
        name="originalamount"
        value={formData.originalamount}
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

export default IngredientEventsForm;

import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const ProviderForm = () => {
  const [formData, setFormData] = useState({
    provider_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const providerData = {
    ...formData,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the formData to the backend for further processing
    try {
      // Send the data to the backend using a POST request
      const response = await fetch("http://localhost:5000/api/provider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(providerData),
      });

      if (response.ok) {
        console.log("Provider form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit Provider form:", response);
      }
    } catch (error) {
      console.error("Error submitting Provider form:", error);
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
        Provider Form
      </Typography>
      <TextField
        label="Provider ID"
        name="provider_id"
        value={formData.provider_id}
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

export default ProviderForm;

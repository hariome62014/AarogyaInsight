import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const DItemsForm = () => {
  const [formData, setFormData] = useState({
    itemid: "", // Primary key
    label: "",
    abbreviation: "",
    linksto: "",
    category: "",
    unitname: "",
    param_type: "",
    lownormalvalue: "",
    highnormalvalue: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const dItemsData = {
    ...formData,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the formData to the backend for further processing
    try {
      // Send the data to the backend using a POST request
      const response = await fetch("http://localhost:5000/api/d-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dItemsData),
      });

      if (response.ok) {
        console.log("D Items form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit D Items form:", response);
      }
    } catch (error) {
      console.error("Error submitting D Items form:", error);
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
        D Items Form
      </Typography>
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
        label="Label"
        name="label"
        value={formData.label}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Abbreviation"
        name="abbreviation"
        value={formData.abbreviation}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Links To"
        name="linksto"
        value={formData.linksto}
        onChange={handleChange}
        fullWidth
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Unit Name"
        name="unitname"
        value={formData.unitname}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Parameter Type"
        name="param_type"
        value={formData.param_type}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Low Normal Value"
        name="lownormalvalue"
        value={formData.lownormalvalue}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="High Normal Value"
        name="highnormalvalue"
        value={formData.highnormalvalue}
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

export default DItemsForm;

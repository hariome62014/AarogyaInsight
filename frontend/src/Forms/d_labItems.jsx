import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";

const LabItemsForm = () => {
  const [formData, setFormData] = useState({
    //itemid: "",
    label: "",
    fluid: "",
    category: "",
  });

  const [itemid, setItemId] = useState("");

  useEffect(() => {
    // Fetch itemId from the server
    const token = localStorage.getItem("jwtToken");

    fetch("http://localhost:5000/api/generate-item-id", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched itemId
        setItemId(data.itemid);

        // Also set it in the formData state
        setFormData((prevData) => ({
          ...prevData,
          itemid: data.itemid,
        }));
      });
  }, []); // Run this effect only once when the component mounts

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the formData to the backend for further processing
    try {
      // Send the data to the backend using a POST request
      const response = await fetch("http://localhost:5000/api/d_labItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("d_labItems form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit d_labItems form:", response);
      }
    } catch (error) {
      console.error("Error submitting d_labItems form:", error);
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
        Lab Items Details
      </Typography>
      <TextField
        label="Item ID"
        name="itemId"
        value={itemid}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
        disabled // Disable user input for the generated itemId
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
        label="Fluid"
        name="fluid"
        value={formData.fluid}
        onChange={handleChange}
        fullWidth
        required
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

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default LabItemsForm;

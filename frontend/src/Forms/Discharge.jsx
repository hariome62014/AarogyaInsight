import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DischargeForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subject_id: "",
    hadm_id: "",
    note_type: "",
    note_seq: "",
    charttime: "",
    storetime: "",
    text: "",
  });

  const [note_id, setNoteId] = useState("");

  useEffect(() => {
    // Fetch note_id from the server
    const token = localStorage.getItem("jwtToken");

    fetch("http://localhost:5000/api/generate-note-id", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch note_id");
        }
        return response.json();
      })
      .then((data) => {
        // Update the state with the fetched note_id
        setNoteId(data.note_id);

        // Also set it in the formData state
        setFormData((prevData) => ({
          ...prevData,
          note_id: data.note_id,
        }));
      })
      .catch((error) => {
        console.error("Error fetching note_id:", error);
        // Handle the error (e.g., display a message to the user)
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

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("Authentication token not found. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/discharge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Discharge form submitted successfully!");
        navigate("/dashboard"); // Replace with the appropriate route
      } else {
        console.error("Failed to submit discharge form:", response);
      }
    } catch (error) {
      console.error("Error submitting discharge form:", error);
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
        Discharge Form
      </Typography>
      <TextField
        label="Note ID"
        name="note_id"
        value={note_id} // Display the generated note_id
        fullWidth
        disabled // Disable user input for the generated note_id
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
        label="Hospital Admission ID"
        name="hadm_id"
        value={formData.hadm_id}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Note Type"
        name="note_type"
        value={formData.note_type}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Note Sequence"
        name="note_seq"
        value={formData.note_seq}
        type="number"
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Chart Time"
        name="charttime"
        value={formData.charttime}
        type="datetime-local"
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Store Time"
        name="storetime"
        value={formData.storetime}
        type="datetime-local"
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Text"
        name="text"
        value={formData.text}
        multiline
        rows={4}
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

export default DischargeForm;

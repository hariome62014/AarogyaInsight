import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const HCPSEventsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the selected patient's ID and hospital admission ID from the location state
  const selectedPatientId = location.state
    ? location.state.selectedPatientId
    : "";
  const selectedHospitalAdmissionId = location.state
    ? location.state.hospitalAdmissionId
    : "";

  const [formData, setFormData] = useState({
    patientId: selectedPatientId,
    hospitalAdmissionId: selectedHospitalAdmissionId,

    chartdate: "",
    hcps_cd: "",
    seq_num: "",
    short_description: "",
  });
  const [hospitalAdmissionId, setHospitalAdmissionId] = useState("");
  useEffect(() => {
    // Fetch HADMID from the server
    const token = localStorage.getItem("jwtToken");

    fetch(
      `http://localhost:5000/api/gen-hadm-id?patientId=${selectedPatientId}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched HADMID
        setHospitalAdmissionId(data.hospitalAdmissionId);

        // Also set it in the formData state
        setFormData((prevData) => ({
          ...prevData,
          hospitalAdmissionId: data.hospitalAdmissionId,
        }));
      });
  }, [selectedPatientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const hcpseventsData = {
    ...formData,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the formData to the backend for further processing
    try {
      // Send the data to the backend using a POST request
      const response = await fetch("http://localhost:5000/api/hcpsevents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hcpseventsData),
      });

      if (response.ok) {
        console.log("HCPSEvents form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit HCPSEvents form:", response);
      }
    } catch (error) {
      console.error("Error submitting HCPSEvents form:", error);
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
        HCPSEvents Form
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
        fullWidth
        disabled // Prevent manual editing
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Chart Date"
        name="chartdate"
        value={formData.chartdate}
        type="date"
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="HCPS Code"
        name="hcps_cd"
        value={formData.hcps_cd}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Sequence Number"
        name="seq_num"
        value={formData.seq_num}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Short Description"
        name="short_description"
        value={formData.short_description}
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

export default HCPSEventsForm;

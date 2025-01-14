import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const EMARForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the selected patient's ID from the location state
  const selectedPatientId = location.state
    ? location.state.selectedPatientId
    : "";
  const [formData, setFormData] = useState({
    patientId: selectedPatientId,
    emar_id: "",
    emar_seq: "",
    poe_id: "",
    pharmacy_id: "",
    enter_provider_id: "",
    chart_time: "",
    medication: "",
    event_txt: "",
    schedule_time: "",
    store_time: "",
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
  const emarData = {
    ...formData,
    hospitalAdmissionId, // Include the HADMID in the data
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the formData to the backend for further processing
    try {
      // Send the data to the backend using a POST request
      const response = await fetch("http://localhost:5000/api/emar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emarData),
      });

      if (response.ok) {
        console.log("EMAR form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit EMAR form:", response);
      }
    } catch (error) {
      console.error("Error submitting EMAR form:", error);
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
        EMAR Details
      </Typography>
      <TextField
        label="Patient ID"
        name="patientId"
        value={formData.patientId}
        fullWidth
        readOnly
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Hospital Admission ID"
        name="hospitalAdmissionId"
        value={hospitalAdmissionId}
        fullWidth
        readOnly
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="EMAR ID"
        name="emar_id"
        value={formData.emar_id}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="EMAR Sequence"
        name="emar_seq"
        value={formData.emar_seq}
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
        label="Pharmacy ID"
        name="pharmacy_id"
        value={formData.pharmacy_id}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Enter Provider ID"
        name="enter_provider_id"
        value={formData.enter_provider_id}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Chart Time"
        name="chart_time"
        value={formData.chart_time}
        type="time"
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
        label="Event Text"
        name="event_txt"
        value={formData.event_txt}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Schedule Time"
        name="schedule_time"
        value={formData.schedule_time}
        type="time"
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Store Time"
        name="store_time"
        value={formData.store_time}
        onChange={handleChange}
        type="time"
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

export default EMARForm;

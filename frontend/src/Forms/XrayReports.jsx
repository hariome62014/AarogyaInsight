import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const XRayReportForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedSubject_id = location.state
    ? location.state.selectedSubject_id
    : "";

  const [formData, setFormData] = useState({
    subjectId: selectedSubject_id,
    hadmId: "",
    images: [], // Change to an array to store multiple images
  });

  useEffect(() => {
    // Fetch HADMID from the server
    const token = localStorage.getItem("jwtToken");

    fetch(
      `http://localhost:5000/api/generate-hadm-id?patientId=${selectedSubject_id}`,
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
        setFormData((prevData) => ({
          ...prevData,
          hadmId: data.hadm_id,
        }));
      });
  }, [selectedSubject_id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'images' ? files : value, // Allow multiple files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataForSubmission = new FormData();
    formDataForSubmission.append('subjectId', formData.subjectId);
    formDataForSubmission.append('hadmId', formData.hadmId);
    // Append each image file
    for (let i = 0; i < formData.images.length; i++) {
      formDataForSubmission.append('images', formData.images[i]);
    }

    try {
      const response = await fetch('http://localhost:5000/api/upload-xray-reports', {
        method: 'POST',
        body: formDataForSubmission,
      });

      if (response.ok) {
        console.log('X-ray reports uploaded successfully!');
        navigate("/health-staff-dashboard");
      } else {
        console.error('Failed to upload X-ray reports:', response);
      }
    } catch (error) {
      console.error('Error uploading X-ray reports:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Subject ID"
        name="subjectId"
        value={formData.subjectId}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="HADM ID"
        name="hadmId"
        value={formData.hadmId}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <input type="file" name="images" onChange={handleChange} multiple /> {/* Allow multiple file selection */}
      <Button type="submit" variant="contained" color="primary">
        Upload X-ray Reports
      </Button>
    </form>
  );
};

export default XRayReportForm;

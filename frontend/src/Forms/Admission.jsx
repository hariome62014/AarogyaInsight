// import React, { useEffect, useState } from "react";
// import { TextField, Button, Typography } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";

// const AdmissionForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const selectedSubject_id = location.state
//     ? location.state.selectedSubject_id
//     : "";

//   const [formData, setFormData] = useState({
//     subject_id: selectedSubject_id,
//     //hadm_id: "",
//     admittime: "",
//     dischtime: "",
//     deathtime: "",
//     admission_type: "",
//     admission_provider_id: "",
//     admission_location: "",
//     discharge_location: "",
//     insurance: "",
//     language: "",
//     martial_status: "",
//     race: "",
//     edregtime: "",
//     edouttime: "",
//     hospital_expire_flag: "",
//   });

//   const [hadm_id, sethadm_id] = useState("");

//   useEffect(() => {
//     // Fetch HADMID from the server
//     const token = localStorage.getItem("jwtToken");

//     fetch(
//       `http://localhost:5000/api/generate-hadm-id?patientId=${selectedSubject_id}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: token,
//         },
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         // Update the state with the fetched HADMID
//         sethadm_id(data.hadm_id);

//         // Also set it in the formData state
//         setFormData((prevData) => ({
//           ...prevData,
//           hadm_id: data.hadm_id,
//         }));
//       });
//   }, [selectedSubject_id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("jwtToken");
//     if (!token) {
//       console.error("Authentication token not found. Please log in.");
//       return;
//     }
//     const admissionData = {
//       ...formData,
//       hadm_id, // Include the HADMID in the data
//     };

//     try {
//       const response = await fetch("http://localhost:5000/api/admission", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//         body: JSON.stringify(admissionData),
//       });

//       if (response.ok) {
//         console.log("Admission form submitted successfully!");
//         navigate("/health-staff-dashboard");
//       } else {
//         console.error("Failed to submit admission form:", response);
//       }
//     } catch (error) {
//       console.error("Error submitting admission form:", error);
//     }
//   };

//   return (
//     <form
//       style={{
//         margin: "auto",
//         padding: "20px",
//         background: "#ffffff",
//         borderRadius: "8px",
//         boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
//         maxWidth: "500px",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <Typography variant="h5" gutterBottom>
//         Admission Details
//       </Typography>
//       <TextField
//         label="Subject Id"
//         name="subject_id"
//         value={formData.subject_id}
//         onChange={handleChange}
//         fullWidth
//         required
//         style={{ marginBottom: "10px" }}
//       />
//       <TextField
//         label="Hospital Admission ID"
//         name="hadm_id"
//         value={formData.hadm_id}
//         onChange={handleChange}
//         fullWidth
//         style={{ marginBottom: "15px" }}
//       />

//       {/* Add other fields as needed */}
//       <TextField
//         label="Admission Time"
//         name="admittime"
//         value={formData.admittime}
//         type="time"
//         onChange={handleChange}
//         fullWidth
//         required
//         style={{ marginBottom: "10px" }}
//       />
//       <TextField
//         label="Discharge Time"
//         name="dischtime"
//         value={formData.dischtime}
//         type="time"
//         onChange={handleChange}
//         fullWidth
//         required
//         style={{ marginBottom: "10px" }}
//       />
//       <TextField
//         label="Death Time"
//         name="deathtime"
//         value={formData.deathtime}
//         type="time"
//         onChange={handleChange}
//         fullWidth
//         required
//         style={{ marginBottom: "10px" }}
//       />
//       <TextField
//         label="Admission Type"
//         name="admission_type"
//         value={formData.admission_type}
//         onChange={handleChange}
//         fullWidth
//         required
//         style={{ marginBottom: "10px" }}
//       />
//       <TextField
//         label="Admission Provider ID"
//         name="admission_provider_id"
//         value={formData.admission_provider_id}
//         onChange={handleChange}
//         fullWidth
//         required
//         style={{ marginBottom: "10px" }}
//       />
//       <TextField
//         label="Admission Location"
//         name="admission_location"
//         value={formData.admission_location}
//         onChange={handleChange}
//         fullWidth
//         required
//         style={{ marginBottom: "10px" }}
//       />
//       <TextField
//         label="Discharge Location"
//         name="discharge_location"
//         value={formData.discharge_location}
//         onChange={handleChange}
//         fullWidth
//         required
//         style={{ marginBottom: "10px" }}
//       />
//       <TextField
//         label="Insurance"
//         name="insurance"
//         value={formData.insurance}
//         onChange={handleChange}
//         fullWidth
//         required
//         style={{ marginBottom: "10px" }}
//       />
//       <TextField
//         label="Language"
//         name="language"
//         value={formData.language}
//         onChange={handleChange}
//         fullWidth
//         required
//         style={{ marginBottom: "10px" }}
//       />
//       <TextField
//         label="Martial Status"
//         name="martial_status"
//         value={formData.martial_status}
//         onChange={handleChange}
//         fullWidth
//         required
//         style={{ marginBottom: "10px" }}
//       />
//       <TextField
//         label="Race"
//         name="race"
//         value={formData.race}
//         onChange={handleChange}
//         fullWidth
//         required
//         style={{ marginBottom: "10px" }}
//       />
//       <TextField
//         label="Ed Register Time"
//         name="edregtime"
//         value={formData.edregtime}
//         type="time"
//         onChange={handleChange}
//         fullWidth
//         required
//         style={{ marginBottom: "10px" }}
//       />
//       <TextField
//         label="Ed Out Time"
//         name="edouttime"
//         value={formData.edouttime}
//         type="time"
//         onChange={handleChange}
//         fullWidth
//         required
//         style={{ marginBottom: "10px" }}
//       />

//       <TextField
//         label="Hospital Expire Flag"
//         name="hospital_expire_flag"
//         value={formData.hospital_expire_flag}
//         onChange={handleChange}
//         fullWidth
//         required
//         style={{ marginBottom: "10px" }}
//       />

//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <Button variant="contained" color="primary" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default AdmissionForm;

import React, { useEffect, useState } from "react";
import { TextField, LabeledTextfield, Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const AdmissionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedSubject_id = location.state
    ? location.state.selectedSubject_id
    : "";

  const [formData, setFormData] = useState({
    subject_id: selectedSubject_id,
    admittime: "",
    dischtime: "",
    deathtime: "",
    admission_type: "",
    admission_provider_id: "",
    admission_location: "",
    discharge_location: "",
    insurance: "",
    language: "",
    martial_status: "",
    race: "",
    edregtime: "",
    edouttime: "",
    hospital_expire_flag: "",
  });

  const [hadm_id, sethadm_id] = useState("");

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
        sethadm_id(data.hadm_id);

        // Also set it in the formData state
        setFormData((prevData) => ({
          ...prevData,
          hadm_id: data.hadm_id,
        }));
      });
  }, [selectedSubject_id]);

  const formStyle = {
    margin: "auto",
    padding: "20px",
    background: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const textFieldStyle = {
    marginBottom: "15px",
  };

  const preFilledTextFieldStyle = {
    marginBottom: "15px",
    padding: "10px",
  };

  const buttonStyle = {
    marginTop: "15px",
  };

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
    const admissionData = {
      ...formData,
      hadm_id, // Include the HADMID in the data
    };

    try {
      const response = await fetch("http://localhost:5000/api/admission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(admissionData),
      });

      if (response.ok) {
        console.log("Admission form submitted successfully!");
        navigate("/health-staff-dashboard");
      } else {
        console.error("Failed to submit admission form:", response);
      }
    } catch (error) {
      console.error("Error submitting admission form:", error);
    }
  };

  return (
    <form style={formStyle}>
      <Typography variant="h5" gutterBottom>
        Admission Details
      </Typography>
      <TextField
        label="Subject Id"
        name="subject_id"
        value={formData.subject_id}
        onChange={handleChange}
        fullWidth
        required
        style={preFilledTextFieldStyle}
        InputProps={{ readOnly: true }}
        variant="filled"
      />
      <TextField
        label="Hospital Admission ID"
        name="hadm_id"
        value={formData.hadm_id}
        onChange={handleChange}
        fullWidth
        style={preFilledTextFieldStyle}
        InputProps={{ readOnly: true }}
        variant="filled"
        InputLabelProps={{
          shrink: true,
        }}
      />
      {/* ... (rest of your text fields) */}
      <TextField
        label="Admission Time"
        name="admittime"
        value={formData.admittime}
        type="time"
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Discharge Time"
        name="dischtime"
        value={formData.dischtime}
        type="time"
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Death Time"
        name="deathtime"
        value={formData.deathtime}
        type="time"
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Admission Type"
        name="admission_type"
        value={formData.admission_type}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Admission Provider ID"
        name="admission_provider_id"
        value={formData.admission_provider_id}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Admission Location"
        name="admission_location"
        value={formData.admission_location}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Discharge Location"
        name="discharge_location"
        value={formData.discharge_location}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Insurance"
        name="insurance"
        value={formData.insurance}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Language"
        name="language"
        value={formData.language}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Martial Status"
        name="martial_status"
        value={formData.martial_status}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Race"
        name="race"
        value={formData.race}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Ed Register Time"
        name="edregtime"
        value={formData.edregtime}
        type="time"
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Ed Out Time"
        name="edouttime"
        value={formData.edouttime}
        type="time"
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        label="Hospital Expire Flag"
        name="hospital_expire_flag"
        value={formData.hospital_expire_flag}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={buttonStyle}
      >
        Submit
      </Button>
    </form>
  );
};

export default AdmissionForm;

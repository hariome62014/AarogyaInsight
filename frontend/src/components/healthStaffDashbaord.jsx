import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AnalyticsDashboard from "./analytics";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Modal,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavBar from "../adminDashboard/NavBar";
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const HealthStaffDashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [report, setReport] = useState(null);
  const [chartData1, setChartData1] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  });
  const [chartData2, setChartData2] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  });
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  });
  const [idx, setIdx] = useState(null);
  

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/");
  };
  const handleCloseModal = () => {
    setSelectedPatient(null);
  };
  useEffect(() => {
    // Fetch list of patients from the server
    const token = localStorage.getItem("jwtToken");

    fetch("http://localhost:5000/api/dashboard/health-staff/patients", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPatients(data);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };
 
  // const handleOpenModal = () => setOpenModal(true);
  // const handleCloseModal = () => setOpenModal(false);
  const handleGenerateReport = (index) => {
    console.log(index)
    fetch("http://localhost:8000/predict_los/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "csv_file": "divide_in_col_train.csv",
        "index": index
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const values = Object.values(data);
        // const classes = values[0].map((_, index) => {
        //   return `Class ${index + 1}`;
        
        const classes=['Less than 3 days','3 to 7 days','7 to 15 days','Greater than 15 days']
      // });
        // Generate a dynamic list of colors for the chart
        const backgroundColor = values[0].map((_, index) => {
          const hue = (index * 360) / values[0].length;
          return `hsl(${hue}, 100%, 50%)`;
        });

        setChartData1({
          labels: classes,
          datasets: [{
            data: values[0],
            backgroundColor: backgroundColor
          }]
        });
      })
      .catch((error) => {
        console.error("Error generating report:", error);
      });

    fetch("http://localhost:8000/predict_mp/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "csv_file": "mp_test.csv",
        "index": index
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const values = Object.values(data);
        // const classes = values[0].map((_, index) => {
        //   return `Class ${index + 1}`;
        const classes=['Dead','Alive']
        // });

        // Generate a dynamic list of colors for the chart
        const backgroundColor = values[0].map((_, index) => {
          const hue = (index * 360) / values[0].length;
          return `hsl(${hue}, 100%, 50%)`;
        });

        setChartData2({
          labels: classes,
          datasets: [{
            data: values[0],
            backgroundColor: backgroundColor
          }]
        });
      })
      .catch((error) => {
        console.error("Error generating report:", error);
      });
    fetch("http://localhost:8002/predict/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "index": index
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const values = Object.values(data);
        const classes = values[0].map((_, index) => {
          return `Class ${index + 1}`;
        });

        // Generate a dynamic list of colors for the chart
        const backgroundColor = values[0].map((_, index) => {
          const hue = (index * 360) / values[0].length;
          return `hsl(${hue}, 100%, 50%)`;
        });

        setBarData({
          labels: classes,
          datasets: [{
            data: values[0],
            backgroundColor: backgroundColor
          }]
        });
      })
      .catch((error) => {
        console.error("Error generating report:", error);
      });
  }; //file output
  
  const styles = {
    patientCard: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "10px",
      marginBottom: "10px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    selectedPatient: {
      backgroundColor: "#f0f8ff", // Light blue background for selected patient
    },
    formButton: {
      margin: "5px",
    },
  };

  const forms = [
    { name: "Admission Form", link: "/admission" },
    { name: "EMAR Form", link: "/emar" },
    { name: "DRG Codes Form", link: "/drgcodes" },
    { name: "Lab Events Form", link: "/lab-events" },
    { name: "Microevents Form", link: "/microevents" },
    { name: "OMR Form", link: "/omr" },
    { name: "Pharmacy Form", link: "/pharmacy" },
    { name: "POE Form", link: "/poe" },
    { name: "POE Details Form", link: "/poe-details" },
    { name: "Prescriptions Form", link: "/prescriptions" },
    { name: "Procedures ICD Form", link: "/procedures-icd" },
    { name: "Provider Form", link: "/provider" },
    { name: "Services Form", link: "/services" },
    { name: "Transfers Form", link: "/transfers" },
    { name: "Caregivers Form", link: "/caregivers" },
    { name: "Chart Events Form", link: "/chart-events" },
    { name: "D_Items Form", link: "/d-items" },
    { name: "DateTimeEvents Form", link: "/datetimeevents" },
    { name: "ICUSTays Form", link: "/icustays" },
    { name: "Ingredient Events Form", link: "/ingredientevents" },
    { name: "Input Events Form", link: "/inputevents" },
    { name: "Output Events Form", link: "/outputevents" },
    { name: "Procedure Events Form", link: "/procedureevents" },
    { name: "HCPS Events Form", link: "/hcps-events" },
    { name: "LAB ITEMS FORM", link: "/d_labItems" },
    { name: "XRAY REPORT FORM", link: "/xray" },

    // Add more forms as needed
  ];
  // const generateFormLinks = () => {
  //   return forms.map((form, index) => (
  //     <Grid item xs={4} key={index}>
  //       <Link
  //         to={form.link}
  //         state={{ selectedSubject_id: selectedPatient.subject_id }}
  //       >
  //         <Button variant="contained" color="primary" fullWidth>
  //           {form.name}
  //         </Button>
  //       </Link>
  //     </Grid>
  //   ));
  // };

  const handle_patient = ()=>{
    navigate("../patient-list");
  }

  return (
    // <div>
    //   <div>
    //     <AnalyticsDashboard></AnalyticsDashboard>
    //   </div>
    //   <Box
    //     display="flex"
    //     justifyContent="space-between"
    //     alignItems="center"
    //     style={{ marginBottom: "20px" }}
    //   >
    //     <NavBar> Health Staff DAshboard</NavBar>
    //     {/* <Button variant="contained" color="primary" onClick={handleGenerateReport}>
    //       Generate Report
    //     </Button> */}
        
    //     {/* <Typography variant="h4">Health Staff Dashboard</Typography> */}
    //   </Box>

    //   <Grid container spacing={2}>
    //     <Grid item xs={12} md={6} lg={4}>
    //       <TextField
    //         label="Search Patients"
    //         variant="outlined"
    //         value={searchTerm}
    //         onChange={handleSearch}
    //         fullWidth
    //         margin="normal"
    //       />
    //       {/* <Button variant="contained" color="primary" onClick={handleGenerateReport}>
    //       Generate Report
    //       </Button> */}
    //       {/* <Button variant="contained" color="primary" onClick={handleGenerateReport}>
    //         Generate LOS
    //       </Button>
    //       <Button variant="contained" color="primary" onClick={handleGenerateReport}>
    //         Generate MP
    //       </Button> */}
    //     </Grid>
    //     <Grid>
    //     </Grid>
    //   </Grid>
    //   <TableContainer component={Paper} sx={{ margin: "20px 0" }}>
    //     <Table>
    //       <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
    //         <TableRow>
    //           <TableCell align="center">Subject Id</TableCell>
    //           <TableCell align="center">First Name</TableCell>
    //           <TableCell align="center">Last Name</TableCell>
    //           <TableCell align="center">Gender</TableCell>
    //           <TableCell align="center">Date of Birth</TableCell>
    //           <TableCell align="center">Contact Number</TableCell>
    //         </TableRow>
    //       </TableHead>

    //       <TableBody>
    //         {patients
    //           .filter(
    //             (patient) =>
    //               patient.firstName
    //                 .toLowerCase()
    //                 .includes(searchTerm.toLowerCase()) ||
    //               patient.lastName
    //                 .toLowerCase()
    //                 .includes(searchTerm.toLowerCase()) ||
    //               patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    //           )
    //           .map((patient, index) => (
    //             <TableRow
    //               key={patient.subject_id}
    //               onClick={() => {
    //                 handlePatientSelect(patient);
    //                 setIdx(index)
    //               }}
    //               sx={{
    //                 cursor: "pointer",
    //                 ...styles.patientCard,
    //                 ...(selectedPatient === patient
    //                   ? styles.selectedPatient
    //                   : {}),
    //                 "&:hover": {
    //                   backgroundColor: "#f0f8ff", // Light blue on hover
    //                 },
    //                 backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
    //               }}
    //             >
    //               <TableCell align="center">{patient.subject_id}</TableCell>
    //               <TableCell align="center">{patient.firstName}</TableCell>
    //               <TableCell align="center">{patient.lastName}</TableCell>
    //               <TableCell align="center">{patient.gender}</TableCell>
    //               <TableCell align="center">{patient.dob}</TableCell>
    //               <TableCell align="center">{patient.contactNumber}</TableCell>
    //             </TableRow>
    //           ))}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
      
    //   <div style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
    //     <div style={{ height: '300px', width: '300px' }}>
    //       <Pie data={chartData1} />
    //     </div>
    //     <div style={{ height: '300px', width: '300px' }}>
    //       <Pie data={chartData2} />
    //     </div>
    //     <div style={{ height: '600px', width: '600px' }}>
    //     {/* <Bar data= {barData}/> */}
    //         {idx !== null && <Bar data= {barData}/>}
          
    //     </div>
    //   </div>

    //   {selectedPatient && (
    //     <Paper elevation={3}>
    //       <Modal open={Boolean(selectedPatient)} onClose={handleCloseModal}>
    //         <Box
    //           sx={{
    //             position: "absolute",
    //             top: "50%",
    //             left: "50%",
    //             transform: "translate(-50%, -50%)",
    //             width: 400,
    //             bgcolor: "background.paper",
    //             border: "2px solid #000",
    //             boxShadow: 24,
    //             p: 4,
    //             maxWidth: "90%",
    //             overflow: "auto", // Enable scrolling
    //             maxHeight: "80vh", // Set maximum height for responsiveness
    //           }}
    //         >
    //           <Card elevation={3} sx={{ margin: "20px 0", padding: "16px" }}>
    //             <CardContent>
    //               <Typography
    //                 variant="h4"
    //                 sx={{
    //                   marginBottom: "16px",
    //                   fontFamily: "Verdana, sans-serif",
    //                   color: "#2C3E50",
    //                   textShadow: "1px 1px 2px #888888",
    //                   backgroundColor: "#ECF0F1",
    //                   padding: "8px",
    //                   borderRadius: "4px",
    //                 }}
    //               >
    //                 Selected Patient: {selectedPatient.subject_id}
    //               </Typography>
    //             </CardContent>
    //           </Card>
    //           <Card>
    //             <Button onClick={() => {
    //               handleGenerateReport(idx);
    //               handleCloseModal();
    //             }}>Generate Report</Button>
    //           </Card>
    //           <Accordion>
    //             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    //               <Typography
    //                 variant="h5"
    //                 sx={{
    //                   marginBottom: "0px",
    //                   fontFamily: "Verdana, sans-serif",
    //                   color: "#2C3E50",
    //                   textShadow: "1px 1px 2px #888888",
    //                   backgroundColor: "#ECF0F1",
    //                   padding: "2px",
    //                   borderRadius: "2px",
    //                 }}
    //               >
    //                 Forms:
    //               </Typography>
    //               {/* <Grid>{generateFormLinks(forms)}</Grid> */}
    //             </AccordionSummary>
    //             <AccordionDetails>
    //               <Table>
    //                 <TableHead>
    //                   <TableRow>
    //                     <TableCell>Form Name</TableCell>
    //                     <TableCell>Action</TableCell>
    //                   </TableRow>
    //                 </TableHead>
    //                 <TableBody>
    //                   {/* Map over the forms and render each row */}
    //                   {forms.map((form, index) => (
    //                     <TableRow key={index}>
    //                       <TableCell>{form.name}</TableCell>
    //                       <TableCell>
    //                         <Link
    //                           to={form.link}
    //                           state={{
    //                             selectedSubject_id: selectedPatient.subject_id,
    //                           }}
    //                           onClick={handleCloseModal}
    //                         >
    //                           <Button variant="contained" color="primary">
    //                             View Form
    //                           </Button>
    //                         </Link>
    //                       </TableCell>
    //                     </TableRow>
    //                   ))}
    //                 </TableBody>
    //               </Table>
    //             </AccordionDetails>
    //           </Accordion>
    //         </Box>
    //       </Modal>
    //       <Button variant="contained" color="primary" onClick={handleLogout}>
    //         Logout
    //       </Button>
          
    //        {/* Render the PredictionReport component */}
    
    //     </Paper>
    //   )}
    // </div>    
    <div>
      <AnalyticsDashboard/>
      <Button className="" onClick={handle_patient}>See Patient List</Button>
    </div>
  );
};

export default HealthStaffDashboard;

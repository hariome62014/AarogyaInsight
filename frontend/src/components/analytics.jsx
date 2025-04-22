

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Pie, Bar } from "react-chartjs-2";
// import "chart.js/auto";
// import toast, { Toaster } from "react-hot-toast";
// import {
//   Autocomplete,
//   TextField,
//   CircularProgress,
//   Box,
//   Container,
//   Grid,
//   Paper,
//   Typography,
//   Button,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import { CiFilter } from "react-icons/ci";
// import { styled } from "@mui/system";
// import { useSelector, useDispatch } from "react-redux";
// import { setSelectedDiagnoses } from "../slices/diagnosesSlice";
// import { setSelectedMortality } from "../slices/mortalitySlices";
// import { setSelectedLOS } from "../slices/losSlice";

// // Custom styled components
// const BackgroundBox = styled(Box)(({ theme }) => ({
//   minHeight: "100vh",
//   padding: theme.spacing(4),
//   [theme.breakpoints.down('sm')]: {
//     padding: theme.spacing(2),
//   },
// }));

// const Card = styled(Paper)(({ theme, bordercolor }) => ({
//   padding: theme.spacing(3),
//   borderLeft: `4px solid ${bordercolor}`,
//   borderRadius: "12px",
//   boxShadow: `0 4px 20px rgba(0, 0, 0, 0.1)`,
//   textAlign: "center",
//   height: "100%",
//   background: "#ffffff",
//   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   "&:hover": {
//     boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
//     transform: "translateY(-5px)",
//   },
// }));

// const AnalyticsPage = () => {
//   const [diagnoses, setDiagnoses] = useState([]);
//   const [diagnosisOptions, setDiagnosisOptions] = useState([]);
//   const dispatch = useDispatch();
//   const [loadingDiagnoses, setLoadingDiagnoses] = useState(false);
//   const [analytics, setAnalytics] = useState({
//     totalAdmissions: 0,
//     totalDischarged: 0,
//     totalDeceased: 0,
//     raceDistribution: [],
//     insuranceDistribution: [],
//     genderCount: [],
//     ageDistribution: [],
//     topDiagnoses: [],
//     maritalStatusDistribution: [],
//   });

//   const [filterAnchor, setFilterAnchor] = useState(null);
//   const [options, setOptions] = useState([]);
//   const [activeFilter, setActiveFilter] = useState(null);
//   const [filtersVisible, setFiltersVisible] = useState(false);
//   const selectedDiagnoses = useSelector((state) => state.diagnoses.selectedDiagnoses);
//   const selectedMortality = useSelector((state) => state.mortality.selectedMortality);
//   const selectedLOS = useSelector((state) => state.los.selectedLOS);

//   const createChartData = (data, colors, sliceSize = 5, sortAscending = false, label) => {
//     if (!data || !Array.isArray(data)) return { labels: [], datasets: [{ data: [], backgroundColor: [] }] };

//     const validData = data.filter(item => item && item.count !== undefined && item._id !== undefined);
//     const sortedData = validData.sort((a, b) => sortAscending ? a._id - b._id : b.count - a.count);
//     const topData = sortedData.slice(0, sliceSize);
//     const uniqueColors = topData.map((_, index) => colors[index % colors.length]);

//     return {
//       labels: topData.map((item) => item._id),
//       datasets: [{ data: topData.map((item) => item.count), backgroundColor: uniqueColors, label: label }],
//     };
//   };

//   useEffect(() => {
//     const fetchDiagnoses = async () => {
//       setLoadingDiagnoses(true);
//       try {
//         const response = await axios.get("http://localhost:5000/api/dashboard/health-staff/diagnoses");
//         const fetchedDiagnoses = response.data.diagnoses || [];
//         setDiagnoses(fetchedDiagnoses);
//         setDiagnosisOptions(fetchedDiagnoses);
//       } catch (error) {
//         toast.error("Failed to fetch diagnoses.");
//       } finally {
//         setLoadingDiagnoses(false);
//       }
//     };

//     fetchDiagnoses();
//   }, []);

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const response = await axios.post("http://localhost:5000/api/dashboard/health-staff/analytics", {
//           diagnoses: selectedDiagnoses.length > 0 ? selectedDiagnoses : null,
//           mortality: selectedMortality || null,
//           los: selectedLOS || null,
//         });
//         setAnalytics(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch analytics data.");
//       }
//     };

//     fetchAnalytics();
//   }, [selectedDiagnoses, selectedMortality, selectedLOS]);

//   const handleFilterClose = () => {
//     setFilterAnchor(null);
//   };

//   const handleFilterClick = () => {
//     setFiltersVisible(!filtersVisible);
//     if (filtersVisible) {
//       setActiveFilter(null);
//     }
//   };

//   const handleFilterSelect = (filter) => {
//     setActiveFilter(filter);
//     if (filter === "Diagnosis") {
//       setOptions(diagnosisOptions);
//     } else if (filter === "Mortality") {
//       setOptions(["admission", "deceased"]);
//     } else if (filter === "LOS") {
//       setOptions(["<=3", ">3 and <=7", ">7 and <=14", ">14"]);
//     }
//     setFilterAnchor(null);
//   };

//   return (
//     <div className="mt-16">
//       <BackgroundBox>
//         <Toaster />
//         <Container maxWidth="lg">
//           <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
//             <Button
//               variant="contained"
//               startIcon={<CiFilter />}
//               onClick={handleFilterClick}
//               sx={{
//                 borderRadius: "12px",
//                 background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                 color: "#ffffff",
//                 padding: "10px 20px",
//                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
//                   transform: "translateY(-2px)",
//                 },
//               }}
//             >
//               Filter
//             </Button>
//             <Menu
//               anchorEl={filterAnchor}
//               open={Boolean(filterAnchor)}
//               onClose={handleFilterClose}
//               PaperProps={{
//                 sx: {
//                   background: "rgba(0, 0, 0, 0.7)",
//                   backdropFilter: "blur(10px)",
//                   borderRadius: "12px",
//                   color: "#fff",
//                   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
//                   mt: 1,
//                 },
//               }}
//               MenuListProps={{
//                 sx: {
//                   padding: 0,
//                 },
//               }}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "right",
//               }}
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//             >
//               {["Diagnosis", "Mortality", "LOS"].map((filter) => (
//                 <MenuItem
//                   key={filter}
//                   onClick={() => handleFilterSelect(filter)}
//                   sx={{
//                     "&:hover": {
//                       background: "rgba(255, 255, 255, 0.1)",
//                     },
//                     padding: "8px 16px",
//                   }}
//                 >
//                   {filter}
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>

//           {filtersVisible && (
//             <Box sx={{ marginBottom: 4 }}>
//               <div>
//                 <Autocomplete
//                   multiple
//                   options={diagnoses}
//                   getOptionLabel={(option) => option}
//                   filterSelectedOptions
//                   loading={loadingDiagnoses}
//                   value={selectedDiagnoses}
//                   onChange={(event, newValue) => dispatch(setSelectedDiagnoses(newValue))}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Select Diagnoses"
//                       variant="outlined"
//                       fullWidth
//                     />
//                   )}
//                 />
//               </div>

//               <div className="mt-4">
//                 <Autocomplete
//                   options={["admission", "deceased"]}
//                   getOptionLabel={(option) => option}
//                   value={selectedMortality}
//                   onChange={(event, newValue) => dispatch(setSelectedMortality(newValue))}
//                   renderInput={(params) => (
//                     <TextField {...params} label="Select Mortality" variant="outlined" fullWidth />
//                   )}
//                 />
//               </div>

//               <div className="mt-4">
//                 <Autocomplete
//                   options={["<=3", ">3 and <=7", ">7 and <=14", ">14"]}
//                   getOptionLabel={(option) => option}
//                   value={selectedLOS}
//                   onChange={(event, newValue) => dispatch(setSelectedLOS(newValue))}
//                   renderInput={(params) => (
//                     <TextField {...params} label="Select Length of Stay(in days)" variant="outlined" fullWidth />
//                   )}
//                 />
//               </div>
//             </Box>
//           )}

//           <Grid container spacing={4} direction="column">
//             <Grid container item spacing={4} alignItems="stretch">
//               {selectedMortality === "admission" && (
//                 <Grid item xs={12} sm={6} md={4}>
//                   <Card bordercolor="#4caf50">
//                     <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>Discharged</Typography>
//                     <Typography variant="h4" sx={{ color: "#4caf50", fontWeight: "bold", marginTop: 1 }}>
//                       {analytics.totalAdmissions - analytics.totalDeceased}
//                     </Typography>
//                   </Card>
//                 </Grid>
//               )}

//               {selectedMortality === "deceased" && (
//                 <Grid item xs={12} sm={6} md={4}>
//                   <Card bordercolor="#f44336">
//                     <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>Deceased</Typography>
//                     <Typography variant="h4" sx={{ color: "#f44336", fontWeight: "bold", marginTop: 1 }}>
//                       {analytics.totalDeceased}
//                     </Typography>
//                   </Card>
//                 </Grid>
//               )}

//               {!selectedMortality && (
//                 <>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <Card bordercolor="#667eea">
//                       <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>Admissions</Typography>
//                       <Typography variant="h4" sx={{ color: "#667eea", fontWeight: "bold", marginTop: 1 }}>
//                         {analytics.totalAdmissions}
//                       </Typography>
//                     </Card>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <Card bordercolor="#4caf50">
//                       <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>Discharged</Typography>
//                       <Typography variant="h4" sx={{ color: "#4caf50", fontWeight: "bold", marginTop: 1 }}>
//                         {analytics.totalAdmissions - analytics.totalDeceased}
//                       </Typography>
//                     </Card>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <Card bordercolor="#f44336">
//                       <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>Deceased</Typography>
//                       <Typography variant="h4" sx={{ color: "#f44336", fontWeight: "bold", marginTop: 1 }}>
//                         {analytics.totalDeceased}
//                       </Typography>
//                     </Card>
//                   </Grid>
//                 </>
//               )}
//             </Grid>

//             <Grid container item spacing={4} justifyContent="center" alignItems="stretch">
//               {[
//                 { title: "Race Distribution", data: createChartData(analytics.raceDistribution, ["#667eea", "#4caf50", "#ff9800", "#9c27b0", "#e91e63"]) },
//                 { title: "Insurance Distribution", data: createChartData(analytics.insuranceDistribution, ["#667eea", "#4caf50", "#ff9800", "#9c27b0", "#e91e63"]) },
//                 { title: "Marital Status", data: createChartData(analytics.maritalStatusDistribution, ["#667eea", "#4caf50", "#9c27b0", "#ff9800", "#e91e63"]) },
//                 { title: "Gender Distribution", data: createChartData(analytics.genderCount, ["#667eea", "#4caf50"]) },
//               ].map((chart, index) => (
//                 <Grid item xs={12} sm={6} md={3} key={index}>
//                   <Card>
//                     <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold", marginBottom: 2 }}>
//                       {chart.title}
//                     </Typography>
//                     <Pie data={chart.data} />
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>

//             <Grid container item spacing={4} justifyContent="center" alignItems="stretch">
//               {[
//                { title: "Age Distribution", data: createChartData(analytics.ageDistribution, ["#667eea", "#4caf50", "#ff9800", "#9c27b0", "#e91e63"], undefined, true,"Patient Admissions Across Age Groups") },
//                 { title: "Top Diagnoses", data: createChartData(analytics.topDiagnoses, ["#667eea", "#4caf50", "#ff9800", "#9c27b0", "#e91e63", "#00bcd4", "#8bc34a", "#ff5722", "#795548", "#607d8b"], 10,false,"Patient Admissions by Diagnosis") },
//               ].map((chart, index) => (
//                 <Grid item xs={12} md={6} key={index}>
//                   <Card>
//                     <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold", marginBottom: 2 }}>
//                       {chart.title}
//                     </Typography>
//                     <Bar data={chart.data} />
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>
//         </Container>
//       </BackgroundBox>
//     </div>
//   );
// };
// export default AnalyticsPage;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Pie, Bar } from "react-chartjs-2";
// import "chart.js/auto";
// import toast, { Toaster } from "react-hot-toast";
// import {
//   Autocomplete,
//   TextField,
//   CircularProgress,
//   Box,
//   Container,
//   Grid,
//   Paper,
//   Typography,
//   Button,
//   Menu,
//   MenuItem,
//   IconButton,
// } from "@mui/material";
// import { CiFilter } from "react-icons/ci";
// import { styled } from "@mui/system";
// import { useSelector, useDispatch } from "react-redux";
// import { setSelectedDiagnoses } from "../slices/diagnosesSlice";
// import { setSelectedMortality } from "../slices/mortalitySlices";
// import { setSelectedLOS } from "../slices/losSlice";
// import { ToggleButton } from "@mui/material";

// // Custom styled components
// const BackgroundBox = styled(Box)(({ theme }) => ({
//   minHeight: "100vh",
//   padding: theme.spacing(4),
//   [theme.breakpoints.down("sm")]: {
//     padding: theme.spacing(2),
//   },
// }));

// const Card = styled(Paper)(({ theme, bordercolor }) => ({
//   padding: theme.spacing(3),
//   borderLeft: `4px solid ${bordercolor}`,
//   borderRadius: "12px",
//   boxShadow: `0 4px 20px rgba(0, 0, 0, 0.1)`,
//   textAlign: "center",
//   height: "100%",
//   background: "#ffffff",
//   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   "&:hover": {
//     boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
//     transform: "translateY(-5px)",
//   },
// }));

// const AnalyticsPage = () => {
//   const [diagnoses, setDiagnoses] = useState([]);
//   const [diagnosisOptions, setDiagnosisOptions] = useState([]);
//   const dispatch = useDispatch();
//   const [loadingDiagnoses, setLoadingDiagnoses] = useState(false);
//   const [analytics, setAnalytics] = useState({
//     totalAdmissions: 0,
//     totalDischarged: 0,
//     totalDeceased: 0,
//     raceDistribution: [],
//     insuranceDistribution: [],
//     genderCount: [],
//     ageDistribution: [],
//     topDiagnoses: [],
//     maritalStatusDistribution: [],
//   });

//   const [filterAnchor, setFilterAnchor] = useState(null);
//   const [options, setOptions] = useState([]);
//   const [activeFilter, setActiveFilter] = useState(null);
//   const [filtersVisible, setFiltersVisible] = useState(false);
//   const selectedDiagnoses = useSelector((state) => state.diagnoses.selectedDiagnoses);
//   const selectedMortality = useSelector((state) => state.mortality.selectedMortality);
//   const selectedLOS = useSelector((state) => state.los.selectedLOS);

//   // State to manage which pie charts are visible
//   const [visiblePieCharts, setVisiblePieCharts] = useState([0, 1]); // Initially show first two pie charts


//   // Function to cycle through pie charts
//   const togglePieCharts = () => {
//     setVisiblePieCharts((prev) => {
//       const nextIndex1 = (prev[0] + 2) % pieCharts.length;
//       const nextIndex2 = (prev[1] + 2) % pieCharts.length;
//       return [nextIndex1, nextIndex2];
//     });
//   };

//   const createChartData = (data, colors, sliceSize = 5, sortAscending = false, label) => {
//     if (!data || !Array.isArray(data)) return { labels: [], datasets: [{ data: [], backgroundColor: [] }] };

//     const validData = data.filter((item) => item && item.count !== undefined && item._id !== undefined);
//     const sortedData = validData.sort((a, b) => (sortAscending ? a._id - b._id : b.count - a.count));
//     const topData = sortedData.slice(0, sliceSize);
//     const uniqueColors = topData.map((_, index) => colors[index % colors.length]);

//     return {
//       labels: topData.map((item) => item._id),
//       datasets: [{ data: topData.map((item) => item.count), backgroundColor: uniqueColors, label: label }],
//     };
//   };


//   const pieCharts = [
//     { title: "Race Distribution", data: createChartData(analytics.raceDistribution, ["#667eea", "#4caf50", "#ff9800", "#9c27b0", "#e91e63"]) },
//     { title: "Insurance Distribution", data: createChartData(analytics.insuranceDistribution, ["#667eea", "#4caf50", "#ff9800", "#9c27b0", "#e91e63"]) },
//     { title: "Marital Status", data: createChartData(analytics.maritalStatusDistribution, ["#667eea", "#4caf50", "#9c27b0", "#ff9800", "#e91e63"]) },
//     { title: "Gender Distribution", data: createChartData(analytics.genderCount, ["#667eea", "#4caf50"]) },
//   ];

//   useEffect(() => {
//     const fetchDiagnoses = async () => {
//       setLoadingDiagnoses(true);
//       try {
//         const response = await axios.get("http://localhost:5000/api/dashboard/health-staff/diagnoses");
//         const fetchedDiagnoses = response.data.diagnoses || [];
//         setDiagnoses(fetchedDiagnoses);
//         setDiagnosisOptions(fetchedDiagnoses);
//       } catch (error) {
//         toast.error("Failed to fetch diagnoses.");
//       } finally {
//         setLoadingDiagnoses(false);
//       }
//     };

//     fetchDiagnoses();
//   }, []);

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const response = await axios.post("http://localhost:5000/api/dashboard/health-staff/analytics", {
//           diagnoses: selectedDiagnoses.length > 0 ? selectedDiagnoses : null,
//           mortality: selectedMortality || null,
//           los: selectedLOS || null,
//         });
//         setAnalytics(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch analytics data.");
//       }
//     };

//     fetchAnalytics();
//   }, [selectedDiagnoses, selectedMortality, selectedLOS]);

//   const handleFilterClose = () => {
//     setFilterAnchor(null);
//   };

//   const handleFilterClick = () => {
//     setFiltersVisible(!filtersVisible);
//     if (filtersVisible) {
//       setActiveFilter(null);
//     }
//   };

//   const handleFilterSelect = (filter) => {
//     setActiveFilter(filter);
//     if (filter === "Diagnosis") {
//       setOptions(diagnosisOptions);
//     } else if (filter === "Mortality") {
//       setOptions(["admission", "deceased"]);
//     } else if (filter === "LOS") {
//       setOptions(["<=3", ">3 and <=7", ">7 and <=14", ">14"]);
//     }
//     setFilterAnchor(null);
//   };

//   return (
//     <div className="mt-16">
//       <BackgroundBox>
//         <Toaster />
//         <Container maxWidth="lg">
//           <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
//             <Button
//               variant="contained"
//               startIcon={<CiFilter />}
//               onClick={handleFilterClick}
//               sx={{
//                 borderRadius: "12px",
//                 background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                 color: "#ffffff",
//                 padding: "10px 20px",
//                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
//                   transform: "translateY(-2px)",
//                 },
//               }}
//             >
//               Filter
//             </Button>
//             <Menu
//               anchorEl={filterAnchor}
//               open={Boolean(filterAnchor)}
//               onClose={handleFilterClose}
//               PaperProps={{
//                 sx: {
//                   background: "rgba(0, 0, 0, 0.7)",
//                   backdropFilter: "blur(10px)",
//                   borderRadius: "12px",
//                   color: "#fff",
//                   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
//                   mt: 1,
//                 },
//               }}
//               MenuListProps={{
//                 sx: {
//                   padding: 0,
//                 },
//               }}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "right",
//               }}
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//             >
//               {["Diagnosis", "Mortality", "LOS"].map((filter) => (
//                 <MenuItem
//                   key={filter}
//                   onClick={() => handleFilterSelect(filter)}
//                   sx={{
//                     "&:hover": {
//                       background: "rgba(255, 255, 255, 0.1)",
//                     },
//                     padding: "8px 16px",
//                   }}
//                 >
//                   {filter}
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>

//           {filtersVisible && (
//             <Box sx={{ marginBottom: 4 }}>
//               <div>
//                 <Autocomplete
//                   multiple
//                   options={diagnoses}
//                   getOptionLabel={(option) => option}
//                   filterSelectedOptions
//                   loading={loadingDiagnoses}
//                   value={selectedDiagnoses}
//                   onChange={(event, newValue) => dispatch(setSelectedDiagnoses(newValue))}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Select Diagnoses"
//                       variant="outlined"
//                       fullWidth
//                     />
//                   )}
//                 />
//               </div>

//               <div className="mt-4">
//                 <Autocomplete
//                   options={["admission", "deceased"]}
//                   getOptionLabel={(option) => option}
//                   value={selectedMortality}
//                   onChange={(event, newValue) => dispatch(setSelectedMortality(newValue))}
//                   renderInput={(params) => (
//                     <TextField {...params} label="Select Mortality" variant="outlined" fullWidth />
//                   )}
//                 />
//               </div>

//               <div className="mt-4">
//                 <Autocomplete
//                   options={["<=3", ">3 and <=7", ">7 and <=14", ">14"]}
//                   getOptionLabel={(option) => option}
//                   value={selectedLOS}
//                   onChange={(event, newValue) => dispatch(setSelectedLOS(newValue))}
//                   renderInput={(params) => (
//                     <TextField {...params} label="Select Length of Stay(in days)" variant="outlined" fullWidth />
//                   )}
//                 />
//               </div>
//             </Box>
//           )}

//           <Grid container spacing={4} direction="column">
//             <Grid container item spacing={4} alignItems="stretch">
//               {selectedMortality === "admission" && (
//                 <Grid item xs={12} sm={6} md={4}>
//                   <Card bordercolor="#4caf50">
//                     <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>Discharged</Typography>
//                     <Typography variant="h4" sx={{ color: "#4caf50", fontWeight: "bold", marginTop: 1 }}>
//                       {analytics.totalAdmissions - analytics.totalDeceased}
//                     </Typography>
//                   </Card>
//                 </Grid>
//               )}

//               {selectedMortality === "deceased" && (
//                 <Grid item xs={12} sm={6} md={4}>
//                   <Card bordercolor="#f44336">
//                     <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>Deceased</Typography>
//                     <Typography variant="h4" sx={{ color: "#f44336", fontWeight: "bold", marginTop: 1 }}>
//                       {analytics.totalDeceased}
//                     </Typography>
//                   </Card>
//                 </Grid>
//               )}

//               {!selectedMortality && (
//                 <>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <Card bordercolor="#667eea">
//                       <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>Admissions</Typography>
//                       <Typography variant="h4" sx={{ color: "#667eea", fontWeight: "bold", marginTop: 1 }}>
//                         {analytics.totalAdmissions}
//                       </Typography>
//                     </Card>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <Card bordercolor="#4caf50">
//                       <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>Discharged</Typography>
//                       <Typography variant="h4" sx={{ color: "#4caf50", fontWeight: "bold", marginTop: 1 }}>
//                         {analytics.totalAdmissions - analytics.totalDeceased}
//                       </Typography>
//                     </Card>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4}>
//                     <Card bordercolor="#f44336">
//                       <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>Deceased</Typography>
//                       <Typography variant="h4" sx={{ color: "#f44336", fontWeight: "bold", marginTop: 1 }}>
//                         {analytics.totalDeceased}
//                       </Typography>
//                     </Card>
//                   </Grid>
//                 </>
//               )}
//             </Grid>

//             <Grid container item spacing={4} justifyContent="center" alignItems="stretch">
//               {/* Pie Charts */}
//               {visiblePieCharts.map((index) => (
//                 <Grid item xs={12} sm={6} md={3} key={index}>
//                   <Card>
//                     <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold", marginBottom: 2 }}>
//                       {pieCharts[index].title}
//                     </Typography>
//                     <Pie data={pieCharts[index].data} />
//                   </Card>
//                 </Grid>
//               ))}

//               {/* Toggle Button */}
//               <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
//                 <IconButton
//                   onClick={togglePieCharts}
//                   sx={{
//                     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                     color: "#ffffff",
//                     borderRadius: "12px",
//                     padding: "10px",
//                     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                     "&:hover": {
//                       boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
//                       transform: "translateY(-2px)",
//                     },
//                   }}
//                 >
//                   <Typography variant="body1">Toggle Charts</Typography>
//                 </IconButton>
//               </Grid>
//             </Grid>

//             <Grid container item spacing={4} justifyContent="center" alignItems="stretch">
//               {[
//                 { title: "Age Distribution", data: createChartData(analytics.ageDistribution, ["#667eea", "#4caf50", "#ff9800", "#9c27b0", "#e91e63"], undefined, true, "Patient Admissions Across Age Groups") },
//                 { title: "Top Diagnoses", data: createChartData(analytics.topDiagnoses, ["#667eea", "#4caf50", "#ff9800", "#9c27b0", "#e91e63", "#00bcd4", "#8bc34a", "#ff5722", "#795548", "#607d8b"], 10, false, "Patient Admissions by Diagnosis") },
//               ].map((chart, index) => (
//                 <Grid item xs={12} md={6} key={index}>
//                   <Card>
//                     <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold", marginBottom: 2 }}>
//                       {chart.title}
//                     </Typography>
//                     <Bar data={chart.data} />
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>
//         </Container>
//       </BackgroundBox>
//     </div>
//   );
// };
// export default AnalyticsPage;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import toast, { Toaster } from "react-hot-toast";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { CiFilter } from "react-icons/ci";
import { ArrowForwardIos } from "@mui/icons-material"; // Import the right arrow icon
import { styled } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDiagnoses } from "../slices/diagnosesSlice";
import { setSelectedMortality } from "../slices/mortalitySlices";
import { setSelectedLOS } from "../slices/losSlice";

// Custom styled components
const BackgroundBox = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const Card = styled(Paper)(({ theme, bordercolor }) => ({
  padding: theme.spacing(3),
  borderLeft: `4px solid ${bordercolor}`,
  borderRadius: "12px",
  boxShadow: `0 4px 20px rgba(0, 0, 0, 0.1)`,
  textAlign: "center",
  height: "100%",
  background: "#ffffff",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
    transform: "translateY(-5px)",
  },
}));

const AnalyticsPage = () => {
  const [diagnoses, setDiagnoses] = useState([]);
  const [diagnosisOptions, setDiagnosisOptions] = useState([]);
  const dispatch = useDispatch();
  const [loadingDiagnoses, setLoadingDiagnoses] = useState(false);
  const [analytics, setAnalytics] = useState({
    totalAdmissions: 0,
    totalDischarged: 0,
    totalDeceased: 0,
    raceDistribution: [],
    insuranceDistribution: [],
    genderCount: [],
    ageDistribution: [],
    topDiagnoses: [],
    maritalStatusDistribution: [],
  });

  const [filterAnchor, setFilterAnchor] = useState(null);
  const [options, setOptions] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const selectedDiagnoses = useSelector((state) => state.diagnoses.selectedDiagnoses);
  const selectedMortality = useSelector((state) => state.mortality.selectedMortality);
  const selectedLOS = useSelector((state) => state.los.selectedLOS);

  // State to manage which pie charts are visible
  const [visiblePieCharts, setVisiblePieCharts] = useState([0, 1]); // Initially show first two pie charts


  // Function to cycle through pie charts
  const cyclePieCharts = () => {
    setVisiblePieCharts((prev) => {
      const nextIndex1 = (prev[0] + 2) % pieCharts.length;
      const nextIndex2 = (prev[1] + 2) % pieCharts.length;
      return [nextIndex1, nextIndex2];
    });
  };

  const createChartData = (data, colors, sliceSize = 5, sortAscending = false, label) => {
    if (!data || !Array.isArray(data)) return { labels: [], datasets: [{ data: [], backgroundColor: [] }] };

    const validData = data.filter((item) => item && item.count !== undefined && item._id !== undefined);
    const sortedData = validData.sort((a, b) => (sortAscending ? a._id - b._id : b.count - a.count));
    const topData = sortedData.slice(0, sliceSize);
    const uniqueColors = topData.map((_, index) => colors[index % colors.length]);

    return {
      labels: topData.map((item) => item._id),
      datasets: [{ data: topData.map((item) => item.count), backgroundColor: uniqueColors, label: label }],
    };
  };


  const createHistogramData = (data, colors, label) => {
    if (!data || !Array.isArray(data)) return { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
  
    const validData = data.filter((item) => item && item.count !== undefined && item._id !== undefined);
  
    // Format age range labels
    const formatAgeLabel = (ageRange) => {
      if (ageRange === "80+") return ageRange;
      const lowerBound = ageRange;
      const upperBound = ageRange + 20;
      return `${lowerBound}-${upperBound}`;
    };
  
    return {
      labels: validData.map((item) => formatAgeLabel(item._id)),
      datasets: [
        {
          label: label,
          data: validData.map((item) => item.count),
          backgroundColor: colors.slice(0, validData.length), // Use provided colors
          borderColor: "#000", // Border color for bars
          borderWidth: 1, // Border width for bars
        },
      ],
    };
  };

  const pieCharts = [
    { title: "Race Distribution", data: createChartData(analytics.raceDistribution, ["#667eea", "#4caf50", "#ff9800", "#9c27b0", "#e91e63"]) },
    { title: "Insurance Distribution", data: createChartData(analytics.insuranceDistribution, ["#667eea", "#4caf50", "#ff9800", "#9c27b0", "#e91e63"]) },
    { title: "Marital Status", data: createChartData(analytics.maritalStatusDistribution, ["#667eea", "#4caf50", "#9c27b0", "#ff9800", "#e91e63"]) },
    { title: "Gender Distribution", data: createChartData(analytics.genderCount, ["#667eea", "#4caf50"]) },
  ];

  useEffect(() => {
    const fetchDiagnoses = async () => {
      setLoadingDiagnoses(true);
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/health-staff/diagnoses");
        const fetchedDiagnoses = response.data.diagnoses || [];
        setDiagnoses(fetchedDiagnoses);
        setDiagnosisOptions(fetchedDiagnoses);
      } catch (error) {
        toast.error("Failed to fetch diagnoses.");
      } finally {
        setLoadingDiagnoses(false);
      }
    };

    fetchDiagnoses();
  }, []);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/dashboard/health-staff/analytics", {
          diagnoses: selectedDiagnoses.length > 0 ? selectedDiagnoses : null,
          mortality: selectedMortality || null,
          los: selectedLOS || null,
        });
        setAnalytics(response.data);
      } catch (error) {
        toast.error("Failed to fetch analytics data.");
      }
    };

    fetchAnalytics();
  }, [selectedDiagnoses, selectedMortality, selectedLOS]);

  const handleFilterClose = () => {
    setFilterAnchor(null);
  };

  const handleFilterClick = () => {
    setFiltersVisible(!filtersVisible);
    if (filtersVisible) {
      setActiveFilter(null);
    }
  };

  const handleFilterSelect = (filter) => {
    setActiveFilter(filter);
    if (filter === "Diagnosis") {
      setOptions(diagnosisOptions);
    } else if (filter === "Mortality") {
      setOptions(["admission", "deceased"]);
    } else if (filter === "LOS") {
      setOptions(["<=3", ">3 and <=7", ">7 and <=14", ">14"]);
    }
    setFilterAnchor(null);
  };

  return (
    <div className="mt-16">
      <BackgroundBox>
        <Toaster />
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
            <Button
              variant="contained"
              startIcon={<CiFilter />}
              onClick={handleFilterClick}
              sx={{
                borderRadius: "12px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#ffffff",
                padding: "10px 20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Filter
            </Button>
            <Menu
              anchorEl={filterAnchor}
              open={Boolean(filterAnchor)}
              onClose={handleFilterClose}
              PaperProps={{
                sx: {
                  background: "rgba(0, 0, 0, 0.7)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                  mt: 1,
                },
              }}
              MenuListProps={{
                sx: {
                  padding: 0,
                },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {["Diagnosis", "Mortality", "LOS"].map((filter) => (
                <MenuItem
                  key={filter}
                  onClick={() => handleFilterSelect(filter)}
                  sx={{
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.1)",
                    },
                    padding: "8px 16px",
                  }}
                >
                  {filter}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {filtersVisible && (
            <Box sx={{ marginBottom: 4 }}>
              <div>
                <Autocomplete
                  multiple
                  options={diagnoses}
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  loading={loadingDiagnoses}
                  value={selectedDiagnoses}
                  onChange={(event, newValue) => dispatch(setSelectedDiagnoses(newValue))}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Diagnoses"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </div>

              <div className="mt-4">
                <Autocomplete
                  options={["admission", "deceased"]}
                  getOptionLabel={(option) => option}
                  value={selectedMortality}
                  onChange={(event, newValue) => dispatch(setSelectedMortality(newValue))}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Mortality" variant="outlined" fullWidth />
                  )}
                />
              </div>

              <div className="mt-4">
                <Autocomplete
                  options={["<=3", ">3 and <=7", ">7 and <=14", ">14"]}
                  getOptionLabel={(option) => option}
                  value={selectedLOS}
                  onChange={(event, newValue) => dispatch(setSelectedLOS(newValue))}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Length of Stay(in days)" variant="outlined" fullWidth />
                  )}
                />
              </div>
            </Box>
          )}

          <Grid container spacing={4} direction="column">
            <Grid container item spacing={4} alignItems="stretch">
              {selectedMortality === "admission" && (
                <Grid item xs={12} sm={6} md={4}>
                  <Card bordercolor="#4caf50">
                    <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>Discharged</Typography>
                    <Typography variant="h4" sx={{ color: "#4caf50", fontWeight: "bold", marginTop: 1 }}>
                      {analytics.totalAdmissions - analytics.totalDeceased}
                    </Typography>
                  </Card>
                </Grid>
              )}

              {selectedMortality === "deceased" && (
                <Grid item xs={12} sm={6} md={4}>
                  <Card bordercolor="#f44336">
                    <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>Deceased</Typography>
                    <Typography variant="h4" sx={{ color: "#f44336", fontWeight: "bold", marginTop: 1 }}>
                      {analytics.totalDeceased}
                    </Typography>
                  </Card>
                </Grid>
              )}

              {!selectedMortality && (
                <>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card bordercolor="#667eea">
                      <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>Admissions</Typography>
                      <Typography variant="h4" sx={{ color: "#667eea", fontWeight: "bold", marginTop: 1 }}>
                        {analytics.totalAdmissions}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card bordercolor="#4caf50">
                      <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>Discharged</Typography>
                      <Typography variant="h4" sx={{ color: "#4caf50", fontWeight: "bold", marginTop: 1 }}>
                        {analytics.totalAdmissions - analytics.totalDeceased}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card bordercolor="#f44336">
                      <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>Deceased</Typography>
                      <Typography variant="h4" sx={{ color: "#f44336", fontWeight: "bold", marginTop: 1 }}>
                        {analytics.totalDeceased}
                      </Typography>
                    </Card>
                  </Grid>
                </>
              )}
            </Grid>

            <Grid container item spacing={4} justifyContent="center" alignItems="stretch">
              {/* Pie Charts */}
              {visiblePieCharts.map((index) => (
                <Grid item xs={12} sm={6} md={6} key={index}> {/* Adjusted to take more space */}
                  <Card>
                    <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold", marginBottom: 2 }}>
                      {pieCharts[index].title}
                    </Typography>
                    <Box sx={{ height: "400px" }}> {/* Increased height for bigger pie charts */}
                      <Pie
                        data={pieCharts[index].data}
                        options={{
                          maintainAspectRatio: false, // Ensure the chart fits the container
                        }}
                      />
                    </Box>
                  </Card>
                </Grid>
              ))}

              {/* Right Arrow Button */}
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
                <IconButton
                  onClick={cyclePieCharts}
                  sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#ffffff",
                    borderRadius: "50%",
                    padding: "12px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <ArrowForwardIos /> {/* Right arrow icon */}
                </IconButton>
              </Grid>
            </Grid>
{/* 
            <Grid container item spacing={4} justifyContent="center" alignItems="stretch">
              {[
                { title: "Age Distribution", data: createChartData(analytics.ageDistribution, ["#667eea", "#4caf50", "#ff9800", "#9c27b0", "#e91e63"], undefined, true, "Patient Admissions Across Age Groups") },
                { title: "Top Diagnoses", data: createChartData(analytics.topDiagnoses, ["#667eea", "#4caf50", "#ff9800", "#9c27b0", "#e91e63", "#00bcd4", "#8bc34a", "#ff5722", "#795548", "#607d8b"], 10, false, "Patient Admissions by Diagnosis") },
              ].map((chart, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card>
                    <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold", marginBottom: 2 }}>
                      {chart.title}
                    </Typography>
                    <Bar data={chart.data} />
                  </Card>
                </Grid>
              ))}
            </Grid> */}



<Grid container item spacing={4} justifyContent="center" alignItems="stretch">
  {[
    {
      title: "Age Distribution",
      data: createHistogramData(analytics.ageDistribution, ["#667eea", "#4caf50", "#ff9800", "#9c27b0", "#e91e63"], "Patient Admissions Across Age Groups"),
    },
    {
      title: "Top Diagnoses",
      data: createChartData(analytics.topDiagnoses, ["#667eea", "#4caf50", "#ff9800", "#9c27b0", "#e91e63", "#00bcd4", "#8bc34a", "#ff5722", "#795548", "#607d8b"], 10, false, "Patient Admissions by Diagnosis"),
    },
  ].map((chart, index) => (
    <Grid item xs={12} md={6} key={index}>
      <Card>
        <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold", marginBottom: 2 }}>
          {chart.title}
        </Typography>
        <Bar
          data={chart.data}
          options={{
            
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
            // Histogram-specific settings
            elements: {
              bar: {
                barThickness: 'flex', // Adjust bar thickness automatically
                categoryPercentage: 1.0, // Bars take up full width of their category
                barPercentage: 1, // Slight gap between bars
              },
            },
          }}
        />
      </Card>
    </Grid>
  ))}
</Grid>
          </Grid>
        </Container>
      </BackgroundBox>
    </div>
  );
};
export default AnalyticsPage;
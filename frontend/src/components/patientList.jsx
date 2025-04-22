


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
// import backgroundbanner from '../assets/bghome.svg';
// import { useSelector } from "react-redux";
// import "chart.js/auto";
// import toast, { Toaster } from "react-hot-toast";
// import { setSelectedSearchQuery } from "../slices/searchQuerySlice";
// import {
//   Autocomplete,
//   TextField,
//   CircularProgress,
//   Box,
//   Button,
// } from "@mui/material";
// import { CiFilter } from "react-icons/ci";
// import { useDispatch } from "react-redux";
// import { setSelectedDiagnoses2 } from "../slices/diagnosesSlice";
// import axios from "axios";

// const PatientList = () => {
//   const [admissions, setAdmissions] = useState([]);
//   const [filteredAdmissions, setFilteredAdmissions] = useState([]);
//   const [predictions, setPredictions] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [inputPage, setInputPage] = useState(""); // For jump-to-page input
//   const [diagnoses, setDiagnoses] = useState([]);
//   const [diagnosisOptions, setDiagnosisOptions] = useState([]); // Cache Diagnosis options
//   const dispatch = useDispatch();
//     const [options, setOptions] = useState([]);

//   const [loadingDiagnoses, setLoadingDiagnoses] = useState(false);
//   const [activeFilter, setActiveFilter] = useState(null);
//   const [filtersVisible, setFiltersVisible] = useState(false);

//   const rowsPerPage = 10;
//   const navigate = useNavigate();

//   const selectedDiagnoses2 = useSelector(state => state.diagnoses.selectedDiagnoses2);
//   const searchQuery = useSelector(state => state.searchquery.selectedSearchQuery);

//   useEffect(() => {
//     fetchAdmissions(currentPage);
//   }, [currentPage, selectedDiagnoses2, searchQuery]);

//   const handleFilterClick = () => {
//     setFiltersVisible(!filtersVisible);
//     if (filtersVisible) {
//       setActiveFilter(null);
//     }
//   };

//   const handleFilterSelect = (filter) => {
//     setActiveFilter(filter);
//     if (filter === "Diagnosis") {
//       setOptions(diagnosisOptions); // Restore cached Diagnosis options
//     }
//   };

//   useEffect(() => {
//     const fetchDiagnoses = async () => {
//       setLoadingDiagnoses(true);
//       try {
//         const response = await axios.get("http://localhost:5000/api/dashboard/health-staff/diagnoses");
//         const fetchedDiagnoses = response.data.diagnoses || [];
//         setDiagnoses(fetchedDiagnoses);
//         setDiagnosisOptions(fetchedDiagnoses); // Cache fetched diagnoses
//       } catch (error) {
//         toast.error("Failed to fetch diagnoses.");
//       } finally {
//         setLoadingDiagnoses(false);
//       }
//     };

//     fetchDiagnoses();
//   }, []);

//   const fetchAdmissions = async (page) => {
//     const token = localStorage.getItem("jwtToken");
//     try {
//       // Build the query parameters
//       const params = new URLSearchParams({
//         page: page,
//         limit: rowsPerPage,
//       });

//       // Add selectedDiagnoses2 to the query if it exists
//       console.log("selectedDiagnoses2: ", selectedDiagnoses2);
//       if (selectedDiagnoses2?.length > 0) {
//         params.append("diagnoses", selectedDiagnoses2.join(","));
//       }

//       // Add searchQuery to the query if it exists and is a valid number
//       if (searchQuery && !isNaN(searchQuery)) {
//         params.append("searchQuery", searchQuery);
//       }

//       const response = await fetch(
//         `http://localhost:5000/api/dashboard/health-staff/patients?${params.toString()}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setAdmissions(data.data);
//       setFilteredAdmissions(data.data); // Set filtered admissions initially
//       setTotalPages(data.totalPages);
//     } catch (error) {
//       console.error("Error fetching admissions:", error);
//       toast.error("Failed to fetch patient data.");
//     }
//   };

//   const formatDateTime = (dateTime) => {
//     const date = new Date(dateTime);
//     return date.toLocaleString("en-US", {
//       month: "short",
//       day: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };


//   const mapping = {
//     0: "1 to 3 days",
//     1: "4 to 7 days",
//     2: "8 to 14 days",
//     3: "greater than 14 days",
// }

// const mapping2 = {
//     1: "less",
//     0: "high",
// }

//   const handlePredict = async (admission) => {
//     try {

//       console.log("Admission Field:",admission);
//       // Construct the payload
//       const payload = {
//         subject_id: admission.subject_id,
//         hadm_id: admission.hadm_id,
//         icd_code: admission.diagnosis || "", // Ensure icd_code is not undefined
//         admission_type: admission.admission_type || "", // Ensure admission_type is not undefined
//         admission_location: admission.admission_location || "", // Ensure admission_location is not undefined
//         age: admission.age || 0, // Add age field (default to 0 if missing)
//         insurance: admission.insurance || "", // Ensure insurance is not undefined
//         language: admission.language || "", // Ensure language is not undefined
//         religion: admission.religion || "", // Ensure religion is not undefined
//         marital_status: admission.marital_status || "", // Ensure marital_status is not undefined
//         ethnicity: admission.ethnicity || "", // Ensure ethnicity is not undefined
//         gender: admission.gender || "", // Ensure gender is not undefined
//       };
  
//       console.log("Sending this JSON:", payload);
  
//       // Send the request to the backend
//       const response = await fetch("http://localhost:8000/predict/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });
  
//       // Handle the response
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Server error:", errorData);
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       const result = await response.json();
//       console.log("Prediction result:", result);
  
//       // Update the predictions state
//       setPredictions((prev) => ({
//         ...prev,
//         [admission.hadm_id]: (
//           <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
//             <div className="space-y-2">
//               <div className="flex items-center">
//                 <span className="font-semibold text-gray-700 mr-2">Mortality:</span>
//                 <span className="text-blue-600">
//                   {result.mortality} - Survival rate is{" "}
//                   <strong className="text-green-600">
//                     {mapping2[result.mortality]}
//                   </strong>
//                 </span>
//               </div>
//               <div className="flex items-center">
//                 <span className="font-semibold text-gray-700 mr-2">Length of Stay:</span>
//                 <span className="text-blue-600">
//                   {result.length_of_stay} - Patient will stay in hospital for{" "}
//                   <strong className="text-green-600">
//                     {mapping[result.length_of_stay]}
//                   </strong>
//                 </span>
//               </div>
//             </div>
//           </div>
//         ),
//       }));    } 
//       catch (error) {
//       console.error("Error:", error);
//       toast.error("Prediction failed with an internal error.");
//     }
//   };



//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prev) => prev + 1);
//       setInputPage(""); // Clear the jump-to-page input
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//       setInputPage(""); // Clear the jump-to-page input
//     }
//   };

//   const handlePageJump = () => {
//     const page = parseInt(inputPage, 10);
//     if (!isNaN(page) && page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     } else {
//       toast.error("Invalid page number.");
//     }
//   };

//   const handleSearchChange = (event) => {
//     dispatch(setSelectedSearchQuery(event.target.value));
//   };

//   const openform = () => {
//     navigate("../input-form");
//   };

//   return (
//     <div
//       className="w-full mx-auto mt-16 p-6 bg-gray-50 min-h-screen bg-white"
//       style={{
//         backgroundImage: `url(${backgroundbanner})`,
//       }}
//     >
//       <div className="w-10/12 mx-auto">
//         {/* Buttons and Filter Menu */}
//         <div className="flex justify-between items-center mb-4">
//           <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
//           </Box>
//           <button
//             onClick={() => navigate("../input-form")}
//             className="rounded-[8px] border text-richblack-25 border-richblack-700 bg-richblack-800 px-[12px] py-[7px] shadow-md transition duration-300 ease-in-out hover:bg-richblack-700 hover:text-white hover:shadow-lg hover:scale-105"
//           >
//             Predict for New Patient
//           </button>
//         </div>

//         {/* Search Box */}
//         {filtersVisible && (
//           <Box sx={{ marginBottom: 4 }}>
//             <div>
//               <Autocomplete
//                 multiple
//                 options={diagnoses}
//                 getOptionLabel={(option) => option}
//                 filterSelectedOptions
//                 loading={loadingDiagnoses}
//                 value={selectedDiagnoses2}
//                 onChange={(event, newValue) => dispatch(setSelectedDiagnoses2(newValue))}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label="Select Diagnoses"
//                     variant="outlined"
//                     fullWidth
//                   />
//                 )}
//               />
//             </div>
//             <div className="mt-4">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 placeholder="Search by Subject ID"
//                 className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </Box>
//         )}

//         {/* Table */}
//         <div
//           className="overflow-x-auto bg-white rounded-lg"
//           style={{
//             boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 0px 4px rgba(0, 0, 0, 0.05)',
//           }}
//         >
//           <table className="w-full table-auto">
//             <thead
//               className="bg-blue-600 text-black"
//               style={{
//                 backgroundColor: '#f2fafe',
//               }}
//             >
//               <tr>
//                 {[
//                   "Subject ID",
//                   "HADM ID",
//                   "Admit Time",
//                   "Admission Type",
//                   "Insurance",
//                   "Ethnicity",
//                   "Admission Location",
//                   "Age",
//                   "Diagnosis",
//                   "Prediction",
//                   "Action",
//                 ].map((header, index) => (
//                   <th
//                     key={index}
//                     className="px-4 py-2 text-left text-sm"
//                     style={{
//                       borderRight: "3px solid white",
//                       borderTop: "3px solid #b0c4de",
//                     }}
//                   >
//                     {header}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredAdmissions.length > 0 ? (
//                 filteredAdmissions.map((admission) => (
//                   <tr
//                     key={admission.hadm_id}
//                     className="border-b border-gray-300 border-opacity-75 hover:bg-gray-100 text-sm leading-tight transition-all duration-300 ease-in-out hover:translate-y-1 hover:shadow-lg"
//                     style={{
//                       borderBottomWidth: "2px",
//                       borderBottomColor: "#d1d5db",
//                       borderBottomStyle: "solid",
//                     }}
//                   >
//                     <td className="px-4 py-2">{admission.subject_id}</td>
//                     <td className="px-4 py-2">{admission.hadm_id}</td>
//                     <td className="px-4 py-2">{formatDateTime(admission.admittime)}</td>
//                     <td className="px-4 py-2">{admission.admission_type}</td>
//                     <td className="px-4 py-2">{admission.insurance}</td>
//                     <td className="px-4 py-2">{admission.ethnicity}</td>
//                     <td className="px-4 py-2">{admission.admission_location}</td>
//                     <td className="px-4 py-2">{admission.age}</td>
//                     <td className="px-4 py-2">{admission.diagnosis}</td>
//                     {/* <td className="px-4 py-2">
//                       <span className="text-gray-500">No prediction</span>
//                     </td> */}
//                      <td className="px-4 py-2">
//                 {predictions[admission.hadm_id] ? (
//                   <pre>{JSON.stringify(predictions[admission.hadm_id], null, 2)}</pre>
//                 ) : (
//                   "No prediction yet"
//                 )}
//               </td>
//                     <td className="px-4 py-2">
//                       <button
//                       onClick={()=> handlePredict(admission)}
//                         className="rounded-[8px] border text-richblack-25 border-richblack-700 bg-richblack-800 px-[12px] py-[7px] shadow-md transition duration-300 ease-in-out hover:bg-richblack-700 hover:text-white hover:shadow-lg hover:scale-105"
//                       >
//                         Predict
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={11} className="px-4 py-2 text-center text-gray-500 text-sm">
//                     No data available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex justify-between items-center mt-6">
//           <div className="flex space-x-4">
//             <button
//               onClick={handlePreviousPage}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded-lg shadow-md transition duration-200 ${
//                 currentPage === 1
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-blue-600 text-white hover:bg-blue-700"
//               }`}
//             >
//               Previous
//             </button>
//             <button
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded-lg shadow-md transition duration-200 ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-blue-600 text-white hover:bg-blue-700"
//               }`}
//             >
//               Next
//             </button>
//           </div>

//           {/* Right-Aligned Page Count */}
//           <div className="text-gray-700">
//             {currentPage} / {totalPages}
//           </div>

//           {/* Jump to Page Section */}
//           <div className="flex items-center space-x-2">
//             <input
//               type="number"
//               value={inputPage}
//               onChange={(e) => setInputPage(e.target.value)}
//               className="w-16 px-2 py-1 border rounded"
//               placeholder="Page"
//             />
//             <button
//               onClick={handlePageJump}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//             >
//               Go
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientList;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import backgroundbanner from '../assets/bghome.svg';
import { useSelector } from "react-redux";
import "chart.js/auto";
import toast, { Toaster } from "react-hot-toast";
import { setSelectedSearchQuery } from "../slices/searchQuerySlice";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import { CiFilter } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { setSelectedDiagnoses2 } from "../slices/diagnosesSlice";
import axios from "axios";

const PatientList = () => {
  const [admissions, setAdmissions] = useState([]);
  const [filteredAdmissions, setFilteredAdmissions] = useState([]);
  const [predictions, setPredictions] = useState({}); // Store plain data
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [diagnoses, setDiagnoses] = useState([]);
  const [diagnosisOptions, setDiagnosisOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [loadingDiagnoses, setLoadingDiagnoses] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [showPrediction, setShowPrediction] = useState({}); // Track visibility of predictions

  const rowsPerPage = 10;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedDiagnoses2 = useSelector(state => state.diagnoses.selectedDiagnoses2);
  const searchQuery = useSelector(state => state.searchquery.selectedSearchQuery);

  useEffect(() => {
    fetchAdmissions(currentPage);
  }, [currentPage, selectedDiagnoses2, searchQuery]);

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
    }
  };

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

  const fetchAdmissions = async (page) => {
    const token = localStorage.getItem("jwtToken");
    try {
      const params = new URLSearchParams({
        page: page,
        limit: rowsPerPage,
      });

      if (selectedDiagnoses2?.length > 0) {
        params.append("diagnoses", selectedDiagnoses2.join(","));
      }

      if (searchQuery && !isNaN(searchQuery)) {
        params.append("searchQuery", searchQuery);
      }

      const response = await fetch(
        `http://localhost:5000/api/dashboard/health-staff/patients?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAdmissions(data.data);
      setFilteredAdmissions(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching admissions:", error);
      toast.error("Failed to fetch patient data.");
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const mapping = {
    0: "1 to 3 days",
    1: "4 to 7 days",
    2: "8 to 14 days",
    3: "greater than 14 days",
  };

  const mapping2 = {
    1: "less",
    0: "high",
  };

  const handlePredict = async (admission) => {
    try {
      const payload = {
        subject_id: admission.subject_id,
        hadm_id: admission.hadm_id,
        icd_code: admission.diagnosis || "",
        admission_type: admission.admission_type || "",
        admission_location: admission.admission_location || "",
        age: admission.age || 0,
        insurance: admission.insurance || "",
        language: admission.language || "",
        religion: admission.religion || "",
        marital_status: admission.marital_status || "",
        ethnicity: admission.ethnicity || "",
        gender: admission.gender || "",
      };

      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Prediction result:", result);

      // Store plain data in state
      setPredictions((prev) => ({
        ...prev,
        [admission.hadm_id]: {
          mortality: result.mortality,
          length_of_stay: result.length_of_stay,
        },
      }));

      // Toggle visibility of the prediction
      setShowPrediction((prev) => ({
        ...prev,
        [admission.hadm_id]: !prev[admission.hadm_id],
      }));
    } catch (error) {
      console.error("Error:", error);
      toast.error("Prediction failed with an internal error.");
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setInputPage("");
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setInputPage("");
    }
  };

  const handlePageJump = () => {
    const page = parseInt(inputPage, 10);
    if (!isNaN(page) && page > 0 && page <= totalPages) {
      setCurrentPage(page);
    } else {
      toast.error("Invalid page number.");
    }
  };

  const handleSearchChange = (event) => {
    dispatch(setSelectedSearchQuery(event.target.value));
  };

  const openform = () => {
    navigate("../input-form");
  };

  return (
    <div
      className="w-full mx-auto mt-16 p-6 bg-gray-50 min-h-screen bg-white"
      style={{
        backgroundImage: `url(${backgroundbanner})`,
      }}
    >
      <div className="w-10/12 mx-auto">
        {/* Buttons and Filter Menu */}
        <div className="flex justify-between items-center mb-4">
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
          </Box>
          <button
            onClick={() => navigate("../input-form")}
            className="rounded-[8px] border text-richblack-25 border-richblack-700 bg-richblack-800 px-[12px] py-[7px] shadow-md transition duration-300 ease-in-out hover:bg-richblack-700 hover:text-white hover:shadow-lg hover:scale-105"
          >
            Predict for New Patient
          </button>
        </div>

        {/* Search Box */}
        {filtersVisible && (
          <Box sx={{ marginBottom: 4 }}>
            <div>
              <Autocomplete
                multiple
                options={diagnoses}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                loading={loadingDiagnoses}
                value={selectedDiagnoses2}
                onChange={(event, newValue) => dispatch(setSelectedDiagnoses2(newValue))}
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
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by Subject ID"
                className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </Box>
        )}

        {/* Table */}
        <div
          className="overflow-x-auto bg-white rounded-lg"
          style={{
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 0px 4px rgba(0, 0, 0, 0.05)',
          }}
        >
          <table className="w-full table-auto">
            <thead
              className="bg-blue-600 text-black"
              style={{
                backgroundColor: '#f2fafe',
              }}
            >
              <tr>
                {[
                  "Subject ID",
                  "HADM ID",
                  "Admit Time",
                  "Admission Type",
                  "Insurance",
                  "Ethnicity",
                  "Admission Location",
                  "Age",
                  "Diagnosis",
                  "Prediction",
                  "Action",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 text-left text-sm"
                    style={{
                      borderRight: "3px solid white",
                      borderTop: "3px solid #b0c4de",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAdmissions.length > 0 ? (
                filteredAdmissions.map((admission) => (
                  <tr
                    key={admission.hadm_id}
                    className="border-b border-gray-300 border-opacity-75 hover:bg-gray-100 text-sm leading-tight transition-all duration-300 ease-in-out hover:translate-y-1 hover:shadow-lg"
                    style={{
                      borderBottomWidth: "2px",
                      borderBottomColor: "#d1d5db",
                      borderBottomStyle: "solid",
                    }}
                  >
                    <td className="px-4 py-2">{admission.subject_id}</td>
                    <td className="px-4 py-2">{admission.hadm_id}</td>
                    <td className="px-4 py-2">{formatDateTime(admission.admittime)}</td>
                    <td className="px-4 py-2">{admission.admission_type}</td>
                    <td className="px-4 py-2">{admission.insurance}</td>
                    <td className="px-4 py-2">{admission.ethnicity}</td>
                    <td className="px-4 py-2">{admission.admission_location}</td>
                    <td className="px-4 py-2">{admission.age}</td>
                    <td className="px-4 py-2">{admission.diagnosis}</td>
                    <td className="px-2 py-2">
                      {showPrediction[admission.hadm_id] && predictions[admission.hadm_id] ? (
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                          <div className="space-y-3">
                            {/* Mortality Section */}
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-700">
                                Mortality {predictions[admission.hadm_id].mortality}:
                              </span>
                              <span className="text-blue-600 mt-1">
                                Survival rate is{" "}
                                <strong className="text-green-600">
                                  {mapping2[predictions[admission.hadm_id].mortality]}
                                </strong>
                              </span>
                            </div>

                            {/* Length of Stay Section */}
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-700">
                                Length of Stay {predictions[admission.hadm_id].length_of_stay}:
                              </span>
                              <span className="text-blue-600 mt-1">
                                Patient will stay in hospital for{" "}
                                <strong className="text-green-600">
                                  {mapping[predictions[admission.hadm_id].length_of_stay]}
                                </strong>
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-500">No prediction yet</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handlePredict(admission)}
                        className="rounded-[8px] border text-richblack-25 border-richblack-700 bg-richblack-800 px-[12px] py-[7px] shadow-md transition duration-300 ease-in-out hover:bg-richblack-700 hover:text-white hover:shadow-lg hover:scale-105"
                      >
                        {showPrediction[admission.hadm_id] ? "Hide Prediction" : "Predict"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="px-4 py-2 text-center text-gray-500 text-sm">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg shadow-md transition duration-200 ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg shadow-md transition duration-200 ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>

          {/* Right-Aligned Page Count */}
          <div className="text-gray-700">
            {currentPage} / {totalPages}
          </div>

          {/* Jump to Page Section */}
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              className="w-16 px-2 py-1 border rounded"
              placeholder="Page"
            />
            <button
              onClick={handlePageJump}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientList;



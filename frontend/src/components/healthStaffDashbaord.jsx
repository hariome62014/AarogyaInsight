import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AnalyticsDashboard from "./analytics";
import { useSelector } from "react-redux";
import backgroundbanner from '../assets/bghome.svg'
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
      const { token } = useSelector(state => state.auth);

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
  
  // const [selectedDiagnoses, setSelectedDiagnoses] = useState([]);
  



  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/");
  };
  const handleCloseModal = () => {
    setSelectedPatient(null);
  };
  useEffect(() => {
    // Fetch list of patients from the server
    

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

        const classes = ['Less than 3 days', '3 to 7 days', '7 to 15 days', 'Greater than 15 days']
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
        const classes = ['Dead', 'Alive']
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


  const handle_patient = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/patient-list");
  }

  const handle_reports = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/patient-reports");
  }

  return (   
    <div
    className="w-full  bg-white min-h-min pb-6"
    style={{
      backgroundImage: `url(${backgroundbanner})`,
    }}
  >
    {/* Align content width with Navbar */}
    <div className="lg:w-11/12 max-w-screen-xl mx-auto">
      <AnalyticsDashboard/>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center mt-4">
        <button
          className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-100 shadow-md transition duration-300 ease-in-out hover:bg-richblack-700 hover:text-white hover:shadow-lg hover:scale-105"
          onClick={handle_patient}
        >
          See Patient List
        </button>
        <button
          className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-100 shadow-md transition duration-300 ease-in-out hover:bg-richblack-700 hover:text-white hover:shadow-lg hover:scale-105"
          onClick={handle_reports}
        >
          See Patient Reports
        </button>
      </div>
    </div>
  </div>
  
    
  );
};

export default HealthStaffDashboard;

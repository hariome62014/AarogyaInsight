import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import backgroundbanner from "../assets/bghome.svg";
import maleAvatarYoung from "../assets/boy.png"
import maleAvatarAdult from "../assets/man.png";
import maleAvatarOld from "../assets/oldman.png";
import femaleAvatarYoung from '../assets/teengirl.png'
import femaleAvatarAdult from "../assets/adultfemale.png";
import femaleAvatarOld from "../assets/oldfemale.png";
import {
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Avatar,
  Divider,
  CircularProgress,
} from "@mui/material";
import toast from "react-hot-toast";
import { styled } from "@mui/system";

// Utility function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Utility function to capitalize the first letter
const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

// Utility function to determine avatar path based on DOB and gender
const getAvatarPath = (dob, gender) => {
  if (!dob || !gender) return maleAvatarYoung; // Default fallback avatar
  const birthYear = new Date(dob).getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  if (gender === "Male") {
    if(age<18) return maleAvatarYoung;
    else if(age<50) return maleAvatarAdult;
    else return maleAvatarOld;
  } else if (gender === "Female") {
    if(age<18) return femaleAvatarYoung;
    else if(age<50) return femaleAvatarAdult;
    else return femaleAvatarOld;
  }
  return maleAvatarYoung; // Fallback if gender doesn't match
};


const BackgroundBox = styled(Box)(({ theme }) => ({
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  minHeight: "100vh",
  padding: theme.spacing(4),
}));

const AnimatedPaper = styled(Paper)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  animation: "borderPulse 4s infinite ease-in-out",
  "@keyframes borderPulse": {
    "0%": { borderColor: theme.palette.primary.light },
    "50%": { borderColor: theme.palette.secondary.main },
    "100%": { borderColor: theme.palette.primary.light },
  },
  border: "3px solid",
}));

const PatientDashboard = () => {
  const [patientData, setPatientData] = useState(null);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      toast.error("Authentication token is missing!");
      navigate("/");
      return;
    }

    const decodedToken = jwtDecode(token);

    fetch(`http://localhost:5000/api/patients/${decodedToken.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch patient data.");
        }
        return response.json();
      })
      .then((data) => {
        setPatientData(data);
      })
      .catch((error) => {
        toast.error(error.message);
        console.error("Error fetching patient data:", error);
      });
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  return (
    <div
      className="mt-16 bg-white"
      style={{
        backgroundImage: `url(${backgroundbanner})`,
      }}
    >
      <BackgroundBox>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <AnimatedPaper
                elevation={5}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  backgroundColor: "background.paper",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    {patientData ? (
                     <Avatar
                     sx={{
                       width: 100,
                       height: 100,
                     }}
                     src={getAvatarPath(patientData?.dob, patientData?.gender)}
                     alt={`${patientData?.firstName || "User"} Avatar`}
                   />
                   
                    ) : (
                      <CircularProgress color="primary" />
                    )}
                    {patientData && (
                      <Typography
                        variant="h6"
                        color="richblack-25"
                        mt={2}
                        sx={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        Welcome {patientData.firstName} 👋
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Divider />
                {patientData ? (
                  <Box mt={2}>
                    <Typography variant="body1" gutterBottom>
                      <strong>Name:</strong> {patientData.firstName} {patientData.lastName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Date of Birth:</strong> {formatDate(patientData.dob)}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Gender:</strong> {capitalizeFirstLetter(patientData.gender)}
                    </Typography>
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="center" mt={2}>
                    <CircularProgress color="primary" />
                  </Box>
                )}
              </AnimatedPaper>
            </Grid>
            <Grid item xs={12} md={8}>
              <AnimatedPaper
                elevation={5}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  backgroundColor: "background.default",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ fontStyle: "italic" }}
                >
                  {patientData
                    ? "No Patient Reports Available"
                    : "Loading Reports..."}
                </Typography>
              </AnimatedPaper>
            </Grid>
          </Grid>
        </Container>
      </BackgroundBox>
    </div>
  );
};

export default PatientDashboard;

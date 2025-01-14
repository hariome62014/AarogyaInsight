import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Paper, Box } from "@mui/material";

const PredictionReport = () => {
  const navigate = useNavigate();
  const { prediction } = navigate?.location?.state || { prediction: "No data" };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} style={{ padding: "20px", maxWidth: "600px", textAlign: "center" }}>
        <Typography variant="h4">Prediction Report</Typography>
        <Typography variant="body1" style={{ marginTop: "20px" }}>
          {prediction}
        </Typography>
      </Paper>
    </Box>
  );
};

export default PredictionReport;

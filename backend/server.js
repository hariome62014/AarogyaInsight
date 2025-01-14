const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectToDB } = require("./database/db");

const registrationRoutes = require("./Routes/registrationRoutes");
const signInRoutes = require("./Routes/SignInRoutes");
//const dashboardRoutes = require('./Routes/DashboardRoutes');
const admissionRoutes = require("./Routes/admissionRoutes");
const dischargeRoutes = require("./Routes/dischargeRoutes");
const uploadImagesRoutes = require("./Routes/uploadImagesRoutes");
const doctorRoutes = require("./Routes/doctorRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const doctorLoginRoutes = require("./Routes/doctorLoginRoutes");
const adminLoginRoutes = require("./Routes/adminLoginRoutes");
const patientDashboardRoutes = require("./Routes/patientDashboardRoutes");
const doctorDashboardRoutes = require("./Routes/doctorDashboardRoutes");
const adminDashboardRoutes = require("./Routes/adminDashboardRoutes");
const healthStaffLoginRoutes = require("./Routes/healthStaffLoginRoutes");
const healthStaffRegistration = require("./Routes/healthStaffRegistration");
const healthStaffDashboardRoutes = require("./Routes/healthStaffDashbaord");
const calculateRoute = require("./Routes/calculateRoutes");
const patientEdit = require("./Routes/patientEditRoutes");
const generatePatient = require("./Routes/generatePatientId");
const generateHADMID = require("./Routes/generateHADMId");
const emarRoutes = require("./Routes/emar"); // Import the EMAR routes
const drgCodesRoutes = require("./Routes/drgcodes"); // Import the DRG Codes routes
const diagnosesICDRoutes = require("./Routes/diagnoses_icd");
const dHCPSPRoutes = require("./Routes/d_hcps");
const dLabItemsRoutes = require("./Routes/d_labItems");
const dISCDiagnosesRoutes = require("./Routes/d_icd_diagnoses");
const hadmIdForOther = require("./Routes/hadmIdForOthers");

const labEventsRoutes = require("./Routes/labeventsRoutes"); // Import the Lab Events routes
const microeventsRoutes = require("./Routes/microeventsRoutes"); // Import the Microevents routes
const omrRoutes = require("./Routes/omrRoutes"); // Import the OMR routes
const pharmacyRoutes = require("./Routes/pharmacyRoutes"); // Import the Pharmacy routes
const poeRoutes = require("./Routes/poeRoutes"); // Import the POE routes
const poeDetailsRoutes = require("./Routes/poeDetailsRoutes"); // Import the POE Details routes
const prescriptionsRoutes = require("./Routes/PrescriptionRoutes"); // Import the Prescriptions routes
const proceduresIcdRoutes = require("./Routes/procedures_icdRoutes"); // Import the Procedures ICD routes
const providerRoutes = require("./Routes/ProviderRouter"); // Import the Provider routes
const servicesRoutes = require("./Routes/servicesRoutes"); // Import the Services routes
const transfersRoutes = require("./Routes/transfersRoutes"); // Import the Transfers routes
const caregiversRoutes = require("./Routes/caregiversRoutes"); // Import the Caregivers routes
const chartEventsRoutes = require("./Routes/chartEventsRoutes"); // Import the Chart Events routes
const dItemsRoutes = require("./Routes/d_itemsRoutes"); // Import the D_Items routes
const datetimeEventsRoutes = require("./Routes/dattimeEventsRoutes"); // Import the DateTimeEvents routes
const icustaysRoutes = require("./Routes/icuStaysRoutes"); // Import the ICUSTays routes
const ingredientEventsRoutes = require("./Routes/ingredientEventsROutes"); // Import the Ingredient Events routes
const inputEventsRoutes = require("./Routes/inputeventsRoutes"); // Import the Input Events routes
const outputEventsRoutes = require("./Routes/outputeventsRoutes"); // Import the Output Events routes
const procedureEventsRoutes = require("./Routes/procedureeventsRoutes"); // Import the Procedure Events routes
// const PatientsRoutes = require("./Routes/patientsRoutes");
const DischargeDetail = require("./Routes/discharge-detailRoutes");
const Radiology = require("./Routes/radiologyRoutes");
const RadiologyDetails = require("./Routes/radiologyDetailsRoutes");
const d_icd_diagnoses = require("./Routes/d_icd_diagnoses");
const generateNoteIdRoutes = require("./Routes/generate_note_id"); // Import the generateNoteIdRoutes
const generateitemIdRoutes = require("./Routes/generate_item_id"); // Import the generateLabItemsRoutes
const LoginRoutes = require("./Routes/login");
const xrayReports = require("./Routes/xrayReports");
const predictionRoutes = require("./Routes/predictionRoutes");
const analytics = require ( "./Routes/analytics")
const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Check if the .env file exists in the root directory
const envFilePath = path.join(__dirname, "..", ".env"); // Assuming the .env file is in the root directory (WebPage1/.env)
if (!fs.existsSync(envFilePath)) {
  // Generate a random secure secret key using uuid
  const secretKey = require("uuid").v4();

  // Create or update the .env file with the JWT_SECRET_KEY
  fs.writeFileSync(envFilePath, `JWT_SECRET_KEY=${secretKey}\n`);

  console.log("Generated JWT secret key and stored in .env file.");
}

// Load environment variables from the .env file in the root directory
require("dotenv").config({ path: envFilePath });

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/login", signInRoutes);
app.use("/api/registration", registrationRoutes);

app.use("/api/admission", admissionRoutes);
app.use("/api/discharge", dischargeRoutes);
app.use("/api/upload-images", uploadImagesRoutes);
//app.use('/api/dashboard', dashboardRoutes);
app.use("/api/register-doctor", doctorRoutes);
app.use("/api/register-admin", adminRoutes);
app.use("/api/login/doctor", doctorLoginRoutes);
app.use("/api/login/admin", adminLoginRoutes);
app.use("/api/dashboard/patient", patientDashboardRoutes);
app.use("/api/dashboard/doctor", doctorDashboardRoutes);
app.use("/api/dashboard/users", adminDashboardRoutes);
app.use("/api/login/health-staff", healthStaffLoginRoutes);
app.use("/api/register-health-staff", healthStaffRegistration); // Corrected route path
app.use("/api/dashboard/health-staff", healthStaffDashboardRoutes);
app.use("/api/calculate-sum", calculateRoute);
app.use("/api/patients", patientEdit);
app.use("/api/generate-patient-id", generatePatient);
app.use("/api/generate-hadm-id", generateHADMID);
app.use("/api/emar", emarRoutes); // Add EMAR routes
app.use("/api/drgcodes", drgCodesRoutes); // Add DRG Codes routes
app.use("/api/diagnoses_icd", diagnosesICDRoutes);
app.use("/api/d_hcps", dHCPSPRoutes);
app.use("/api/d_labItems", dLabItemsRoutes);
app.use("/api/d_icd_diagnosess", dISCDiagnosesRoutes);
app.use("/api/gen-hadm-id", hadmIdForOther);

//Include routes for other forms
app.use("/api/lab-events", labEventsRoutes); // Include Lab Events routes
app.use("/api/microevents", microeventsRoutes); // Include Microevents routes
app.use("/api/omr", omrRoutes); // Include OMR routes
app.use("/api/pharmacy", pharmacyRoutes); // Include Pharmacy routes
app.use("/api/poe", poeRoutes); // Include POE routes
app.use("/api/poe-details", poeDetailsRoutes); // Include POE Details routes
app.use("/api/prescriptions", prescriptionsRoutes); // Include Prescriptions routes
app.use("/api/procedures-icd", proceduresIcdRoutes); // Include Procedures ICD routes
app.use("/api/provider", providerRoutes); // Include Provider routes
app.use("/api/services", servicesRoutes); // Include Services routes
app.use("/api/transfers", transfersRoutes); // Include Transfers routes
app.use("/api/caregivers", caregiversRoutes); // Include Caregivers routes
app.use("/api/chart-events", chartEventsRoutes); // Include Chart Events routes
app.use("/api/d-items", dItemsRoutes); // Include D_Items routes
app.use("/api/datetime-events", datetimeEventsRoutes); // Include DateTimeEvents routes
app.use("/api/icustays", icustaysRoutes); // Include ICUSTays routes
app.use("/api/ingredient-events", ingredientEventsRoutes); // Include Ingredient Events routes
app.use("/api/input-events", inputEventsRoutes); // Include Input Events routes
app.use("/api/output-events", outputEventsRoutes); // Include Output Events routes
app.use("/api/procedure-events", procedureEventsRoutes); // Include Procedure Events routes
app.use("/api/dashboard/health-staff", procedureEventsRoutes);
app.use("api/dashboard/health-abhi" , analytics)

// app.use("/api/patients", PatientsRoutes);
app.use("/api/discharge_detail", DischargeDetail);
app.use("/api/radiology", Radiology);
app.use("/api/radiology_details", RadiologyDetails);
app.use("/api/d_icd_diagnoses", d_icd_diagnoses);
app.use("/api/generate-item-id", generateitemIdRoutes);

app.use("/api/generate-note-id", generateNoteIdRoutes);
app.use("/api/login", LoginRoutes);
// Add a route handler for the home route ('/') to provide a response or redirect to the login page
app.use("/api/upload-xray-reports", xrayReports);
app.use("/api/predictions", predictionRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the backend!"); //replaceable
});

connectToDB();

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


//create a fetch admission data api.
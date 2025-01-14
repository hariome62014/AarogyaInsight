import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import AdminTheme from "./styles/adminTheme";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import RegistrationForm from "./components/RegistrationForm";
import DoctorRegistrationForm from "./components/doctorRegistrationForm";
import AdminRegistrationForm from "./components/adminRegistrationForm";
import HealthStaffRegistration from "./components/healthStaffRegistration";
import AdminDashboard from "./components/adminDashboard";
import DoctorDashboard from "./components/doctorDashboard";
import PatientDashboard from "./components/patientDashboard";
import AdmissionForm from "./Forms/Admission";
import DischargeForm from "./Forms/Discharge";
//import UploadImagesForm from "./components/UploadImagesForm";
import HealthStaffDashboard from "./components/healthStaffDashbaord";
import PatientEditPage from "./components/patientEditPage";
import DHCPSForm from "./Forms/d_hcps";
import DiagnosesICDForm from "./Forms/diagnoses_icd";
import DLabItemsForm from "./Forms/d_labItems";
import DISCDiagnosesForm from "./Forms/d_icd_diagnoses";
import EMARForm from "./Forms/emar"; // Import your EMAR form component
import DRGCodesForm from "./Forms/drgcodes"; // Import your DRG Codes form component
// import { Dashboard } from "@mui/icons-material";
import LabEventsForm from "./Forms/labeventsForm";
import MicroeventsForm from "./Forms/microeventsForm";
import OMRForm from "./Forms/omrForm";
import PharmacyForm from "./Forms/pharmacyForm";
import PoeForm from "./Forms/poeForm";
import PoeDetailsForm from "./Forms/poe_detail";
import PrescriptionsForm from "./Forms/PrescriptionsForm";
import ProceduresIcdForm from "./Forms/procedures_icdForm";
import ProviderForm from "./Forms/ProviderForm";
import ServicesForm from "./Forms/ServicesForm";
import TransfersForm from "./Forms/TransfersForm";
import CaregiversForm from "./Forms/caregiversForm";
import ChartEventsForm from "./Forms/charteventsForm";
import HCPSEventsForm from "./Forms/hcpseventsForm";
import DateTimeEventsForm from "./Forms/datetimeeventsForm";
import ICUSTaysForm from "./Forms/icustaysForm";
import IngredientEventsForm from "./Forms/ingredienteventsForm";
import InputEventsForm from "./Forms/inputeventsForm";
import OutputEventsForm from "./Forms/outputeventsForm";
import ProcedureEventsForm from "./Forms/procedureeventsForm";
import EMARDetailsForm from "./Forms/emar_detailsForm";
import DItemsForm from "./Forms/d_itemsForm";
import XRayReportForm from "./Forms/XrayReports.jsx";
import PredictionReport from "./components/predictReport.jsx";
import PatientList from "./components/patientList.jsx";
import InputForm from "./components/inputform.jsx";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={AdminTheme}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignUp />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route
              path="/doctor-registration"
              element={<DoctorRegistrationForm />}
            />
            <Route
              path="/admin-registration"
              element={<AdminRegistrationForm />}
            />
            <Route
              path="/register-health-staff"
              element={<HealthStaffRegistration />}
            />{" "}
            {/* Route for Health Staff Registration */}
            {<Route path="/admin-dashboard" element={<AdminDashboard />} />}
            {/* Route for Admin Dashboard */}
            <Route
              path="/doctor-dashboard"
              element={<DoctorDashboard />}
            />{" "}
            <Route
              path="/health-staff-dashboard"
              element={<HealthStaffDashboard />}
            />{" "}
            <Route
              path="/input-form"
              element={<InputForm />}
            />{" "}
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/patient-list" element={<PatientList />} />
            {/* <Route path="/admission" element={<AdmissionForm />} /> */}
            {/* Route to the Admission Form */}
            <Route path="/admission" element={<AdmissionForm />} />
            {/* { <Route path="/upload-images-form" element={<UploadImagesForm />} />} */}
            <Route path="/edit_patient/:id" element={<PatientEditPage />} />
            <Route path="/d_hcps" element={<DHCPSForm />} />
            <Route path="/diagnoses_icd" element={<DiagnosesICDForm />} />
            <Route path="/d_labItems" element={<DLabItemsForm />} />
            <Route path="/d_icd_diagnoses" element={<DISCDiagnosesForm />} />
            <Route path="/emar" element={<EMARForm />} /> {/* New EMAR route */}
            <Route path="/drgcodes" element={<DRGCodesForm />} />
            {/* New DRG Codes route */}
            <Route path="/lab-events" element={<LabEventsForm />} />
            <Route path="/microevents" element={<MicroeventsForm />} />
            <Route path="/omr" element={<OMRForm />} />
            <Route path="/pharmacy" element={<PharmacyForm />} />
            <Route path="/poe" element={<PoeForm />} />
            <Route path="/poe-details" element={<PoeDetailsForm />} />
            <Route path="/prescriptions" element={<PrescriptionsForm />} />
            <Route path="/procedures-icd" element={<ProceduresIcdForm />} />
            <Route path="/provider" element={<ProviderForm />} />
            <Route path="/services" element={<ServicesForm />} />
            <Route path="/transfers" element={<TransfersForm />} />
            <Route path="/caregivers" element={<CaregiversForm />} />
            <Route path="/chart-events" element={<ChartEventsForm />} />
            <Route path="/datetime-events" element={<DateTimeEventsForm />} />
            <Route path="/icustays" element={<ICUSTaysForm />} />
            <Route path="/emar-details" element={<EMARDetailsForm />} />
            <Route
              path="/ingredient-events"
              element={<IngredientEventsForm />}
            />
            <Route path="/input-events" element={<InputEventsForm />} />
            <Route path="/hcps-events" element={<HCPSEventsForm />} />
            <Route path="/output-events" element={<OutputEventsForm />} />
            <Route path="/date-time-events" element={<DateTimeEventsForm />} />
            <Route path="/procedure-events" element={<ProcedureEventsForm />} />
            <Route path="/d_items" element={<DItemsForm />} />
            <Route path="/xray" element={<XRayReportForm />} />
            <Route path="/predict-report" element={<PredictionReport />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;

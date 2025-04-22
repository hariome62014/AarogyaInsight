import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminTheme from "./styles/adminTheme";
import HomePage from "./components/HomePage";
import Signup from './pages/Signup.js'
import { setProgress } from "./slices/loadingBarSlice.js";
import { RiWifiOffLine } from "react-icons/ri";


import NavBar from "./components/common/NavBar.js";
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
import Reports_text from "./components/reportsTable.jsx";
import PatientTextInput from "./components/patient_text_input_form.jsx";
import PrivateRoute from "./components/core/Auth/PrivateRoute.js";
import OpenRoute from "./components/core/Auth/OpenRoute.js";
import Login from "./pages/Login.js";
import VerifyOtp from "./pages/VerifyOtp.js";
import ResetPassword from "./pages/ResetPassword.js";
import ForgotPassword from "./pages/ForgotPassword";
import Footer from "./components/common/Footer.js";
import { useLocation } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from "react-redux";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#63a4ff', // Define the light color explicitly
      dark: '#004ba0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5c8d',
      dark: '#9a0036',
    },
  },
});

const FooterWrapper = () => {
  const location = useLocation();

  // Paths where the Footer should be hidden
  const hiddenPaths = ["/login", "/signup", "/forgot-password","/verify-email"];
  
  // Check if the path matches any of the static paths or the dynamic update-password path
  const isHidden = hiddenPaths.includes(location.pathname) || 
                   location.pathname.startsWith("/update-password/");

  if (isHidden) {
    return null;
  }

  return <Footer />;
};





function App() {

  const user  = useSelector(state=>state.profile);
  console.log("UserData: ",user);


  return (
    <div className="App relative">
      <ThemeProvider theme={theme}>


      <NavBar setProgress={setProgress} className="fixed top-0 left-0 w-full z-50"></NavBar>

      {!navigator.onLine && (
        <div className="bg-red-500 flex text-white text-center p-2 bg-richblack-300 justify-center gap-2 items-center">
          <RiWifiOffLine size={22} />
          Please check your internet connection.
          <button
            className="ml-2 bg-richblack-500 rounded-md p-1 px-2 text-white"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}
       
          <Routes>
             {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={
          <OpenRoute>
          <Login />
          </OpenRoute>
          } />
        <Route path="/signup" element={
          <OpenRoute>
          <Signup />
          </OpenRoute>
          } />
        <Route path="/register" element={
          <OpenRoute>
          <RegistrationForm />
          </OpenRoute>} />
        <Route path="/forgot-password" element={
          <OpenRoute>
          <ForgotPassword />
          </OpenRoute>
        } />
        <Route path="/update-password/:id" element={
          <OpenRoute>
          <ResetPassword />
          </OpenRoute>
          } />
        <Route path="/verify-email" element={
          <OpenRoute>
          <VerifyOtp />
          </OpenRoute>}
           />
        <Route path="/register-health-staff" element={
          <OpenRoute>
          <HealthStaffRegistration />
          </OpenRoute>
        }/>

      
          <Route path="/health-staff-dashboard" element={
            <PrivateRoute>
            <HealthStaffDashboard />
            </PrivateRoute>}/>
          <Route path="/input-form" element={
            <PrivateRoute>
            <InputForm />
            </PrivateRoute>
            } />
          <Route path="/patient-list" element={
            <PrivateRoute>
            <PatientList />
            </PrivateRoute>
          } />
          <Route path="/patient-reports" element={
            <PrivateRoute>
            <Reports_text />
            </PrivateRoute>
            } />
          <Route path="/text-form" element={<PrivateRoute>
            <PatientTextInput />
            </PrivateRoute>} />


          <Route path="*" element={<HomePage />} />
       


{/* 
            <Route
              path="/doctor-registration"
              element={<DoctorRegistrationForm />}
            />
            <Route
              path="/admin-registration"
              element={<AdminRegistrationForm />}
            />
      
            Route for Health Staff Registration
            {<Route path="/admin-dashboard" element={<AdminDashboard />} />}
            Route for Admin Dashboard
            <Route
              path="/doctor-dashboard"
              element={<DoctorDashboard />}
            />{" "}            */}
            {/* <Route path="/patient-dashboard" element={<PatientDashboard />} /> */}
            {/* <Route path="/admission" element={<AdmissionForm />} /> */}
            {/* Route to the Admission Form */}
            {/* <Route path="/admission" element={<AdmissionForm />} /> */}
            {/* { <Route path="/upload-images-form" element={<UploadImagesForm />} />} */}
            {/* <Route path="/edit_patient/:id" element={<PatientEditPage />} /> */}
            {/* <Route path="/d_hcps" element={<DHCPSForm />} />
            <Route path="/diagnoses_icd" element={<DiagnosesICDForm />} />
            <Route path="/d_labItems" element={<DLabItemsForm />} />
            <Route path="/d_icd_diagnoses" element={<DISCDiagnosesForm />} />
            <Route path="/emar" element={<EMARForm />} /> 
            <Route path="/drgcodes" element={<DRGCodesForm />} /> */}
            {/* New DRG Codes route */}
            {/* <Route path="/lab-events" element={<LabEventsForm />} />
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
            <Route path="/predict-report" element={<PredictionReport />} /> */}
          </Routes>
        
      </ThemeProvider>
      <FooterWrapper/>
    </div>
  );
}

export default App;

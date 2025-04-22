// import React, { useState } from "react";
// import { Grid, Paper, Typography, Button, TextField } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     if (!selectedRole) {
//       setError("Please select a role first");
//       return;
//     }
//     try {
//       // Send login request to the backend
//       const loginUrl =
//         selectedRole === "Doctor"
//           ? "http://localhost:5000/api/login/doctor"
//           : selectedRole === "Admin"
//           ? "http://localhost:5000/api/login/admin"
//           : selectedRole === "Health Staff" // New Health Staff login route
//           ? "http://localhost:5000/api/login/health-staff"
//           : "http://localhost:5000/api/login"; // Default route for other roles
//       const response = await fetch(loginUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         // Get the JWT token from the response
//         const data = await response.json();
//         const token = data.token;

//         console.log("JWT Token:", token);

//         // Store the token securely in local storage
//         localStorage.setItem("jwtToken", token);

//         // Redirect to the respective dashboard based on the selected role
//         if (selectedRole === "Admin") {
//           navigate("/admin-dashboard");
//         } else if (selectedRole === "Doctor") {
//           navigate("/doctor-dashboard");
//         } else if (selectedRole === "Patient") {
//           navigate("/patient-dashboard");
//         } else if (selectedRole === "Health Staff") {
//           // Navigate to Health Staff dashboard
//           navigate("/health-staff-dashboard");
//         }
//       }
//       // ... (other error handling)
//     } catch (error) {
//       // ... (error handling)
//     }
//   };

//   const handleRegister = () => {
//     // if (selectedRole === "Admin") {
//     //   navigate("/admin-registration");
//     // } else if (selectedRole === "Doctor") {
//     //   navigate("/doctor-registration");
//     // } else if (selectedRole === "Patient") {
//     //   navigate("/register");
//     // } else if (selectedRole === "Health Staff") {
//     //   // Navigate to Health Staff registration
//     //   navigate("/register-health-staff");
//     //}
//     if (selectedRole === "Patient") {
//       navigate("/register");
//     } else {
//       // Handle if no role is selected
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "grid",
//         height: "100vh",
//         placeItems: "center",
//         backgroundImage: "linear-gradient(#FF7F50, #fff6e4, #006400)",
//       }}
//     >
//       {/* Proceed as: User type selection */}
//       <Typography variant="h6" style={{ marginBottom: "20px" }}>
//         Proceed as:
//       </Typography>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           marginBottom: "20px",
//         }}
//       >
//         <Button
//           variant="outlined"
//           onClick={() => setSelectedRole("Admin")}
//           style={{ marginRight: "10px" }}
//         >
//           Admin
//         </Button>
//         <Button
//           variant="outlined"
//           onClick={() => setSelectedRole("Patient")}
//           style={{ marginRight: "10px" }}
//         >
//           Patient
//         </Button>
//         <Button variant="outlined" onClick={() => setSelectedRole("Doctor")}>
//           Doctor
//         </Button>

//         <Button
//           variant="outlined"
//           onClick={() => setSelectedRole("Health Staff")}
//         >
//           Health Staff
//         </Button>
//       </div>
//       <Paper
//         sx={{
//           padding: "30px",
//           border: "5px solid green",
//           borderRadius: "20px",
//         }}
//       >
//         <Grid
//           container
//           spacing={3}
//           direction={"column"}
//           justify={"center"}
//           alignItems={"center"}
//         >
//           <Grid item xs={12}>
//             <TextField
//               label="Username"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Grid>
//         </Grid>
//         <Grid container spacing={3} style={{ paddingTop: "24px" }}>
//           <Grid item xs={12}>
//             <Grid container xs={12} justifyContent="space-around" spacing={1}>
//               <Grid item xs="auto">
//                 {/* "Login" button handles the login functionality */}
//                 <Button
//                   style={{ backgroundColor: "green", borderRadius: "8px" }}
//                   variant="contained"
//                   onClick={handleLogin}
//                 >
//                   Login
//                 </Button>
//               </Grid>
//               <Grid item xs="auto">
//                 {/* "New user? Then Register" button redirects to the registration page */}
//                 {/* <Button
//                   component={Link}
//                   to="/register"
//                   style={{
//                     backgroundColor: "white",
//                     color: "green",
//                     border: "1px solid green",
//                     borderRadius: "8px",
//                   }}
//                   variant="contained"
//                 >
//                   New user? Then Register
//                 </Button> */}
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item xs={12}>
//             <Grid container>
//               <Grid item xs>
//                 <Link to="/forgot-password">
//                   <Typography variant="body2">Forgotten Password?</Typography>
//                 </Link>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>

//         {/* "New user? Then Register" button redirects to the registration page */}
//         <Grid container justifyContent="center" style={{ paddingTop: "12px" }}>
//           <Grid item>
//             <Button
//               style={{
//                 backgroundColor: "white",
//                 color: "green",
//                 border: "1px solid green",
//                 borderRadius: "8px",
//               }}
//               variant="contained"
//               onClick={handleRegister}
//             >
//               Patient Register
//             </Button>
//           </Grid>
//         </Grid>

//         {/* existing error handling */}
//         {error && (
//           <Grid container spacing={3} style={{ paddingTop: "12px" }}>
//             <Grid item xs={12}>
//               <Typography variant="body1" style={{ color: "red" }}>
//                 {error}
//               </Typography>
//             </Grid>
//           </Grid>
//         )}
//       </Paper>
//     </div>
//   );
// };

// export default SignUp;

// import React, { useState } from "react";
// import { Grid, Paper, Typography, Button, TextField } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";

// import AdminIcon from "../assets/2206368.png";
// import PatientIcon from "../assets/Healthcare_characters_vector_6-01.jpg";
// import DoctorIcon from "../assets/46550463-doctor-therapist-medicine-and-health-profession-white-coat-stethoscope-pop-art-retro-style.jpg";
// import HealthStaffIcon from "../assets/couple-of-medical-staff-healthcare-workers-vector.jpg";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     if (!selectedRole) {
//       setError("Please select a role first");
//       return;
//     }

//     try {
//       const loginUrl =
//         selectedRole === "Doctor"
//           ? "http://localhost:5000/api/login/doctor"
//           : selectedRole === "Admin"
//           ? "http://localhost:5000/api/login/admin"
//           : selectedRole === "Health Staff"
//           ? "http://localhost:5000/api/login/health-staff"
//           : "http://localhost:5000/api/login";

//       const response = await fetch(loginUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const token = data.token;

//         console.log("JWT Token:", token);

//         localStorage.setItem("jwtToken", token);

//         if (selectedRole === "Admin") {
//           navigate("/admin-dashboard");
//         } else if (selectedRole === "Doctor") {
//           navigate("/doctor-dashboard");
//         } else if (selectedRole === "Patient") {
//           navigate("/patient-dashboard");
//         } else if (selectedRole === "Health Staff") {
//           navigate("/health-staff-dashboard");
//         }
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   };

//   const handleRegister = () => {
//     if (selectedRole === "Patient") {
//       navigate("/register");
//     } else {
//       // Handle if no role is selected
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         height: "100vh",
//         background: "linear-gradient(#FF7F50, #fff6e4, #006400)",
//       }}
//     >
//       <Paper
//         sx={{
//           padding: "20px",
//           border: "2px solid #006400",
//           borderRadius: "20px",
//           backgroundColor: "#fff6e4",
//           marginRight: "20px",
//           width: "300px",
//           textAlign: "center",
//         }}
//       >
//         <Typography variant="h6" style={{ marginBottom: "10px" }}>
//           Proceed as:
//         </Typography>
//         <Button
//           variant="outlined"
//           onClick={() => setSelectedRole("Admin")}
//           style={{
//             margin: "0 10px",
//             padding: "10px",
//             width: "120px",
//             height: "150px",
//             backgroundColor: selectedRole === "Admin" ? "#ADD8E6" : "inherit",
//           }}
//         >
//           <img
//             src={AdminIcon}
//             alt="Admin"
//             style={{ width: "100%", height: "80px", marginBottom: "10px" }}
//           />
//           <Typography variant="subtitle1">Admin</Typography>
//         </Button>
//         <Button
//           variant="outlined"
//           onClick={() => setSelectedRole("Patient")}
//           style={{
//             margin: "0 10px",
//             padding: "10px",
//             width: "120px",
//             height: "150px",
//             backgroundColor: selectedRole === "Patient" ? "#ADD8E6" : "inherit",
//           }}
//         >
//           <img
//             src={PatientIcon}
//             alt="Patient"
//             style={{ width: "100%", height: "80px", marginBottom: "10px" }}
//           />
//           <Typography variant="subtitle1">Patient</Typography>
//         </Button>
//         <Button
//           variant="outlined"
//           onClick={() => setSelectedRole("Doctor")}
//           style={{
//             margin: "0 10px",
//             padding: "10px",
//             width: "120px",
//             height: "150px",
//             backgroundColor: selectedRole === "Doctor" ? "#ADD8E6" : "inherit",
//           }}
//         >
//           <img
//             src={DoctorIcon}
//             alt="Doctor"
//             style={{ width: "100%", height: "80px", marginBottom: "10px" }}
//           />
//           <Typography variant="subtitle1">Doctor</Typography>
//         </Button>
//         <Button
//           variant="outlined"
//           onClick={() => setSelectedRole("Health Staff")}
//           style={{
//             margin: "0 10px",
//             padding: "10px",
//             width: "120px",
//             height: "150px",
//             backgroundColor:
//               selectedRole === "Health Staff" ? "#ADD8E6" : "inherit",
//           }}
//         >
//           <img
//             src={HealthStaffIcon}
//             alt="Health Staff"
//             style={{ width: "100%", height: "80px", marginBottom: "10px" }}
//           />
//           <Typography variant="subtitle1">Health Staff</Typography>
//         </Button>
//       </Paper>

//       <Paper
//         sx={{
//           padding: "20px",
//           border: "2px solid #006400",
//           borderRadius: "20px",
//           backgroundColor: "#fff6e4",
//           width: "300px",
//           textAlign: "center",
//         }}
//       >
//         <Typography variant="h6" style={{ marginBottom: "20px" }}>
//           Login
//         </Typography>
//         <TextField
//           label="Username"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           fullWidth
//           variant="outlined"
//           size="small"
//           style={{ marginBottom: "10px" }}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           variant="outlined"
//           size="small"
//           style={{ marginBottom: "20px" }}
//         />

//         <Button
//           variant="contained"
//           onClick={handleLogin}
//           fullWidth
//           style={{
//             backgroundColor: "green",
//             borderRadius: "8px",
//             color: "white",
//             padding: "10px",
//           }}
//         >
//           Login
//         </Button>

//         <Link
//           to="/forgot-password"
//           style={{ textDecoration: "none", marginTop: "10px" }}
//         >
//           <Typography variant="body2">Forgotten Password?</Typography>
//         </Link>

//         <Button
//           variant="contained"
//           onClick={handleRegister}
//           fullWidth
//           style={{
//             backgroundColor: "white",
//             color: "green",
//             border: "1px solid green",
//             borderRadius: "8px",
//             marginTop: "10px",
//             padding: "10px",
//           }}
//         >
//           Patient Register
//         </Button>

//         {error && (
//           <Typography
//             variant="body1"
//             style={{ color: "red", marginTop: "10px" }}
//           >
//             {error}
//           </Typography>
//         )}
//       </Paper>
//     </div>
//   );
// };

// export default SignUp;
import React, { useState } from "react";
import { Paper, Typography, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

// Placeholder images for buttons
import AdminIcon from "../assets/2206368.png"; // Replace with actual admin icon
import PatientImg from "../assets/PatientImg.jpg"; // Replace with actual patient icon
import DoctorIcon from "../assets/46550463-doctor-therapist-medicine-and-health-profession-white-coat-stethoscope-pop-art-retro-style.jpg"; // Replace with actual doctor icon
import HealthStaffIcon from "../assets/couple-of-medical-staff-healthcare-workers-vector.jpg"; // Replace with actual health staff icon

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState("");

  const roleIcons = {
    Admin: AdminIcon,
    Patient: PatientImg,
    Doctor: DoctorIcon,
    HealthStaff: HealthStaffIcon,
  };

  // const handleLogin = async () => {
  //   if (!selectedRole) {
  //     setError("Please select a role first");
  //     return;
  //   }

  //   try {
  //     const loginUrl = `http://localhost:5000/api/login/${selectedRole.toLowerCase()}`;

  //     const response = await fetch(loginUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       const token = data.token;

  //       console.log("JWT Token:", token);

  //       localStorage.setItem("jwtToken", token);

  //       navigate(`/${selectedRole.toLowerCase()}-dashboard`);
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //   }
  // };
  const handleLogin = async () => {
    if (!selectedRole) {
      setError("Please select a role first");
      return;
    }
    try {
      // Send login request to the backend
      const loginUrl =
        selectedRole === "Doctor"
          ? "http://localhost:5000/api/login/doctor"
          : selectedRole === "Admin"
          ? "http://localhost:5000/api/login/admin"
          : selectedRole === "HealthStaff" // New Health Staff login route
          ? "http://localhost:5000/api/login/health-staff"
          : "http://localhost:5000/api/login"; // Default route for other roles
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Get the JWT token from the response
        const data = await response.json();
        const token = data.token;

        console.log("JWT Token:", token);

        // Store the token securely in local storage
        localStorage.setItem("jwtToken", token);

        // Redirect to the respective dashboard based on the selected role
        if (selectedRole === "Admin") {
          navigate("/admin-dashboard");
        } else if (selectedRole === "Doctor") {
          navigate("/doctor-dashboard");
        } else if (selectedRole === "Patient") {
          navigate("/patient-dashboard");
        } else if (selectedRole === "HealthStaff") {
          
          navigate("/health-staff-dashboard");
        }
      }
      // ... (other error handling)
    } catch (error) {
      // ... (error handling)
    }
  };
 //for new users register option
  const handleRegister = () => {
    if (selectedRole === "Admin") {
      navigate("/admin-registration");
     } else if (selectedRole === "Doctor") {
       navigate("/doctor-registration");
     } else if (selectedRole === "Patient") {
       navigate("/register");
     } else if (selectedRole === "HealthStaff") {
       // Navigate to Health Staff registration
       navigate("/register-health-staff");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(#FF7F50, #fff6e4, #006400)",
      }}
    >
      {/* Image Block */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {roleIcons[selectedRole] && (
          <div
            style={{
              border: "2px solid #006400",
              borderRadius: "50%",
              padding: "10px",
              marginBottom: "10px",
              overflow: "hidden",
              width: "150px",
              height: "150px",
            }}
          >
            <img
              src={roleIcons[selectedRole]}
              alt={selectedRole}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>
        )}
      </div>

      {/* Role Selection Block */}
      <Paper
        sx={{
          padding: "15px", // Adjusted padding
          border: "2px solid #006400",
          borderRadius: "20px",
          backgroundColor: "#fffaf0", // Lighter background color
          margin: "20px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          Select Your Role:
        </Typography>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {[/*"Admin",*/ "Patient", /* "Doctor" */ , "HealthStaff"].map((role) => (
            <Button
              key={role}
              variant="contained"
              onClick={() => setSelectedRole(role)}
              style={{
                padding: "8px", // Smaller padding
                width: "120px", // Increased width
                height: "80px", // Reduced height
                backgroundColor: selectedRole === role ? "#32cd32" : "#87cefa", // Adjusted background color
              }}
            >
              <Typography variant="subtitle1" style={{ margin: "auto" }}>
                {role}
              </Typography>
            </Button>
          ))}
        </div>
      </Paper>

      {/* User ID and Password Block */}
      <Paper
        sx={{
          padding: "15px", // Adjusted padding
          border: "2px solid #006400",
          borderRadius: "20px",
          backgroundColor: "#fffaf0", // Lighter background color
          margin: "20px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" style={{ marginBottom: "20px" }}>
          Login
        </Typography>
        <TextField
          label="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          variant="outlined"
          size="small"
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          variant="outlined"
          size="small"
          style={{ marginBottom: "20px" }}
        />
        <Button
          className="login-button"
          variant="contained"
          onClick={handleLogin}
          fullWidth
          style={{
            backgroundColor: "#32cd32", // Adjusted background color
            borderRadius: "8px",
            color: "white",
            padding: "10px",
          }}
        >
          Login
        </Button>
        <Link
          to="/forgot-password"
          style={{ textDecoration: "none", marginTop: "10px" }}
        >
          <Typography variant="body2">Forgotten Password?</Typography>
        </Link>
        <Button
          className="register-button"
          variant="contained"
          onClick={handleRegister}
          fullWidth
          style={{
            backgroundColor: "#fff",
            color: "#32cd32",
            border: "1px solid #32cd32",
            borderRadius: "8px",
            marginTop: "10px",
            padding: "10px",
          }}
        >
          New User? Then Register
        </Button>
        {error && (
          <Typography
            variant="body1"
            style={{ color: "red", marginTop: "10px" }}
          >
            {error}
          </Typography>
        )}
      </Paper>
    </div>
  );
};

export default SignUp;

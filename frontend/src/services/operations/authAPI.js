import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlices"
import { setUser } from "../../slices/profileSlice"
import { endpoints } from "../apis"
import {apiConnector} from "../apiConnector"
import {setProgress} from "../../slices/loadingBarSlice"

const {
  SENDOTP_API,
  LOGIN_API,
  SIGNUP_API,
  STAFF_SIGNUP_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints




export function sendOtp({email,accountType, navigate}) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        accountType,
        checkUserPresent: true,
      })
      
      dispatch(setProgress(100));
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error(error?.response?.data?.message)
      dispatch(setProgress(100));
    }
    dispatch(setLoading(false))
    // toast.dismiss(toastId)
  }
}

export function signUp(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  accountType,
  phoneNo,
  dob,
  gender,
  subject_id,
  otp,
  navigate
) {
  return async (dispatch) => {
    console.log("Subject ID: ", subject_id);
    console.log("AccountType: ",accountType);
    const toastId = toast.loading("Loading...");
    const Signup_API = accountType === "Patient" ? SIGNUP_API : STAFF_SIGNUP_API;

    console.log("SIGNUP DATA:", {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      phoneNo,
      dob,
      gender,
      subject_id,
      otp,
    });

    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", Signup_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        phoneNo,
        dob,
        gender,
        subject_id,
        otp,
      });

      console.log("SIGNUP API RESPONSE: ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setProgress(100));
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.error("SIGNUP API ERROR: ", error);
      dispatch(setProgress(100));
      toast.error(error.message || "An error occurred during signup.");
      navigate("/signup");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function login(email, password,accountType, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
        accountType
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      dispatch(setProgress(100))
      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        console.log("Image:",userImage);
      dispatch(setUser({ ...response.data.user, image: userImage }))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      localStorage.setItem("token", JSON.stringify(response.data.token))
     {
      response.data?.user?.role==="Patient"?navigate("/patient-dashboard"):navigate("/health-staff-dashboard");
     } 
    } catch (error) {
      dispatch(setProgress(100))
      console.log("LOGIN API ERROR............", error)
      toast.error(error.response.data.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      })

      console.log("RESETPASSTOKEN RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent")
      setEmailSent(true)
    } catch (error) {
      console.log("RESETPASSTOKEN ERROR............", error)
      toast.error("Failed To Send Reset Email")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function resetPassword(password, confirmPassword, token,setresetComplete) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      console.log("Reset Password Token: ",token);
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      console.log("RESETPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password Reset Successfully")
      setresetComplete(true)
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error("Failed To Reset Password")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}


export function forgotPassword(email,setEmailSent) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      })

      console.log("FORGOTPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        toast.error(response.data.message)
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent");
      setEmailSent(true)
    } catch (error) {
      console.log("FORGOTPASSWORD ERROR............", error)
    }
    // toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}
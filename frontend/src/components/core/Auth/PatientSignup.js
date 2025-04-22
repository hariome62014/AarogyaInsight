import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlices"
import { ACCOUNT_TYPE } from "../../../utils/constants"

import { setProgress } from "../../../slices/loadingBarSlice"

function PatientSignUpForm({accountType,setAccountType}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

//   // PATIENT or COREMEMBER
//   const [accountType, setAccountType] = useState(ACCOUNT_TYPE.PATIENT)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo:"",
    gender:"",
    dob:"",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email,phoneNo,gender,dob, password, confirmPassword } = formData

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
  
    let subject_id = "";
    try {
      // Fetch a unique patient ID from the server
      const subject_idResponse = await fetch(
        "http://localhost:5000/api/generate-patient-id"
      );
      const subject_idJSON = await subject_idResponse.json();
      subject_id = subject_idJSON.subject_id;
  
      if (!subject_id) {
        throw new Error("Failed to generate a valid subject_id");
      }
  
      console.log("subject_id", subject_id);
  
      // Prepare the registration data
      const formData = {
        email,
        password,
        firstName,
        lastName,
        dob,
        gender,
        phoneNo,
        subject_id,
      };
  
     
    } catch (error) {
      console.error("An error occurred during registration:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  
    // Prepare signup data
    const signupData = {
      firstName,
      lastName,
      email,
      phoneNo,
      gender,
      dob,
      password,
      confirmPassword,
      subject_id,
      accountType,
    };
  
    // Setting signup data to state for OTP verification
    dispatch(setSignupData(signupData));

    console.log("accountType==",accountType);
  
    // Send OTP to user for verification
    dispatch(sendOtp({email,accountType,navigate}));
  
    // Reset form data
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      gender: "",
      dob: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.PATIENT);
  };
  

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Patient",
      type: ACCOUNT_TYPE.PATIENT,
    },
    {
      id: 2,
      tabName: "Core Member",
      type: ACCOUNT_TYPE.COREMEMBER,
    },
  ]

  return (
    <div>
    
      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-2">
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
          </label>
        </div>
        <div className="flex gap-x-4">
        <label>
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
          />
        </label>

        <label>
  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
    Phone Number <sup className="text-pink-200">*</sup>
  </p>
  <input
    required
    type="tel"
    name="phoneNo"
    value={phoneNo}
    onChange={handleOnChange}
    placeholder="Enter your Phone no"
    pattern="[0-9]{10}" // Optional: Ensure only 10-digit numbers
    style={{
      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
    }}
    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
  />
</label>

        </div>

        
        <div className="flex gap-x-4">

<label className="w-full">
  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
    Gender <sup className="text-pink-200">*</sup>
  </p>
  <select
    required
    name="gender"
    value={gender}
    onChange={handleOnChange}
    style={{
      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
    }}
    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
  >
    <option value="" disabled>
      Select your Gender
    </option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
</label>

<label className="w-full">
  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
    Date of Birth <sup className="text-pink-200">*</sup>
  </p>
  <input
    required
    type="date"
    name="dob"
    value={dob}
    onChange={handleOnChange}
    max={new Date().toISOString().split("T")[0]} // Prevents future dates
    style={{
      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
    }}
    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
  />
</label>

</div>


        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit" onClick={()=>{dispatch(setProgress(60))}}
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default PatientSignUpForm
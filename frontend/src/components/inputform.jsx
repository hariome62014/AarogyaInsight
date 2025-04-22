import React, { useState } from "react";
import backgroundbanner from '../assets/bghome.svg';

const InputForm = () => {
  const [formData, setFormData] = useState({
    subject_id: "",
    hadm_id: "",
    diagnosis: "",
    admission_type: "",
    admission_location: "",
    discharge_location: "",
    age: "",
    insurance: "",
    language: "",
    religion: "",
    marital_status: "",
    ethnicity: "",
    gender: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {
      subject_id: formData.subject_id,
      hadm_id: formData.hadm_id,
      icd_code: formData.diagnosis || "",
      admission_type: formData.admission_type || "",
      admission_location: formData.admission_location || "",
      age: formData.age || 0,
      insurance: formData.insurance || "",
      language: formData.language || "",
      religion: formData.religion || "",
      marital_status: formData.marital_status || "",
      ethnicity: formData.ethnicity || "",
      gender: formData.gender || "",
    };

    try {
      console.log(dataToSend, "Sending data...");
      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      setResult(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Mapping for mortality and length of stay
  const mortalityMapping = {
    0: "Survival rate is high",
    1: "Survival rate is low",
  };

  const lengthOfStayMapping = {
    0: "1 to 3 days",
    1: "4 to 7 days",
    2: "8 to 14 days",
    3: "Greater than 14 days",
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6 bg-white"
      style={{
        backgroundImage: `url(${backgroundbanner})`,
      }}
    >
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Patient Admission Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <input
              type="number"
              name="subject_id"
              value={formData.subject_id}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Subject ID"
            />
            <input
              type="number"
              name="hadm_id"
              value={formData.hadm_id}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="HADM ID"
            />
            {Object.keys(formData)
              .filter((key) => key !== "subject_id" && key !== "hadm_id")
              .map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder={key.replace("_", " ").toUpperCase()}
                />
              ))}
          </div>
          <button
            type="submit"
            className="w-full rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-100 shadow-md transition duration-300 ease-in-out hover:bg-richblack-700 hover:text-white hover:shadow-lg hover:scale-105"
          >
            Submit
          </button>
        </form>
        {result && (
          <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-600 mb-4">Prediction Result</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 font-medium">Mortality Risk {result.mortality}:</span>
                  <span
                    className={`font-semibold ${
                      result.mortality === 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    <span className="text-blue-600 font-semibold">
                    {mortalityMapping[result.mortality]}
                    </span>
                  </span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 font-medium">Length of Stay {result.length_of_stay}:</span>
                  <span className="text-blue-600 font-semibold">
                    {lengthOfStayMapping[result.length_of_stay]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputForm;



// import React, { useState } from "react";
// import backgroundbanner from "../assets/bghome.svg";

// const InputForm = () => {
//   const [formData, setFormData] = useState({
//     subject_id: "",
//     hadm_id: "",
//     diagnosis: "",
//     admission_type: "",
//     admission_location: "",
//     age: "",
//     insurance: "",
//     ethnicity: "",
//   });

//   const [result, setResult] = useState(null);
//   const [errors, setErrors] = useState({});

//   const requiredFields = [
//     "subject_id",
//     "hadm_id",
//     "diagnosis",
//     "admission_type",
//     "admission_location",
//     "age",
//     "insurance",
//     "ethnicity",
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));

//     // Clear error message when input changes
//     if (value.trim() !== "") {
//       setErrors((prevErrors) => {
//         const updatedErrors = { ...prevErrors };
//         delete updatedErrors[name];
//         return updatedErrors;
//       });
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Check required fields
//     const newErrors = {};
//     requiredFields.forEach((field) => {
//       if (!formData[field].trim()) {
//         newErrors[field] = "This field is required";
//       }
//     });

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     const dataToSend = { ...formData };

//     try {
//       console.log(dataToSend, "Sending data...");
//       const response = await fetch("http://localhost:8000/predict/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(dataToSend),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log("Success:", result);
//       setResult(result);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6 bg-white"
//       style={{
//         backgroundImage: `url(${backgroundbanner})`,
//       }}
//     >
//       <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
//           Patient Admission Form
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 gap-4">
//             {Object.keys(formData).map((key) => (
//               <div key={key} className="relative">
//                 <label className="block text-sm font-medium text-gray-700">
//                   {key.replace("_", " ").toUpperCase()}
//                   {requiredFields.includes(key) && (
//                     <span className="text-red-600">*</span>
//                   )}
//                 </label>
//                 <input
//                   type={key === "age" ? "number" : "text"}
//                   name={key}
//                   value={formData[key]}
//                   onChange={handleChange}
//                   className={`border ${
//                     errors[key]
//                       ? "border-red-500"
//                       : "border-gray-300 focus:ring-blue-500"
//                   } rounded-lg p-3 focus:ring-2 focus:outline-none w-full`}
//                   placeholder={`Enter ${key.replace("_", " ")}`}
//                 />
//                 {errors[key] && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors[key]}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>
//           <button
//             type="submit"
//             className="w-full rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-100 shadow-md transition duration-300 ease-in-out hover:bg-richblack-700 hover:text-white hover:shadow-lg hover:scale-105"
//           >
//             Submit
//           </button>
//         </form>
//         {result && (
//           <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
//             <h2 className="text-lg font-semibold text-blue-600 mb-4">
//               Prediction Result
//             </h2>
//             <div className="space-y-4">
//               <div className="bg-white p-4 rounded-lg shadow-sm">
//                 <div className="flex items-center space-x-2">
//                   <span className="text-gray-700 font-medium">
//                     Mortality Risk {result.mortality}:
//                   </span>
//                   <span
//                     className={`font-semibold ${
//                       result.mortality === 0 ? "text-red-600" : "text-green-600"
//                     }`}
//                   >
//                     High Risk
//                   </span>
//                 </div>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow-sm">
//                 <div className="flex items-center space-x-2">
//                   <span className="text-gray-700 font-medium">
//                     Length of Stay {result.length_of_stay}:
//                   </span>
//                   <span className="text-blue-600 font-semibold">
//                     {result.length_of_stay}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InputForm;

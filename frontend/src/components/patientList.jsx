import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";



const PatientList = () => {
  const [admissions, setAdmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    fetch("http://localhost:5000/api/dashboard/health-staff/patients", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAdmissions(data);
      });
  }, []);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalPages = Math.ceil(admissions.length / rowsPerPage);
  const displayedAdmissions = admissions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const openform = ()=>{
    navigate("../input-form")
  }

  return (
    <div className="container mx-auto pt-4">
      <h1 className="text-2xl font-bold mb-4">Patient Data with prediction</h1>
      <div className=" m-4">
        <button
          onClick={openform }
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
        >
          Predict for new patient
        </button>        
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="text-left px-4 py-2">Subject ID</th>
            <th className="text-left px-4 py-2">HADM ID</th>
            <th className="text-left px-4 py-2">Admit Time</th>
            <th className="text-left px-4 py-2">Discharge Time</th>
            <th className="text-left px-4 py-2">Admission Type</th>
            <th className="text-left px-4 py-2">Insurance</th>
            <th className="text-left px-4 py-2">Race</th>
            <th className="text-left px-4 py-2">Admission Location</th>
            <th className="text-left px-4 py-2">Discharge Location</th>
            <th className="text-left px-4 py-2">Diagnosis</th>
            <th className="text-left px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedAdmissions.map((admission) => (
            <tr key={admission.hadm_id} className="border-b">
              <td className="px-4 py-2">{admission.subject_id}</td>
              <td className="px-4 py-2">{admission.hadm_id}</td>
              <td className="px-4 py-2">{formatDateTime(admission.admittime)}</td>
              <td className="px-4 py-2">{formatDateTime(admission.dischtime)}</td>
              <td className="px-4 py-2">{admission.admission_type}</td>
              <td className="px-4 py-2">{admission.insurance}</td>
              <td className="px-4 py-2">{admission.race}</td>
              <td className="px-4 py-2">{admission.admission_location}</td>
              <td className="px-4 py-2">{admission.discharge_location}</td>
              <td className="px-4 py-2">{admission.diagnosis}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => console.log(`Predict for ${admission.hadm_id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                >
                  Predict
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PatientList;

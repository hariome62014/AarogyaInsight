// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import backgroundbanner from "../assets/bghome.svg";

// // const ReportsText = () => {
// //   const [columns, setColumns] = useState([]);
// //   const [predictions, setPredictions] = useState({});
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const [inputPage, setInputPage] = useState("");
// //   const [expandedRows, setExpandedRows] = useState({});
// //   const rowsPerPage = 10;

// //   const fetchPageData = async (page) => {
// //     try {
// //       const token = localStorage.getItem("jwtToken");
// //       const response = await fetch(
// //         `http://localhost:5000/api/dashboard/health-staff/reports?page=${page}&limit=${rowsPerPage}`,
// //         {
// //           method: "GET",
// //           headers: {
// //             Authorization: token,
// //           },
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const data = await response.json();
// //       setColumns(data.items);
// //       setTotalPages(data.totalPages);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     }
// //   };

// //   const toggleRowExpansion = (id) => {
// //     setExpandedRows((prev) => ({
// //       ...prev,
// //       [id]: !prev[id],
// //     }));
// //   };

// //   const handleNextPage = () => {
// //     if (currentPage < totalPages) {
// //       setCurrentPage((prev) => prev + 1);
// //       setInputPage("");
// //     }
// //   };

// //   const handlePreviousPage = () => {
// //     if (currentPage > 1) {
// //       setCurrentPage((prev) => prev - 1);
// //       setInputPage("");
// //     }
// //   };

// //   const handlePageJump = () => {
// //     const page = parseInt(inputPage, 10);
// //     if (!isNaN(page) && page > 0 && page <= totalPages) {
// //       setCurrentPage(page);
// //     } else {
// //       console.error("Invalid page number.");
// //     }
// //   };

// //   const handlePredict = async (data, id) => {
// //     const send = { text: data };
// //     try {
// //       const response = await fetch("http://localhost:8000/predict_txt/", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(send),
// //       });

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const result = await response.json();
// //       setPredictions((prev) => ({
// //         ...prev,
// //         [id]: `${result.mortality}: survival rate is ${
// //           result.mortality === 1 ? "low" : "high"
// //         }, ${result.length_of_stay}: Patient will stay in hospital for ${
// //           result.length_of_stay
// //         }`,
// //       }));
// //     } catch (error) {
// //       console.error("Error predicting:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPageData(currentPage);
// //   }, [currentPage]);

// //   const navigate = useNavigate();
// //   const navNewForm = () => {
// //     navigate("../text-form");
// //   };

// //   return (
// //     <div
// //       className="w-full mx-auto mt-16 p-6 bg-white min-h-screen"
// //       style={{
// //         backgroundImage: `url(${backgroundbanner})`,
// //       }}
// //     >
// //       <div className="w-10/12 mx-auto">
// //         <div className="flex justify-end mb-4">
// //           <button
// //             onClick={navNewForm}
// //             className="rounded-[8px] border text-richblack-25 border-richblack-700 bg-richblack-800 px-[12px] py-[7px]  shadow-md transition duration-300 ease-in-out hover:bg-richblack-700 hover:text-white hover:shadow-lg hover:scale-105"
// //           >
// //             Predict for New Patient
// //           </button>
// //         </div>
// //         <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
// //           <table className="w-full table-auto">
// //             <thead className="bg-blue-600 text-black"
// //              style={{
// //                 backgroundColor: '#f2fafe', // Light color for the background
// //               }}
// //               >
// //               <tr>
// //                 {["ID", "Text", "Prediction", "Action"].map((header, index) => (
// //                   <th key={index} className="px-4 py-2 text-left"
// //                   style={{
// //                     borderRight: "3px solid white", // Narrow white gap
// //                     borderTop: "3px solid #b0c4de", // Slightly visible border on top
// //                   }}
// //                   >
// //                     {header}
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {columns.length > 0 ? (
// //                 columns.map((column,index) => (
// //                   <tr
// //                     key={column.id}
// //                     className="border-b border-gray-300 border-opacity-75 hover:bg-gray-100 text-sm leading-tight transition-all duration-300 ease-in-out hover:translate-y-1 hover:shadow-lg"
// //         style={{
// //           borderBottomWidth: "2px", // Slightly thicker
// //           borderBottomColor: "#d1d5db", // Light gray
// //           borderBottomStyle: "solid", // Ensures visibility
// //         }}
// //                   >
// //                     <td className="px-4 py-2">{column.id}</td>
// //                     <td className="px-4 py-2">
// //                       {expandedRows[column.id]
// //                         ? column.text
// //                         : `${column.text.substring(0, 200)}...`}
// //                       <button
// //                         onClick={() => toggleRowExpansion(column.id)}
// //                         className="ml-2 text-blue-600 hover:underline"
// //                       >
// //                         {expandedRows[column.id] ? "Show Less" : "Show More"}
// //                       </button>
// //                     </td>
// //                     <td className="px-4 py-2">
// //                       {predictions[column.id] || "No prediction yet"}
// //                     </td>
// //                     <td className="px-4 py-2">
// //                       <button
// //                         onClick={() => handlePredict(column.text, column.id)}
// //                         className="rounded-[8px] border text-richblack-25 border-richblack-700 bg-richblack-800 px-[12px] py-[7px]  shadow-md transition duration-300 ease-in-out hover:bg-richblack-700 hover:text-white hover:shadow-lg hover:scale-105"
// //                       >
// //                         Predict
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td
// //                     colSpan={4}
// //                     className="px-4 py-2 text-center text-gray-500"
// //                   >
// //                     No data available
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //         <div className="flex justify-between items-center mt-6">
// //           <div className="flex items-center">
// //             <button
// //               onClick={handlePreviousPage}
// //               disabled={currentPage === 1}
// //               className={`px-4 py-2 rounded-lg ${
// //                 currentPage === 1
// //                   ? "bg-gray-300 cursor-not-allowed"
// //                   : "bg-blue-600 text-white hover:bg-blue-700"
// //               }`}
// //             >
// //               Previous
// //             </button>
// //             <button
// //               onClick={handleNextPage}
// //               disabled={currentPage === totalPages}
// //               className={`ml-2 px-4 py-2 rounded-lg ${
// //                 currentPage === totalPages
// //                   ? "bg-gray-300 cursor-not-allowed"
// //                   : "bg-blue-600 text-white hover:bg-blue-700"
// //               }`}
// //             >
// //               Next
// //             </button>
// //           </div>
// //           <div className="flex items-center">
// //             <input
// //               type="number"
// //               value={inputPage}
// //               onChange={(e) => setInputPage(e.target.value)}
// //               className="w-16 px-2 py-1 border rounded"
// //               placeholder="Page"
// //             />
// //             <button
// //               onClick={handlePageJump}
// //               className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// //             >
// //               Go
// //             </button>
// //           </div>
// //           <div className="text-right">
// //              {currentPage} / {totalPages}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReportsText;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundbanner from "../assets/bghome.svg";
import { setSelectedSearchQuery2 } from "../slices/searchQuerySlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const ReportsText = () => {
  const [columns, setColumns] = useState([
    { id: 1, text: "Column 1" },
  ]);
  const [predictions, setPredictions] = useState({});
  const [predictionVisibility, setPredictionVisibility] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [expandedRows, setExpandedRows] = useState({});

  const searchQuery = useSelector(state => state.searchquery.selectedSearchQuery2);
  const dispatch = useDispatch();

  const rowsPerPage = 10;

  const fetchPageData = async (page) => {
    try {
      const token = localStorage.getItem("jwtToken");

      const params = new URLSearchParams({
        page: page,
        limit: rowsPerPage,
      });

      if (searchQuery && !isNaN(searchQuery)) {
        params.append("searchQuery", searchQuery);
      }

      const response = await fetch(
        `http://localhost:5000/api/dashboard/health-staff/reports?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setColumns(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleRowExpansion = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setInputPage("");
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setInputPage("");
    }
  };

  const handlePageJump = () => {
    const page = parseInt(inputPage, 10);
    if (!isNaN(page) && page > 0 && page <= totalPages) {
      setCurrentPage(page);
    } else {
      console.error("Invalid page number.");
    }
  };

  const handleSearchChange = (event) => {
    dispatch(setSelectedSearchQuery2(event.target.value));
    setCurrentPage(1);
  };

  const handleSubmit_test = async (data) => {
    try {
      console.log(data, "ye bhej raha hu")
      const response = await fetch('http://localhost:8000/predict_txt/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);
      return result
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const mapping = {
    0: "1 to 3 days",
    1: "4 to 7 days",
    2: "8 to 14 days",
    3: "greater than 14 days",
  }

  const mapping2 = {
    1: "less",
    0: "high",
  }

  const handlePredict = async (data, id) => {
    if (predictionVisibility[id]) {
      setPredictionVisibility((prev) => ({
        ...prev,
        [id]: false,
      }));
    } else {
      const send = { "text": data };
      const response = await handleSubmit_test(send);
      console.log("RecievedData:", response);
      setPredictions((prev) => ({
        ...prev,
        [id]: (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 mr-2">Mortality:</span>
                <span className="text-blue-600">
                  {response.mortality} - Survival rate is{" "}
                  <strong className="text-green-600">
                    {mapping2[response.mortality]}
                  </strong>
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 mr-2">Length of Stay:</span>
                <span className="text-blue-600">
                  {response.length_of_stay} - Patient will stay in hospital for{" "}
                  <strong className="text-green-600">
                    {mapping[response.length_of_stay]}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        ),
      }));
      setPredictionVisibility((prev) => ({
        ...prev,
        [id]: true,
      }));
    }
  };

  useEffect(() => {
    fetchPageData(currentPage);
  }, [currentPage, searchQuery]);

  const navigate = useNavigate();
  const navNewForm = () => {
    navigate("../text-form");
  };

  return (
    <div
      className="w-full mx-auto mt-16 p-6 bg-white min-h-screen"
      style={{
        backgroundImage: `url(${backgroundbanner})`,
      }}
    >
      <div className="w-10/12 mx-auto">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by ID"
            className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={navNewForm}
            className="rounded-[8px] border text-richblack-25 border-richblack-700 bg-richblack-800 px-[12px] py-[7px]  shadow-md transition duration-300 ease-in-out hover:bg-richblack-700 hover:text-white hover:shadow-lg hover:scale-105"
          >
            Predict for New Patient
          </button>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full table-auto">
            <thead className="bg-blue-600 text-black"
              style={{
                backgroundColor: '#f2fafe',
              }}
            >
              <tr>
                {["ID", "Text", "Prediction", "Action"].map((header, index) => (
                  <th key={index} className="px-4 py-2 text-left"
                    style={{
                      borderRight: "3px solid white",
                      borderTop: "3px solid #b0c4de",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {columns.length > 0 ? (
                columns.map((column, index) => (
                  <tr
                    key={column.id}
                    className="border-b border-gray-300 border-opacity-75 hover:bg-gray-100 text-sm leading-tight transition-all duration-300 ease-in-out hover:translate-y-1 hover:shadow-lg"
                    style={{
                      borderBottomWidth: "2px",
                      borderBottomColor: "#d1d5db",
                    }}
                  >
                    <td className="px-4 py-2">{column.id}</td>
                    <td className="px-4 py-2">
                      {expandedRows[column.id]
                        ? column.text
                        : `${column.text.substring(0, 200)}...`}
                      <button
                        onClick={() => toggleRowExpansion(column.id)}
                        className="ml-2 text-blue-600 hover:underline"
                      >
                        {expandedRows[column.id] ? "Show Less" : "Show More"}
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      {predictionVisibility[column.id] ? predictions[column.id] : "No prediction yet"}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handlePredict(column.text, column.id)}
                        className="rounded-[8px] border text-richblack-25 border-richblack-700 bg-richblack-800 px-[12px] py-[7px]  shadow-md transition duration-300 ease-in-out hover:bg-richblack-700 hover:text-white hover:shadow-lg hover:scale-105"
                      >
                        {predictionVisibility[column.id] ? "Hide Prediction" : "Predict"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`ml-2 px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              className="w-16 px-2 py-1 border rounded"
              placeholder="Page"
            />
            <button
              onClick={handlePageJump}
              className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go
            </button>
          </div>
          <div className="text-right">
            {currentPage} / {totalPages}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsText;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';


// const Reports_text = () => {
//     const [columns, setColumns] = useState([
//         { id: 1, text: "Column 1" },
//     ]);
//     const [predictions, setPredictions] = useState({});
//     const [currentPage, setCurrentPage] = useState(1);
//     const rowsPerPage = 5;

//     const totalPages = Math.ceil(columns.length / rowsPerPage);
//     const displayedColumns = columns.slice(
//         (currentPage - 1) * rowsPerPage,
//         currentPage * rowsPerPage
//     );

//     const handleSubmit_test = async (data) => {

//         try {
//             console.log(data, "ye bhej raha hu")
//             const response = await fetch('http://localhost:8000/predict_txt/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const result = await response.json();
//             console.log('Success:', result);
//             return result
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const mapping = {
//         0: "1 to 3 days",
//         1: "4 to 7 days",
//         2: "8 to 14 days",
//         3: "greater than 14 days",
//     }

//     const mapping2 = {
//         1: "less",
//         0: "high",
//     }

//     const handlePredict = async (data, id) => {
//         const send = { "text": data }
//         const response = await handleSubmit_test(send);
//         // Mock prediction result
//         setPredictions((prev) => ({
//             ...prev,
//             // write whatever you want to show 
//             [id]:  `${response.mortality} : survival rate is ${mapping2[response.mortality]} ,
//             ${response.length_of_stay} : Patient will stay in hospital for ${mapping[response.length_of_stay]}` 

//     }));
// };

// const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
// };

// const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
// };

// useEffect(() => {
//     const token = localStorage.getItem("jwtToken");

//     fetch("http://localhost:5000/api/dashboard/health-staff/reports", {
//         method: "GET",
//         headers: {
//             Authorization: token,
//         },
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             setColumns(data);
//         });
// }, []);
// const navigate = useNavigate();
// const nav_new_form = () => {
//     navigate("../text-form");
// }

// return (
//     <div className="container mx-auto pt-4">
//         <h1 className="text-2xl font-bold mb-4">Column Data with Predictions</h1>
//         <button className=" m-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors" onClick={nav_new_form}>predict for new patient</button>
//         <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//             <thead className="bg-gray-800 text-white">
//                 <tr>
//                     <th className="text-left px-4 py-2">ID</th>
//                     <th className="text-left px-4 py-2">Text</th>
//                     <th className="text-left px-4 py-2">Action</th>
//                     <th className="text-left px-4 py-2">Prediction</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {displayedColumns.map((column) => (
//                     <tr key={column.id} className="border-b">
//                         <td className="px-4 py-2">{column.id}</td>
//                         <td className="px-4 py-2">{column.text}</td>
//                         <td className="px-4 py-2">
//                             <button
//                                 onClick={() => handlePredict(column.text, column.id)}
//                                 className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
//                             >
//                                 Predict
//                             </button>
//                         </td>
//                         <td className="px-4 py-2">
//                             {predictions[column.id] || "No prediction yet"}
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//         <div className="flex justify-between mt-4">
//             <button
//                 onClick={handlePreviousPage}
//                 disabled={currentPage === 1}
//                 className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
//             >
//                 Previous
//             </button>
//             <p>
//                 Page {currentPage} of {totalPages}
//             </p>
//             <button
//                 onClick={handleNextPage}
//                 disabled={currentPage === totalPages}
//                 className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
//             >
//                 Next
//             </button>
//         </div>
//     </div>
// );
// };

// export default Reports_text;

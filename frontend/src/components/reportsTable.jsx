import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const Reports_text = () => {
    const [columns, setColumns] = useState([
        { id: 1, text: "Column 1" },
    ]);
    const [predictions, setPredictions] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const totalPages = Math.ceil(columns.length / rowsPerPage);
    const displayedColumns = columns.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleSubmit_test = async (data) => {        

        try {
            console.log(data , "ye bhej raha hu")
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

    const handlePredict = async ( data , id ) => {
        const send = {"text": data }
        const response = await handleSubmit_test( send );
        // Mock prediction result
        setPredictions((prev) => ({
            ...prev,
            [id]: response ,
        }));
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");

        fetch("http://localhost:5000/api/dashboard/health-staff/reports", {
            method: "GET",
            headers: {
                Authorization: token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setColumns(data);
            });
    }, []);
    const navigate = useNavigate();
    const nav_new_form = ()=>{
        navigate("../text-form");
    }

    return (
        <div className="container mx-auto pt-4">
            <h1 className="text-2xl font-bold mb-4">Column Data with Predictions</h1>
            <button className=" m-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors" onClick={nav_new_form}>predict for new patient</button>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="text-left px-4 py-2">ID</th>
                        <th className="text-left px-4 py-2">Text</th>
                        <th className="text-left px-4 py-2">Action</th>
                        <th className="text-left px-4 py-2">Prediction</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedColumns.map((column) => (
                        <tr key={column.id} className="border-b">
                            <td className="px-4 py-2">{column.id}</td>
                            <td className="px-4 py-2">{column.text}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => handlePredict(column.text , column.id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                                >
                                    Predict
                                </button>
                            </td>
                            <td className="px-4 py-2">
                                {predictions[column.id] || "No prediction yet"}
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

export default Reports_text;

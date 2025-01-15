import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState({
    totalAdmissions: 0,
    totalDischarged: 0,
    totalDeceased: 0,
    raceDistribution: [],
    insuranceDistribution: [],
    genderCount: [], // Add genderCount to state
  });

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    fetch("http://localhost:5000/api/dashboard/health-staff/analytics", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "analytics data");
        setAnalytics(data);
      });
  }, []);

  const raceData = {
    labels: analytics.raceDistribution.map((item) => item._id),
    datasets: [
      {
        data: analytics.raceDistribution.map((item) => item.count),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"],
      },
    ],
  };

  const insuranceData = {
    labels: analytics.insuranceDistribution.map((item) => item._id),
    datasets: [
      {
        data: analytics.insuranceDistribution.map((item) => item.count),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"],
      },
    ],
  };

  const genderData = {
    labels: analytics.genderCount.map((item) => item._id),
    datasets: [
      {
        data: analytics.genderCount.map((item) => item.count),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
      },
    ],
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Admissions Analytics</h1>

        <div className="flex flex-wrap justify-around gap-4 mb-6">
          {/* Analytics Cards */}
          <div className="w-40 h-28 bg-blue-100 shadow-md rounded-lg flex flex-col items-center justify-center text-blue-800">
            <h2 className="text-lg font-semibold">Admissions</h2>
            <p className="text-2xl font-bold">{analytics.totalAdmissions}</p>
          </div>
          <div className="w-40 h-28 bg-green-100 shadow-md rounded-lg flex flex-col items-center justify-center text-green-800">
            <h2 className="text-lg font-semibold">Discharged</h2>
            <p className="text-2xl font-bold">{analytics.totalDischarged}</p>
          </div>
          <div className="w-40 h-28 bg-red-100 shadow-md rounded-lg flex flex-col items-center justify-center text-red-800">
            <h2 className="text-lg font-semibold">Deceased</h2>
            <p className="text-2xl font-bold">{analytics.totalDeceased}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Race Distribution */}
          <div className="bg-gray-50 p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Race Distribution</h2>
            <Pie data={raceData} />
          </div>

          {/* Insurance Distribution */}
          <div className="bg-gray-50 p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Insurance Distribution</h2>
            <Pie data={insuranceData} />
          </div>

          {/* Gender Distribution */}
          <div className="bg-gray-50 p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Gender Distribution</h2>
            <Pie data={genderData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

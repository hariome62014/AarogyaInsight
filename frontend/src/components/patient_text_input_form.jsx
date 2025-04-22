import React, { useState } from 'react';
import backgroundbanner from '../assets/bghome.svg';

const PatientTextInput = () => {
    const [inputText, setInputText] = useState('');
    const [mortalityResult, setMortalityResult] = useState(null);
    const [stayResult, setStayResult] = useState(null);

    const lengthOfStayMapping = {
        0: "1 to 3 days",
        1: "4 to 7 days",
        2: "8 to 14 days",
        3: "greater than 14 days",
    };

    const survivalRateMapping = {
        1: "less",
        0: "high",
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = { text: inputText };

        try {
            const response = await fetch('http://localhost:8000/predict_txt/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setMortalityResult(
                `Mortality (${result.mortality}): Survival rate is ${survivalRateMapping[result.mortality]}`
            );
            setStayResult(
                `Length of Stay (${result.length_of_stay}): Patient will stay for ${lengthOfStayMapping[result.length_of_stay]}`
            );
        } catch (error) {
            console.error('Error fetching prediction:', error);
        }
    };

    return (
        <div
            className="w-full h-screen flex items-center justify-center bg-white"
            style={{ backgroundImage: `url(${backgroundbanner})` }}
        >
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Patient Text Input
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <textarea
                        className="border rounded p-4 w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter patient text data here..."
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Submit
                    </button>
                </form>

                {(mortalityResult || stayResult) && (
                    <div className="mt-6 p-4 border rounded bg-gray-100">
                        <h2 className="text-lg font-semibold mb-2">Results:</h2>
                        {mortalityResult && <p className="text-gray-700">{mortalityResult}</p>}
                        {stayResult && <p className="text-gray-700 mt-2">{stayResult}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientTextInput;

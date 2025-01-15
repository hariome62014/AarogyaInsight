import React, { useState } from 'react';

const PatientTextInput = () => {
    const [inputText, setInputText] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = { text: inputText };
        try {
            console.log(data, "ye bhej raha hu");
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
            setResult(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Text Data for Patient</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <textarea
                    className="border rounded p-2 w-full"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter patient text data here..."
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
            {result && (
                <div className="mt-4 p-4 border rounded bg-gray-100">
                    <h2 className="text-lg font-semibold">Result:</h2>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default PatientTextInput;

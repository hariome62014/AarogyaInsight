import React, { useState } from 'react';

const InputForm = () => {
    const [formData, setFormData] = useState({
        subject_id: '',
        hadm_id: '',
        icd_code: '',
        admission_type: '',
        admission_location: '',
        discharge_location: '',
        insurance: '',
        language: '',
        religion: '',
        marital_status: '',
        ethnicity: '',
        gender: ''
    });
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Ensure subject_id and hadm_id are numbers
        const dataToSend = {
            ...formData,
            subject_id: Number(formData.subject_id),
            hadm_id: Number(formData.hadm_id)
        };

        try {
            console.log(dataToSend, "ye bhej raha hu");
            const response = await fetch('http://localhost:8000/predict/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
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
            <h1 className="text-xl font-bold mb-4">Patient Admission Form</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                    type="number"
                    name="subject_id"
                    value={formData.subject_id}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                    placeholder="SUBJECT ID"
                />
                <input
                    type="number"
                    name="hadm_id"
                    value={formData.hadm_id}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                    placeholder="HADM ID"
                />
                {Object.keys(formData).filter(key => key !== 'subject_id' && key !== 'hadm_id').map((key) => (
                    <input
                        key={key}
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                        placeholder={key.replace('_', ' ').toUpperCase()}
                    />
                ))}
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

export default InputForm;

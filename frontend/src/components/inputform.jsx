// InputForm.js
import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InputForm() {
    const [formData, setFormData] = useState({
        actual_age: '',
        admission_hour: '',
        admission_day_of_week: '',
        gender: '',
        admission_type: '',
        admission_location: '',
        discharge_location: '',
        insurance: '',
        marital_status: '',
        race: ''
    });
    const [predictions, setPredictions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setPredictions(null);

        try {
            // axios nii h abhi , fetch se kar sakte  ya npm install



            // const response = await axios.post('http://localhost:5001/predict', formData);
            // setPredictions({
            //     mortalityPrediction: response.data.mortalityPrediction,
            //     losPrediction: response.data.losPrediction
            // });
        } catch (error) {
            console.error("Prediction error:", error);
            setError('Prediction failed. Please check your input data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Enter Details for Prediction</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {Object.keys(formData).map((field) => (
                    <div key={field} className="flex flex-col">
                        <label className="text-gray-700 font-semibold">
                            {field.replace(/_/g, ' ')}
                        </label>
                        <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    {loading ? 'Predicting...' : 'Submit'}
                </button>
            </form>

            {error && <p className="mt-4 text-center text-red-500">{error}</p>}

            {predictions && (
                <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg font-bold mb-2">Prediction Results</h2>
                    <p>Mortality Prediction: {predictions.mortalityPrediction}</p>
                    <p>Length of Stay Prediction: {predictions.losPrediction} days</p>
                </div>
            )}

            <button
                onClick={() => navigate('/')}
                className="mt-6 w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
            >
                Back to Dataset
            </button>
        </div>
    );
}

export default InputForm;
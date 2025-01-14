from flask import Flask, request, jsonify
import torch
import numpy as np

app = Flask(__name__)

# Load your PyTorch model
model_path = (r'C:\Users\dassa\Downloads\iitp_healthchain_docker\iitp_healthchain_docker\server\model_ihm_prob.pt')  # Replace with the path to your PyTorch model
model = torch.load(model_path, map_location=torch.device('cpu'))  # Load the model

# Define model inference function
def predict(data):
    # Preprocess input data if necessary (convert to tensor, normalize, etc.)
    input_tensor = torch.tensor(data).float()
    
    # Ensure model is in evaluation mode
    model.eval()
    
    # Perform prediction
    with torch.no_grad():
        output = model(input_tensor)
    
    # Convert output to numpy array or Python list
    prediction = output.numpy()  # Adjust this based on your model's output format
    
    return prediction

# API endpoint for model prediction
@app.route('/api/predict', methods=['POST'])
def predict_api():
    data = request.get_json()  # Assuming input data is sent as JSON
    
    # Prepare input data for prediction
    input_data = np.array(data)  # Adjust based on how your model expects input
    
    # Get model prediction
    prediction = predict(input_data)
    
    # Prepare response as JSON
    response = {'prediction': prediction.tolist()}  # Convert prediction to list if needed
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)  # Run Flask app in debug mode for development

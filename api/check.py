from joblib import load

# Load the scaler
scaler = load('standard_scaler.joblib')

# Get feature names (if available)
feature_names = scaler.feature_names_in_
print("Input features:", feature_names)

# Get number of features
n_features = scaler.n_features_in_
print("Number of features:", n_features)
import os
import pandas as pd
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch_geometric.nn import GATConv
import joblib
import sys
import json
from transformers import BertTokenizer, BertModel
import warnings

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import JSONResponse

warnings.filterwarnings("ignore", category=UserWarning, module="sklearn")


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


class Item(BaseModel):
    subject_id: int
    hadm_id: int
    icd_code: str
    admission_type: str
    admission_location: str
    discharge_location: str
    insurance: str
    language: str
    religion: str
    marital_status: str
    ethnicity: str
    gender: str


class Item2(BaseModel):
    text: str


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


try:
    mortality_model = joblib.load(
        "mortality_model.joblib"
    )
except Exception as e:
    print(json.dumps({"error": f"Failed to load model: {str(e)}"}))
    sys.exit(1)

try:
    los_model = joblib.load(
        "los_model.joblib"
    )
except Exception as e:
    print(json.dumps({"error": f"Failed to load model: {str(e)}"}))
    sys.exit(1)

try:
    tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
    bert_model = BertModel.from_pretrained("bert-base-uncased")
except Exception as e:
    print(json.dumps({"error": f"Failed to load BERT model or tokenizer: {str(e)}"}))
    sys.exit(1)

icd9_codes = pd.read_csv("D_ICD_DIAGNOSES.csv")


class GATModel(nn.Module):
    def __init__(self, in_features, hidden_dim=64, num_heads=2):
        super(GATModel, self).__init__()
        self.conv1 = GATConv(in_features, hidden_dim, heads=num_heads, dropout=0.2)
        self.conv2 = GATConv(hidden_dim * num_heads, hidden_dim, heads=1, dropout=0.2)
        self.mortality_out = nn.Linear(hidden_dim, 1)  # 2 for nll
        self.los_out = nn.Linear(hidden_dim, 1)
        self.dropout = nn.Dropout(0.2)

    def forward(self, x, edge_index):
        # Add safety checks
        assert not torch.isnan(x).any(), "Input features contain NaN values"
        assert not torch.isnan(edge_index).any(), "Edge index contains NaN values"

        x = self.conv1(x, edge_index)
        x = F.relu(x)
        x = self.dropout(x)
        x = self.conv2(x, edge_index)
        x = F.relu(x)

        mortality_pred = F.log_softmax(self.mortality_out(x), dim=1)  # its for nll
        mortality_pred = self.mortality_out(x)  # its for wce
        los_pred = self.los_out(x)
        return mortality_pred, los_pred


# Function to load the saved model
def load_saved_model(device="cuda"):
    save_dir = "."
    model_path = os.path.join(save_dir, "gat_model.pt")

    try:
        # Load the saved model data
        checkpoint = torch.load(model_path, map_location=device)
        # input_dim = checkpoint["input_dim"]
        input_dim = 6847

        # Initialize model with same architecture
        model = GATModel(input_dim).to(device)
        model.load_state_dict(checkpoint["model_state_dict"])

        print(f"Model loaded successfully from {model_path}")
        return model

    except Exception as e:
        print(f"Error loading model: {e}")
        return None


# Function to preprocess text using BERT
def bert_embed(text):
    try:
        encoding = tokenizer(
            text,
            add_special_tokens=True,
            max_length=128,
            padding="max_length",
            truncation=True,
            return_tensors="pt",
        )
        input_ids = encoding["input_ids"]
        attention_mask = encoding["attention_mask"]

        with torch.no_grad():
            output = bert_model(input_ids=input_ids, attention_mask=attention_mask)
            pooled_output = output.pooler_output  # [CLS] token embedding
        return pooled_output.squeeze().numpy()
    except Exception as e:
        raise ValueError(f"Error during text embedding: {str(e)}")


model = load_saved_model(device)
model.eval()


@app.get("/")
def read_root():
    return {"message": "Healthcare Prediction API"}


df = pd.read_csv("empty_df.csv")
scaler = joblib.load("scaler.joblib")


@app.post("/predict/")
def predict(item: Item):
    """
    Make a prediction using the trained model.
    """
    try:
        # print(item)
        # Extract features from the input
        data = df.copy()
        data.loc[0, "subject_id"] = item.subject_id
        data.loc[0, "hadm_id"] = item.hadm_id
        data.loc[0, f"admission_type_{item.admission_type}"] = 1
        data.loc[0, f"admission_location_{item.admission_location}"] = 1
        # data.loc[0, f"discharge_location_{item.discharge_location}"] = 1
        if item.insurance.strip():
            data.loc[0, f"insurance_{item.insurance}"] = 1
        if item.language.strip():
            data.loc[0, f"language_{item.language}"] = 1
        if item.religion.strip():
            data.loc[0, f"religion_{item.religion}"] = 1
        if item.marital_status.strip():
            data.loc[0, f"marital_status_{item.marital_status}"] = 1
        if item.ethnicity.strip():
            data.loc[0, f"ethnicity_{item.ethnicity}"] = 1
        data.loc[0, f"gender_{item.gender}"] = 1
        # print(data)

        # for title in item.icd_code.split(","):
        #     title = title.strip()
        #     icd9_code = f"icd9_{icd9_codes[icd9_codes['SHORT_TITLE'].str.contains(title)]['ICD9_CODE'].values[0]}"
        #     print(icd9_code)
        #     if icd9_code in data.columns:
        #         data.loc[0, icd9_code] = 1
        for title in item.icd_code.split(","):
            title = title.strip()
            try:
                # Attempt to find the ICD9 code in the CSV
                icd9_code = f"icd9_{icd9_codes[icd9_codes['SHORT_TITLE'].str.contains(title)]['ICD9_CODE'].values[0]}"
            except IndexError:
                # If the code is not present, hardcode the icd_code as 20
                icd9_code = "icd9_20"

            print(icd9_code)
            if icd9_code in data.columns:
                data.loc[0, icd9_code] = 1

        

        # Scale the input
        data = scaler.transform(data)

        x = torch.tensor(data, dtype=torch.float32).to(device)
        edge_index = torch.tensor([[0], [0]]).to(device)
        # print(edge_index)
        # print(x.shape)

        with torch.no_grad():
            mortality_logits, los = model(x, edge_index)

        mortality_probs = torch.sigmoid(mortality_logits)
        mortality = (mortality_probs[0] > 0.5).float()

        # mortality, los = 0, 1

        return JSONResponse({"mortality": int(mortality), "length_of_stay": float(los)})
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Invalid input")


@app.post("/predict_txt/")
def predict_txt(item: Item2):
    """
    Make a prediction using the trained model.
    """
    try:
        input_data = bert_embed(item.text)
        input_data = input_data.reshape(1, -1)
        mortality = mortality_model.predict(input_data)

        input_data = bert_embed(item.text)
        input_data = input_data.reshape(1, -1)
        los = los_model.predict(input_data)

        # print(mortality, los)

        return JSONResponse(
            {"mortality": int(mortality[0]), "length_of_stay": float(los[0])}
        )
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Invalid input")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)

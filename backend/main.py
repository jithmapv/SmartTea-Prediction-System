from fastapi import FastAPI, File, UploadFile, Query
from fastapi.middleware.cors import CORSMiddleware
import csv
import codecs
import pandas as pd
from pydantic import BaseModel
from sklearn.preprocessing import MinMaxScaler
import pickle
import numpy as np
from Models.Sales.sales_prediction import SalePredictRqBody, SalesPredModel
import math
from typing import Dict, List

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"msg": "Sales Prediction by Jithma"}

# Sales Prediction
@app.post("/predictions/sales-prediction")
def sales_prediction(body: SalePredictRqBody) -> dict:
    model = SalesPredModel("Models/Sales/model-gb.jlib", "Models/Sales/encoder.jlib")
    res = model.predict(body)
    return res
#trend prediction
model_path = ""
grade_names = ['BM', 'BOP', 'BOP1', 'BOP1A', 'BOPA', 'BOPF', 'BOPSP', 'BP', 'DUST', 'DUST1', 'FBOP', 'FBOP1', 'FBOPF',
               'FBOPF1', 'FBOPFEXSP', 'FBOPFSP', 'GOLDEN_TIP', 'OP', 'OP1', 'OPA', 'PEKOE', 'PEKOE1']
models = {}

for grade in grade_names:
    model_filename = f"Models/Trend/{grade}.pkl"
    with open(model_path + model_filename, 'rb') as model_file:
        models[grade] = pickle.load(model_file)


class InputData(BaseModel):
    data: Dict[str, List[int]]


def get_top_sales_grades(predictions, n=5):
    top_indices = np.argsort(predictions)[-n:]
    return top_indices


@app.post("/trendpredict/")
def trendpredict(item: InputData):

    predictions = {}
    top_predictions={}
    top_grades={}
    n_top_predictions=5

    for grade, values in item.data.items():
        if grade in models:
            model = models[grade]
            prediction = model.predict([values])
            absolute_prediction = abs(prediction[0])
            predictions[grade] = math.ceil(absolute_prediction)

    top_indices=np.argsort(list(predictions.values()))[-n_top_predictions:]
    for index in top_indices:
        grade = list(predictions.keys())[index]
        top_predictions[grade] = predictions[grade]
        top_grades[grade] = predictions[grade]
    return {
        "top_grades": top_grades
    }
    return {"prediction": 9358}

# Inventory
class Item(BaseModel):
    data: list

@app.post("/InventoryPredict/{model_name}")
def InventoryPredict_model(model_name: str, item: Item):
    model_file_path = f"Models/Inventory/{model_name}_model.pkl"
    with open(model_file_path, 'rb') as model_file:
        model = pickle.load(model_file)

    input_data = item.data
    input_data = np.array(input_data).reshape(1, -1)

    prediction = model.predict(input_data)
    prediction[0] = abs(prediction[0])

    return {"prediction": prediction.tolist()}

# Churn Prediction
def churn_preprocess(df):
    df.drop('customerID', axis='columns', inplace=True)
    df.TotalCharges = pd.to_numeric(df.TotalCharges, errors='coerce')  
    yes_no_cols = ["Partner", "Dependents", "Promotion Usage", "PaperlessBilling"]

    for col in yes_no_cols:
        df[col].replace({'Yes': 1, "No": 0}, inplace=True)

    df['gender'].replace({'Female': 1, "Male": 0}, inplace=True)

    encoded_dataframe = pd.get_dummies(data=df, columns=[
                                       "Purchase Channel", "Tea preferences", "Contract", "PaymentMethod",])

    cols_to_scale = ['tenure', 'MonthlyCharges', 'TotalCharges']
    scaler = MinMaxScaler()

    encoded_dataframe[cols_to_scale] = scaler.fit_transform(
        encoded_dataframe[cols_to_scale])

    for col in encoded_dataframe.columns:
        if encoded_dataframe[col].dtype == "bool":
            encoded_dataframe[col] = encoded_dataframe[col].astype(int)
        elif encoded_dataframe[col].dtype == "object":
            encoded_dataframe[col] = pd.to_numeric(encoded_dataframe[col], errors='coerce').fillna(0).astype(int)

    columns_to_ensure = ['Purchase Channel_Online', 'Purchase Channel_Physical Store',
                         'Tea preferences_Black tea', 'Tea preferences_Green tea',
                         'Tea preferences_White tea', 'Contract_Month-to-month',
                         'PaymentMethod_Bank transfer (automatic)',
                         'PaymentMethod_Credit card (automatic)',
                         'PaymentMethod_Electronic check', 'PaymentMethod_Mailed check',
                         "Contract_Month-to-month", "Contract_One year", "Contract_Two year"]

    for col in columns_to_ensure:
        if col not in df.columns:
            encoded_dataframe[col] = 0

    column_order = [
        "gender",
        "SeniorCitizen",
        "Partner",
        "Dependents",
        "tenure",
        "Promotion Usage",
        "PaperlessBilling",
        "MonthlyCharges",
        "TotalCharges",
        "Purchase Channel_Online",
        "Purchase Channel_Physical Store",
        "Tea preferences_Black tea",
        "Tea preferences_Green tea",
        "Tea preferences_White tea",
        "Contract_Month-to-month",
        "Contract_One year",
        "Contract_Two year",
        "PaymentMethod_Bank transfer (automatic)",
        "PaymentMethod_Credit card (automatic)",
        "PaymentMethod_Electronic check",
        "PaymentMethod_Mailed check",
    ]

    final_dataframe = encoded_dataframe[column_order]
    return final_dataframe

def churn_predict(df):
    df = np.asarray(df).astype('float32')
    model = pickle.load(open('Models/Churn/model.pkl', 'rb'))
    yp = model.predict(df)
    y_predict = []
    for i in yp:
        if i > 0.5:
            y_predict.append(1)
        else:
            y_predict.append(0)

    return y_predict

@app.post("/upload")
def upload(file: UploadFile = File(...)):
    csvReader = csv.DictReader(codecs.iterdecode(file.file, 'utf-8'))
    data_list = list(csvReader)
    df = pd.DataFrame(data_list)
    file.file.close()
    output = pd.DataFrame(df['customerID'])
    predicted = churn_predict(churn_preprocess(df))
    output['prediction'] = predicted
    return output.set_index('customerID').to_dict()['prediction']

class Data(BaseModel):
    customerID: str
    gender: str
    SeniorCitizen: bool
    Partner: str
    Dependents: str
    tenure: int
    Purchase_Channel: str
    Tea_preferences: str
    Promotion_Usage: str
    Contract: str
    PaperlessBilling: str
    PaymentMethod: str
    MonthlyCharges: float
    TotalCharges: float

@app.post('/prediction')
async def prediction(data: Data):

    data = {
        'customerID': data.customerID,
        'gender': data.gender,
        'SeniorCitizen': data.SeniorCitizen,
        'Partner': data.Partner,
        'Dependents': data.Dependents,
        'tenure': data.tenure,
        'Purchase Channel': data.Purchase_Channel,
        'Tea preferences': data.Tea_preferences,
        'Promotion Usage': data.Promotion_Usage,
        'Contract': data.Contract,
        'PaperlessBilling': data.PaperlessBilling,
        'PaymentMethod': data.PaymentMethod,
        'MonthlyCharges': data.MonthlyCharges,
        'TotalCharges': data.TotalCharges
    }

    df = pd.DataFrame([data])

    predicted = churn_predict(churn_preprocess(df))

    return {data["customerID"]:  predicted[0]}

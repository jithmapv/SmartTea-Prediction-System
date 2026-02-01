from pydantic import BaseModel
import pandas as pd
import joblib

# ['Date', 'Invoice No', 'Lot No', 'Selling Mark', 'Grade', 'Bag Weight',
#        'Unnamed: 6', 'No of Bags', 'Unnamed: 8', 'Gross Qty', 'Unnamed: 10', 
#        'Nett Qty', 'Unnamed: 12', 'Price', 'Unnamed: 14', 'Amount'

class SalePredictRqBody(BaseModel):
    date: str
    invoice_no: int
    lot_no : int
    selling_mark: str
    grade: str
    bag_weight: float
    no_of_bags: int


class SalePredictRpBody(BaseModel):
    date: str
    invoice_no: int
    lot_no : int
    selling_mark: str
    grade: str
    bag_weight: float
    no_of_bags: int
    gross_qty: float
    nett_qty: float
    price: float
    amount: float

class SalesPredModel():
    model = None
    def __init__(self, model_path: str, encoder_path: str) -> None:
        self.model = joblib.load(model_path)
        self.enc = joblib.load(encoder_path)
        
    def pre_process(self, df: pd.DataFrame) -> pd.DataFrame:
        df.rename(columns = {'date':'Date', "selling_mark": "Selling Mark", "grade": "Grade", "invoice_no": 'Invoice No',
                              "lot_no": 'Lot No', "bag_weight" : 'Bag Weight', "no_of_bags": 'No of Bags'}, inplace = True)
        print(df["Date"])
        df[["year", "month", "day"]] = df["Date"].str.split("-", expand=True)
        df.drop(columns=["Date"], inplace=True)
        df = df.astype({ "day": int, "month": int, "year": int})
        df_objects = df.loc[:, ["Selling Mark", "Grade"]]
        # enc = OneHotEncoder()
        # enc.fit(df_objects)
        df_objects_t = self.enc.transform(df_objects).toarray()
        df.drop(columns=["Selling Mark", "Grade"], inplace=True)
        enc_list = self.enc.categories_[0].tolist() + (self.enc.categories_[1].tolist())
        df_t = pd.DataFrame(df_objects_t, columns=enc_list)
        dff = pd.concat([df, df_t], axis=1)
        return dff
    
    def predict(self, data: SalePredictRqBody) -> dict:
        df = pd.DataFrame(data.__dict__, index=[0])
 
        dff =  self.pre_process(df)
        result = self.model.predict(dff)
        nett_qty = data.no_of_bags  * data.bag_weight
        return {"price": result[0].round(2), "amount": result[0].round(2) * nett_qty  }


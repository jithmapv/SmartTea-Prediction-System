import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

dataframe = pd.read_csv("backend\Models\Churn\Customer-Churn.csv")

# Data Exploration
# Print the number of rows and features
print('Number of rows: ', dataframe.shape[0])
print("Number of features:", dataframe.shape[1])
# Print the names of the features (column names)
print("Data Features:")
print(dataframe.columns.tolist())
# Print the number of unique values for each feature
print("Unique values:")
print(dataframe.nunique())

# Drop the 'customerID' column as it is not necessary for modeling
dataframe.drop('customerID', axis='columns', inplace=True)

# Check for missing or blank values in each feature
for feature in dataframe.columns.tolist():
    print(feature)
    print(dataframe[dataframe[feature] == " "].shape)

# Identify rows with missing values in the 'TotalCharges' column
dataframe[pd.to_numeric(dataframe.TotalCharges, errors='coerce').isnull()]

# Remove rows with missing values in the 'TotalCharges' column
not_null_dataframe = dataframe[dataframe.TotalCharges != " "]
not_null_dataframe.shape

# Convert the 'TotalCharges' column to numeric
not_null_dataframe.TotalCharges = pd.to_numeric(not_null_dataframe.TotalCharges)

for col in not_null_dataframe:
    if not_null_dataframe[col].dtypes == "object":
        print(f"{col} : {not_null_dataframe[col].unique()}")

for col in not_null_dataframe:
    if not_null_dataframe[col].dtypes == "object":
        print('\"'+col+'\"', end=", ")

# Convert binary categorical columns to numerical (Yes/No to 1/0)
yes_no_cols = ["Partner", "Dependents", "Promotion Usage", "PaperlessBilling", "Churn"]

for col in yes_no_cols:
    not_null_dataframe[col].replace({'Yes':1, "No":0}, inplace= True)

# Convert the 'gender' column to numerical (Female/Male to 1/0)
not_null_dataframe['gender'].replace({'Female':1, "Male":0}, inplace= True)


# Perform one-hot encoding for categorical variables give each data 1 or 0
encoded_dataframe = pd.get_dummies(data=not_null_dataframe, columns=[ "Purchase Channel", "Tea preferences","Contract", "PaymentMethod",])
encoded_dataframe.columns

# Check the number of columns after one-hot encoding
encoded_dataframe.columns.shape

encoded_dataframe.dtypes

# Scale numerical features using Min-Max scaling range between 0 and 1.
cols_to_scale = ['tenure', 'MonthlyCharges', 'TotalCharges']

from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler()

encoded_dataframe[cols_to_scale] = scaler.fit_transform(encoded_dataframe[cols_to_scale])

# Convert boolean columns to integer (True/False to 1/0)
for col in encoded_dataframe:
    if encoded_dataframe[col].dtypes == "bool":
        print('\"'+col+'\"', end=", ")

boolean_columns = ["Purchase Channel_Online", "Purchase Channel_Physical Store", "Tea preferences_Black tea", "Tea preferences_Green tea", "Tea preferences_White tea", "Contract_Month-to-month", "Contract_One year", "Contract_Two year", "PaymentMethod_Bank transfer (automatic)", "PaymentMethod_Credit card (automatic)", "PaymentMethod_Electronic check", "PaymentMethod_Mailed check",]

for col in boolean_columns:
    encoded_dataframe[col] = encoded_dataframe[col].astype(int)

boolean_columns = ["Purchase Channel_Physical Store", "Tea preferences_Green tea", "Tea preferences_White tea", "Contract_Month-to-month", "Contract_One year", "Contract_Two year", "PaymentMethod_Bank transfer (automatic)", "PaymentMethod_Credit card (automatic)", "PaymentMethod_Electronic check", "PaymentMethod_Mailed check"]

for col in boolean_columns:
    encoded_dataframe[col] = encoded_dataframe[col].astype(int)

X = encoded_dataframe.drop('Churn', axis='columns')
y = encoded_dataframe['Churn']

X.shape

# Split the data into training and testing sets training set contains 80% test 20%
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X,y, test_size=0.2, random_state=5)

X_train.shape

X_train.sample(5)

import tensorflow as tf
from tensorflow import keras

# Build a neural network sequential model (ANN) Feedforward neural networks

model = keras.Sequential([
    keras.layers.Dense(21, input_shape=(21,), activation='relu'),
    keras.layers.Dense(15,  activation='relu'),
    keras.layers.Dense(1, activation='sigmoid')
])

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
              )


model.fit(X_train, y_train, epochs= 100)

# Make predictions on the test data and apply a threshold
yp = model.predict(X_test)

y_predict = []

for i in yp:
    if i >0.5:
        y_predict.append(1)
    else:
        y_predict.append(0)


# Evaluate the model and print the classification report
from sklearn.metrics import confusion_matrix, classification_report


print(classification_report(y_test, y_predict))

# Create a confusion matrix and visualize it using a heatmap
import seaborn as sn


cm = tf.math.confusion_matrix(labels=y_test, predictions=y_predict)

plt.figure(figsize=(10,7))
sn.heatmap(cm, annot=True, fmt='d')
plt.xlabel('Predicted')
plt.ylabel('Truth')

import pickle

# Define a function to train the ANN model
def ANN(X_train, X_test, y_train, y_test, loss, export = False ):
    model = keras.Sequential([
        keras.layers.Dense(21, input_shape=(21,), activation='relu'),
        keras.layers.Dense(15,  activation='relu'),
        keras.layers.Dense(1, activation='sigmoid')
    ])

    model.compile(
        optimizer='adam',
        loss= loss,
        metrics=['accuracy'])
    

    model.fit(X_train, y_train, epochs= 100)


    print(model.evaluate(X_test, y_test))

    y_predict = model.predict(X_test)
    y_predict = np.round(y_predict)

    if(export):
        pickle.dump(model, open('model.pkl', 'wb'))



    return y_predict


# Define a function to create and visualize a confusion matrix
def confusion_matrix(y_test, y_predict):
    cm = tf.math.confusion_matrix(labels=y_test, predictions=y_predict)

    plt.figure(figsize=(10,7))
    sn.heatmap(cm, annot=True, fmt='d')
    plt.xlabel('Predicted')
    plt.ylabel('Truth')
        

# Define a function for under-sampling the majority class
def under_sampling_majority(df):
    class_0, class_1 = df.Churn.value_counts()

    df_class_0 = df[df['Churn'] == 0]
    df_class_1 = df[df['Churn'] == 1]

    df_class_0_under = df_class_0.sample(class_1)

    df_under = pd.concat([df_class_0_under,df_class_1], axis=0)

    X = df_under.drop('Churn', axis='columns')
    y = df_under['Churn']    

    X_train, X_test, y_train, y_test = train_test_split(X,y, test_size=0.2, random_state=5, stratify=y)
    y_predict = ANN(X_train, X_test, y_train, y_test, 'binary_crossentropy')
    print(classification_report(y_test, y_predict))
    print(confusion_matrix(y_test, y_predict))

    return y_test, y_predict

# Perform under-sampling of the majority class and evaluate
y_test, y_predict = under_sampling_majority(encoded_dataframe)

print(classification_report(y_test, y_predict))

# Define a function for SMOTE (Synthetic Minority Over-sampling Technique)
from imblearn.over_sampling import SMOTE

# It oversamples the minority class to balance the data, trains an ANN model on the oversampled data,
def smote(df):

    X = df.drop('Churn', axis='columns')
    y = df['Churn']

    smote = SMOTE(sampling_strategy='minority')
    X_sm , y_sm = smote.fit_resample(X,y)

    X_train, X_test, y_train, y_test = train_test_split(X_sm,y_sm, test_size=0.2, random_state=5, stratify=y_sm)
    y_predict = ANN(X_train, X_test, y_train, y_test, 'binary_crossentropy', export= True)

    return y_test, y_predict


# Perform SMOTE and evaluate
y_test, y_predict = smote(encoded_dataframe)

print(classification_report(y_test, y_predict))

print(confusion_matrix(y_test, y_predict))

from xgboost import XGBClassifier

#uses SMOTE for class imbalance handling and returns the true labels (y_test) and predicted labels (y_predict)
from sklearn.ensemble import RandomForestClassifier
def randomForest(df):
    X = df.drop('Churn', axis='columns')
    y = df['Churn']

    smote = SMOTE(sampling_strategy='minority')
    X_sm , y_sm = smote.fit_resample(X,y)

    X_train, X_test, y_train, y_test = train_test_split(X_sm,y_sm, test_size=0.2, random_state=5, stratify=y_sm)
    classifier_rf = RandomForestClassifier(max_depth = 4,random_state = 0)
    classifier_rf.fit(X_train,y_train)
    y_predict = classifier_rf.predict(X_test)


    return y_test, y_predict
    


y_test, y_predict = randomForest(encoded_dataframe)
print(classification_report(y_test, y_predict))

print(confusion_matrix(y_test, y_predict))

from sklearn.tree import DecisionTreeClassifier
def decisionTree(df):
    X = df.drop('Churn', axis='columns')
    y = df['Churn']

    smote = SMOTE(sampling_strategy='minority')
    X_sm , y_sm = smote.fit_resample(X,y)

    X_train, X_test, y_train, y_test = train_test_split(X_sm,y_sm, test_size=0.2, random_state=5, stratify=y_sm)
    classifier_dt = DecisionTreeClassifier(random_state = 1000,max_depth = 4,min_samples_leaf = 1)
    classifier_dt.fit(X_train,y_train)
    y_predict = classifier_dt.predict(X_test)


    return y_test, y_predict

y_test, y_predict = decisionTree(encoded_dataframe)
print(classification_report(y_test, y_predict))

print(confusion_matrix(y_test, y_predict))
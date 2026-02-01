import React, { useState } from "react";
import "./churn.css"; // Import the CSS file
import axios from "axios";

const Churn = () => {
  const [formData, setFormData] = useState({
    CustomerID: "",
    Gender: "",
    SeniorCitizen: "",
    Partner: "",
    Dependents: "",
    Tenure: "",
    PurchaseChannel: "",
    TeaPreferences: "",
    PromotionUsage: "",
    Contract: "",
    PaperlessBilling: "",
    PaymentMethod: "",
    MonthlyCharges: "",
    TotalCharges: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const postConfig = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    const endpoint = "http://localhost:8000/prediction";
    const data = {
      customerID: formData.CustomerID,
      gender: formData.Gender,
      SeniorCitizen: formData.SeniorCitizen == 1 ? true : false,
      Partner: formData.Partner,
      Dependents: formData.Dependents,
      tenure: formData.Tenure,
      Purchase_Channel: formData.PurchaseChannel,
      Tea_preferences: formData.TeaPreferences,
      Promotion_Usage: formData.PromotionUsage,
      Contract: formData.Contract,
      PaperlessBilling: formData.PaperlessBilling,
      PaymentMethod: formData.PaymentMethod,
      MonthlyCharges: parseFloat(formData.MonthlyCharges),
      TotalCharges: formData.TotalCharges,
    };

    axios
      .post(endpoint, data, postConfig)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="churn-form-container">
      <form className="churn-form" onSubmit={handleSubmit}>
        <label htmlFor="CustomerID">Customer ID:</label>
        <input
          type="text"
          id="CustomerID"
          name="CustomerID"
          value={formData.CustomerID}
          onChange={handleChange}
        />

        <label htmlFor="Gender">Gender:</label>
        <select
          id="Gender"
          name="Gender"
          value={formData.Gender}
          onChange={handleChange}
          >
          <option value="Male">Male</option>
          <option value="Female">Male</option>
        </select>

        <label htmlFor="SeniorCitizen">Senior Citizen:</label>
        <select
          id="SeniorCitizen"
          name="SeniorCitizen"
          value={formData.SeniorCitizen}
          onChange={handleChange}
          >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label htmlFor="Partner">Partner:</label>
        <select
          id="Partner"
          name="Partner"
          value={formData.Partner}
          onChange={handleChange}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label htmlFor="Dependents">Dependents:</label>
        <select
          id="Dependents"
          name="Dependents"
          value={formData.Dependents}
          onChange={handleChange}
          >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label htmlFor="Tenure">Tenure:</label>
        <input
          type="text"
          id="Tenure"
          name="Tenure"
          value={formData.Tenure}
          onChange={handleChange}
        />

        <label htmlFor="PurchaseChannel">Purchase Channel:</label>
        <select
          id="PurchaseChannel"
          name="PurchaseChannel"
          value={formData.PurchaseChannel}
          onChange={handleChange}
          >
          <option value="PhysicalStore">Physical Store</option>
          <option value="Online">Online</option>
        </select>

        <label htmlFor="TeaPreferences">Tea Preferences:</label>
        <select
          id="TeaPreferences"
          name="TeaPreferences"
          value={formData.TeaPreferences}
          onChange={handleChange}
          >
          <option value="Black">Black Tea</option>
          <option value="White">White Tea</option>
          <option value="Green">Green Tea</option>
        </select>

        <label htmlFor="PromotionUsage">Promotion Usage:</label>
        <select
          id="PromotionUsage"
          name="PromotionUsage"
          value={formData.PromotionUsage}
          onChange={handleChange}
          >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label htmlFor="Contract">Contract:</label>
        <select
          id="Contract"
          name="Contract"
          value={formData.Contract}
          onChange={handleChange}
          >
          <option value="year">One year</option>
          <option value="year">Two year</option>
          <option value="month">Month to month</option>
        </select>

        <label htmlFor="PaperlessBilling">Paperless Billing:</label>
        <select
          id="PaperlessBilling"
          name="PaperlessBilling"
          value={formData.PaperlessBilling}
          onChange={handleChange}
          >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label htmlFor="PaymentMethod">Payment Method:</label>
        <select
          id="PaymentMethod"
          name="PaymentMethod"
          value={formData.PaymentMethod}
          onChange={handleChange}
          >
          <option value="bank">Bank Transfer</option>
          <option value="card">Credit card</option>
          <option value="E_Check">Electronic check</option>
          <option value="card">Mailed check</option>
        </select>

        <label htmlFor="MonthlyCharges">Monthly Charges:</label>
        <input
          type="text"
          id="MonthlyCharges"
          name="MonthlyCharges"
          value={formData.MonthlyCharges}
          onChange={handleChange}
        />

        <label htmlFor="TotalCharges">Total Charges:</label>
        <input
          type="text"
          id="TotalCharges"
          name="TotalCharges"
          value={formData.TotalCharges}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Churn;

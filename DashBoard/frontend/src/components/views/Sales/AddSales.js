import React, { useState } from 'react';
import './AddSales.css';
import axios from 'axios';
import SalesPrediction from './SalesPrediction';

const AddSales = () => {
  const [formData, setFormData] = useState({
    date: '',
    invoice_no: '',
    lot_no: '',
    selling_mark: '',
    grade: '',
    bag_weight: '',
    no_of_bags: '',
  });

  const [predictionData, setPredictionData] = useState({
    price: null,
    amount: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post('http://localhost:8000/predictions/sales-prediction', formData);
      const predictionData = response.data;


      console.log('Prediction Data:', predictionData);
      setPredictionData(predictionData);
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="sales-form-container">
        <form className="sales-form" onSubmit={handleSubmit}>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required/>

          <label htmlFor="invoice_no">Invoice No:</label>
          <input type="number" id="invoice_no" name="invoice_no" value={formData.invoice_no} onChange={handleChange} required/>

          <label htmlFor="lot_no">Lot No:</label>
          <input type="number" id="lot_no" name="lot_no" value={formData.lot_no} onChange={handleChange} required/>

          <label htmlFor="selling_mark">Selling Mark:</label>
          <select id="selling_mark" name="selling_mark" value={formData.selling_mark} onChange={handleChange} required>
            <option value="">-SELECT SELLING MARK-</option>
            <option value="BATUWANGALA">BATUWANGALA</option>
            <option value="NEW BATUWANGALA">NEW BATUWANGALA</option>
          </select>

          <label htmlFor="grade">Grade:</label>
          <select id="grade" name="grade" value={formData.grade} onChange={handleChange} required >
            <option value="">-SELECT GRADE-</option>
            <option value="BM">BM</option>
            <option value="BOP">BOP</option>
            <option value="BOP1">BOP1</option>
            <option value="BOP1A">BOP1A</option>
            <option value="BOPA">BOPA</option>
            <option value="BOPF">BOPF</option>
            <option value="BOPSP">BOPSP</option>
            <option value="BP">BP</option>
            <option value="BT">BT</option>
            <option value="DUST">DUST</option>
            <option value="DUST1">DUST1</option>
            <option value="FBOP">FBOP</option>
            <option value="FBOP1">FBOP1</option>
            <option value="FBOPF">FBOPF</option>
            <option value="FBOPF1">FBOPF1</option>
            <option value="FBOPFEXSP">FBOPFEXSP</option>
            <option value="FBOPFEXSP1">FBOPFEXSP1</option>
            <option value="FBOPFSP">FBOPFSP</option>
            <option value="FNGS">FNGS</option>
            <option value="FNGS1">FNGS1</option>
            <option value="GOLDEN TIP">GOLDEN TIP</option>
            <option value="OP">OP</option>
            <option value="OP1">OP1</option>
            <option value="OPA">OPA</option>
            <option value="PEKOE">PEKOE</option>
            <option value="PEKOE1">PEKOE1</option>
          </select>

          <label htmlFor="bag_weight">Bag Weight(Kg):</label>
          <input type="number" id="bag_weight" name="bag_weight" value={formData.bag_weight} onChange={handleChange} required/>

          <label htmlFor="no_of_bags">No of Bags:</label>
          <input type="number" id="no_of_bags" name="no_of_bags" value={formData.no_of_bags} onChange={handleChange} required/>

          <button type="submit">Submit</button>
        </form>



      </div>
      <div className="sales-prediction-container">{ }
        {predictionData.price !== null && predictionData.amount !== null && (
          <SalesPrediction price={predictionData.price} amount={predictionData.amount} />
        )}
      </div>


    </div>

  );
};

export default AddSales;

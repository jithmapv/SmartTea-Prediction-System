import React from 'react';
import './SalesPrediction.css'; 

const SalesPrediction = ({ price, amount }) => {
    return (
        <div>
            <h2>Sales Prediction</h2>
            <table className="sales-table">
                <thead>
                    <tr>
                        <th>Price(Rs.)</th>
                        <th>Amount(Rs.)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{price.toFixed(2)}</td>
                        <td>{amount.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SalesPrediction;

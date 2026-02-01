import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import "./InputForm.css";

function InputForm() {
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.8);
  const [jsonData, setJsonData] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        try {
          const parsedData = JSON.parse(content);
          setJsonData(parsedData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          setJsonData(null);
        }
      };

      reader.readAsText(file);
    } else {
      console.error("No file selected.");
      setJsonData(null);
    }
  };

  const handleSubmit = () => {
    if (jsonData) {
      // Make a POST request to FastAPI backend with jsonData
      fetch("http://127.0.0.1:8000/trendpredict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data from the backend
          console.log("Response from backend:", data);
          setResponseData(data); // Store the response data
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.error("JSON data is not valid.");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth * 0.8);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container">
      <div className="trend-input-container">
        <p style={{ display: "flex", alignItems: "center" }}>Please upload the JSON file with Net quantities of each Tea Grade for the past 12 months.</p>
        <div className="input-button-container" style={{ display: "flex", alignItems: "center" }}>
          <input type="file" accept=".json" onChange={handleFileUpload} />
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <div className="trend-prediction-container">
        {responseData && (
          <BarChart
            data={{
              labels: Object.keys(responseData.top_grades),
              datasets: [
                {
                  data: Object.values(responseData.top_grades),
                  backgroundColor: [], 
                  borderColor: [],     
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Net Quantity",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Tea Grades",
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
            width={chartWidth}
            height={400}
          />
        )}
      </div>
    </div>
  );
}

export default InputForm;

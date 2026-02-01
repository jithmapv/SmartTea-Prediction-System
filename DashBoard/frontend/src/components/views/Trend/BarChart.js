import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function BarChart({ data, options }) {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    if (chartRef.current && data) {
      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(chartRef.current, {
        type: "bar",
        data: {
          ...data,
          datasets: [
            {
              ...data.datasets[0],
              backgroundColor: ["#98FB98", "#32CD32", "#228B22", "#008000", "#006400"],
            },
          ],
        },
        options: {
          ...options,
        },
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data, options]);

  return <canvas ref={chartRef} />;
}

export default BarChart;

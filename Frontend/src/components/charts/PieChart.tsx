
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

import {  pieChartOptions } from "variables/charts";

const PieChart = () => {
  const [chartData, setChartData] = useState([0, 0]);
  const [chartOptions, setChartOptions] = useState({
    // Your chart options here
  });

  // useEffect(() => {
  //   fetch("http://localhost:3001")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data && data.queue2 && data.queue3) {
  //         const lolLength = data.queue2.length;
  //         const lol2Length = data.queue3.length;
  //         const newPieChartData = [lolLength, lol2Length];
  //         setChartData(newPieChartData);

  //         const newChartOptions = {
  //           ...pieChartOptions, // Use your default options
            
  //         };
          
  //         setChartOptions(newChartOptions);
  //       } else {
  //         console.error("Data or properties are undefined or do not exist.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);





  const fetchData = () => {
    fetch("https://binance-server-pnyx.onrender.com")
    .then((response) => response.json())
    .then((data) => {
      if (data && data.queue2 && data.queue3) {
        const lolLength = data.queue2.length;
        const lol2Length = data.queue3.length;
        const newPieChartData = [lolLength, lol2Length];
        setChartData(newPieChartData);

        const newChartOptions = {
          ...pieChartOptions, // Use your default options
          
        };
        
        setChartOptions(newChartOptions);
      } else {
        console.error("Data or properties are undefined or do not exist.");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set up an interval to fetch data periodically (e.g., every 5 seconds)
    const fetchInterval = setInterval(fetchData, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(fetchInterval);
  }, []);


  

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartData}
      type="donut"
      width="100%"
      height="100%"
    />
  );
};

export default PieChart;


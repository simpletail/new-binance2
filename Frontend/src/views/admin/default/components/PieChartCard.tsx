import React, { useEffect, useState } from "react";

import PieChart from "components/charts/PieChart";

import Card from "components/card";

const PieChartCard = () => {
 
 

   const [data1,setData1]=useState(0);
  const [data2,setData2]=useState(0)
  

  // useEffect(() => {
  //   fetch('http://localhost:3001')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data && data.queue2 && data.queue3) {
  //         // Check if data, data.host, and data.lol2 exist before accessing properties
  //         const lolLength = data.queue2.length;
  //         const lol2Length = data.queue3.length;
  //        setData1(lolLength);
  //        setData2(lol2Length);
  //       } else {
  //         console.error('Data or properties are undefined or do not exist.');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);
  
  
  const fetchData = () => {
    fetch("https://binance-server-pnyx.onrender.com")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.queue2 && data.queue3) {
          const lolLength = data.queue2.length;
          const lol2Length = data.queue3.length;
          setData1(lolLength);
          setData2(lol2Length);
        } else {
          console.error('Data or properties are undefined or do not exist.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
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
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Your Pie Chart
          </h4>
        </div>

        <div className="mb-6 flex items-center justify-center">
          <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-[#181a20] ">
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        <PieChart  />
      </div>
      <div className="flex flex-row !justify-between rounded-2xl px-1 py-3 shadow-2xl shadow-shadow-500 dark:!bg-[#181a20] dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-4 rounded-full bg-[#20b26c]" />
            <p className="ml-1 text-[10px] font-normal text-gray-600">Top Breakout</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">
         {data1}
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#ef454a]" />
            <p className="ml-1 text-[10px] font-normal text-gray-600">Bottom Breakout</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
        {data2}
          </p>
          {/* ["#20b26c", "#ef454a" */}
        </div>
      </div>
    </Card>
  );
};

export default PieChartCard;

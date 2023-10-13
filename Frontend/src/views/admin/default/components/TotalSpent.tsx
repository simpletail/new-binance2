// import {
//   MdArrowDropUp,
//   MdOutlineCalendarToday,
//   MdBarChart,
// } from "react-icons/md";
// import Card from "components/card";
// import {
//   lineChartDataTotalSpent,
//   lineChartOptionsTotalSpent,
// } from "variables/charts";
// import LineChart from "components/charts/LineChart";
import React, { useEffect, useState } from 'react';
import CardMenu from "components/card/CardMenu";

import Card from "components/card";

const TotalSpent = () => {
  // return (
  //   <Card extra="!p-[20px] text-center">
  //     <div className="flex justify-between">
  //       <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-[#fcd535] p-2 text-white transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-[#fcd535] dark:bg-[#fcd535] dark:hover:opacity-90 dark:active:opacity-80">
  //         <MdOutlineCalendarToday />
  //         <span className="text-sm font-medium text-white">This month</span>
  //       </button>
  //       <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-[#eaecef] p-2 text-[#fcd535] !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-[#fcd535] dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
  //         <MdBarChart className="h-6 w-6" />
  //       </button>
  //     </div>

  //     <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
  //       <div className="flex flex-col">
  //         <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
  //           $37.5K
  //         </p>
  //         <div className="flex flex-col items-start">
  //           <p className="mt-2 text-sm text-gray-600">Total Spent</p>
  //           <div className="flex flex-row items-center justify-center">
  //             <MdArrowDropUp className="font-medium text-green-500" />
  //             <p className="text-sm font-bold text-green-500"> +2.45% </p>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="h-full w-full">
  //         <LineChart
  //           chartOptions={lineChartOptionsTotalSpent}
  //           chartData={lineChartDataTotalSpent}
  //         />
  //       </div>
  //     </div>
  //   </Card>
  // );

  const [queue3, setQueue3] = useState([]); // State to store the lol2 array

  // useEffect(() => {
  //   // Replace 'http://your-nodejs-server-url/api/data' with the actual URL of your Node.js backend.
  //   fetch('http://localhost:3001')
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       // Extract the lol2 array from the response data
  //       const { queue3 } = responseData;
  //       setQueue3(queue3.reverse()); // Set the lol2 array in state
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);


  useEffect(() => {
    const fetchData = () => {
      // Replace 'http://your-nodejs-server-url/api/data' with the actual URL of your Node.js backend.
      fetch("https://binance-server-pnyx.onrender.com")
        .then((response) => response.json())
        .then((responseData) => {
          // Extract the lol2 array from the response data
          const { queue3 } = responseData;
          setQueue3(queue3.reverse()); // Set the lol2 array in state
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };
  
    // Fetch data immediately when the component mounts
    fetchData();
  
    // Set up an interval to fetch data every, for example, 5 seconds (you can adjust the interval)
    const intervalId = setInterval(fetchData, 5000); // 5000 milliseconds (5 seconds)
  
    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
    <header className="relative flex items-center justify-between pt-4">
      <div className="text-xl font-bold text-navy-700 dark:text-white">
        Bottom Token Breakout
      </div>
      <CardMenu />
    </header>
  
    <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
      <table className="w-full border-b-[1px] text-[15px] border-gray-200 pt-4 pb-2 pr-4 text-start space-y-4 ">
        <tbody>
          <tr >
            <td>
            <div className="max-h-[400px] overflow-y-auto" style={{ scrollbarColor: '#f7a600 #e5e5e5' }}>
                  {queue3.length === 0 ? (
                    <p className="dark:text-[#f7a600] pb-4 font-bold flex justify-center text-[20px]">No Bottom Token Breakout Yet</p>
                  ) : (
                    queue3.map((item, index) => (
                      <li key={index} className="dark:text-[#f7a600] pb-4">
                        Symbol: {item.symbol}, Price: {item.price}, Time: {convertTimestamp(item.time)}
                      </li>
                    ))
                  )}
                </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </Card>
  
  );
}

function convertTimestamp(timestamp: number) {
  const milliseconds = new Date().getTime() - timestamp;
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return `${days} days and ${hours} hours ago`;
};

export default TotalSpent;

import React, { useEffect, useState } from 'react';
import CardMenu from "components/card/CardMenu";

import Card from "components/card";


function CheckTable() {
 


  const [queue2, setQueue2] = useState([]); // State to store the lol2 array

  // useEffect(() => {
  //   // Replace 'http://your-nodejs-server-url/api/data' with the actual URL of your Node.js backend.
  //   fetch('http://localhost:3001')
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       // Extract the lol2 array from the response data
  //       const { queue2 } = responseData;
  //       setQueue2(queue2.reverse()); // Set the lol2 array in state
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  useEffect(() => {
    const fetchData = () => {
      // Replace 'http://your-nodejs-server-url/api/data' with the actual URL of your Node.js backend.
      fetch("https://binance-server-92cg.onrender.com")
        .then((response) => response.json())
        .then((responseData) => {
          // Extract the lol2 array from the response data
          const { queue2 } = responseData;
          setQueue2(queue2.reverse()); // Set the lol2 array in state
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
        Top Token Breakout
      </div>
      <CardMenu />
    </header>
  
    <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
      <table className="w-full border-b-[1px] text-[15px] border-gray-200 pt-4 pb-2 pr-4 text-start space-y-4 ">
        <tbody>
          <tr >
            <td>
            <div className="max-h-[400px] overflow-y-auto" style={{ scrollbarColor: '#f7a600 #e5e5e5' }}>
                  {queue2.length === 0 ? (
                    <p className="dark:text-[#f7a600] pb-4 font-bold flex justify-center text-[20px]">No Top Token Breakout Yet</p>
                  ) : (
                    queue2.map((item, index) => (
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
}
export default CheckTable;


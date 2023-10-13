import React, { useEffect, useState } from 'react';
import CardMenu from "components/card/CardMenu";
import Card from "components/card";


// const columns = columnsDataCheck;
export default function ComplexTable(props: { tableData: any }) {
 
  
  const [datas, setDatas] = useState([]);
 
  // "https://binance-server-92cg.onrender.com"

// useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch('http://localhost:3001'); // Replace with your backend URL
//         if (response.ok) {
//           const jsonData = await response.json();
//           const { host } = jsonData;
//           const slicedData = host.slice(0, 6);
//           setDatas(slicedData);
//         } else {
//           console.error('Failed to fetch data');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }

//     fetchData();
//   }, []);



useEffect(() => {
  const fetchData = () => {
    // Replace 'http://your-nodejs-server-url/api/data' with the actual URL of your Node.js backend.
    fetch("https://binance-server-92cg.onrender.com")
      .then((response) => response.json())
      .then((responseData) => {
        // Extract the lol2 array from the response data
        const { host } = responseData;
        const slicedData = host.slice(0, 6);
              setDatas(slicedData); // Set the lol2 array in state
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



console.log("datas:",datas)
  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
    <div className="relative flex items-center justify-between pt-4">
      <div className="text-xl font-bold text-navy-700 dark:text-[#eaecef]">
        Future Binance Alert
      </div>
      <CardMenu />
    </div>
  
    <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
      <table className="w-full">
        <thead>
          <tr className="!border-px !border-gray-400">
            <th className="border-b-[1px] text-[15px] border-gray-200 pt-4 pb-2 pr-4 text-start space-y-4">
            <div className="max-h-[400px] overflow-y-auto style={{ overflow: 'auto'  }} ">
                  {datas.length === 0 ? (
                    <p className="dark:text-[#f7a600] pb-4 font-bold flex justify-center text-[20px]">No Future Binance Alert Yet</p>
                  ) : (
                    datas.map((item, index) => {
                      const parts = item.split(' ');
                      const url = parts[parts.length - 1];
                      const text = parts.slice(0, parts.length - 1).join(' ');

                      return (
                        <li key={index} className="dark:text-[#f7a600] pb-4">
                          {text}{' '}
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            {url}
                          </a>
                        </li>
                      );
                    })
                  )}
                </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  </Card>
  
   
  );
}
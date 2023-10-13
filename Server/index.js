//jshint esversion:6
const axios = require('axios');
const fs = require("fs");
let lastData = []; 
let currentData = [];
const player = require('node-wav-player');
const path = require("path");
const TelegramBot = require('node-telegram-bot-api');
const express= require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app= express();
//  const lol=["Dump Alert!!!! 1000PEPEUSDT  : 0.0008946 Suggested Limit Buy Price: 0.0009014  https://www.binance.com/en-NG/trade/1000PEPE_USDT","Dump Alert!!!! 1000PEPEUSDT  : 0.0008946 Suggested Limit Buy Price: 0.0009014  https://www.binance.com/en-NG/trade/1000PEPE_USDT","Dump Alert!!!! 1000PEPEUSDT  : 0.0008946 Suggested Limit Buy Price: 0.0009014  https://www.binance.com/en-NG/trade/1000PEPE_USDT","Dump Alert!!!! 1000PEPEUSDT  : 0.0008946 Suggested Limit Buy Price: 0.0009014  https://www.binance.com/en-NG/trade/1000PEPE_USDT","Dump Alert!!!! 1000PEPEUSDT  : 0.0008946 Suggested Limit Buy Price: 0.0009014  https://www.binance.com/en-NG/trade/1000PEPE_USDT","Dump Alert!!!! 1000PEPEUSDT  : 0.0008946 Suggested Limit Buy Price: 0.0009014  https://www.binance.com/en-NG/trade/1000PEPE_USDT","Dump Alert!!!! 1000PEPEUSDT  : 0.0008946 Suggested Limit Buy Price: 0.0009014  https://www.binance.com/en-NG/trade/1000PEPE_USDT"]
// const lol2=[
//   "min",
//   {
//       "totalmin": 2,
//       "totalmax": 1,
//       "symbol": "XVSUSDT",
//       "price": "4.932000",
//       "min": 4.93,
//       "count": 1,
//       "link": "https://www.binance.com/en-NG/trade/XVS_USDT",
//       "time": 1696930754628
//   },
//   {
//       "totalmin": 2,
//       "totalmax": 1,
//       "symbol": "DODOXUSDT",
//       "price": "0.0973000",
//       "min": 0.0973,
//       "count": 1,
//       "link": "https://www.binance.com/en-NG/trade/DODOX_USDT",
//       "time": 1696930801437
//   }
//   ,
//   {
//       "totalmin": 2,
//       "totalmax": 1,
//       "symbol": "DODOXUSDT",
//       "price": "0.0973000",
//       "min": 0.0973,
//       "count": 1,
//       "link": "https://www.binance.com/en-NG/trade/DODOX_USDT",
//       "time": 1696930801437
//   }
//   ,
//   {
//       "totalmin": 2,
//       "totalmax": 1,
//       "symbol": "DODOXUSDT",
//       "price": "0.0973000",
//       "min": 0.0973,
//       "count": 1,
//       "link": "https://www.binance.com/en-NG/trade/DODOX_USDT",
//       "time": 1696930801437
//   }
//   ,
//   {
//       "totalmin": 2,
//       "totalmax": 1,
//       "symbol": "DODOXUSDT",
//       "price": "0.0973000",
//       "min": 0.0973,
//       "count": 1,
//       "link": "https://www.binance.com/en-NG/trade/DODOX_USDT",
//       "time": 1696930801437
//   }
//   ,
//   {
//       "totalmin": 2,
//       "totalmax": 1,
//       "symbol": "DODOXUSDT",
//       "price": "0.0973000",
//       "min": 0.0973,
//       "count": 1,
//       "link": "https://www.binance.com/en-NG/trade/DODOX_USDT",
//       "time": 1696930801437
//   }
//   ,
//   {
//       "totalmin": 2,
//       "totalmax": 1,
//       "symbol": "DODOXUSDT",
//       "price": "0.0973000",
//       "min": 0.0973,
//       "count": 1,
//       "link": "https://www.binance.com/en-NG/trade/DODOX_USDT",
//       "time": 1696930801437
//   }
//   ,
//   {
//       "totalmin": 2,
//       "totalmax": 1,
//       "symbol": "DODOXUSDT",
//       "price": "0.0973000",
//       "min": 0.0973,
//       "count": 1,
//       "link": "https://www.binance.com/en-NG/trade/DODOX_USDT",
//       "time": 1696930801437
//   }
//   ,
//   {
//       "totalmin": 2,
//       "totalmax": 1,
//       "symbol": "DODOXUSDT",
//       "price": "0.0973000",
//       "min": 0.0973,
//       "count": 1,
//       "link": "https://www.binance.com/en-NG/trade/DODOX_USDT",
//       "time": 1696930801437
//   }
//   ,
//   {
//       "totalmin": 2,
//       "totalmax": 1,
//       "symbol": "bbbXUSDT",
//       "price": "0.0973000",
//       "min": 0.0973,
//       "count": 1,
//       "link": "https://www.binance.com/en-NG/trade/DODOX_USDT",
//       "time": 1696930801437
//   }
// ]





 let queue = [];
let queue4 = [];
const host=queue4;

let lastReversalForBuy;
let lastReversalForSell;
var reversalForBuy = [];
var reversalForSell = [];
let reversalForBuyNumber = 3;
let reversalForSellNumber = 5;
// let queue2, queue3
let queue2 = [];
let topBreakout = ["max"];
let queue3 = [];
let bottomBreakout = ["min"];
let topPriceMovementStrategy = [];
let bottomPriceMovementStrategy = [];
let triggered = [];





const cors = require("cors");


  
  
app.use(express.json());

app.use(cors());

  
  app.get('/', (req, res) => {
    res.json({ host,
        queue2,queue3
        });
  });
  
  
 



  
// const { token } = require('./.secret.json');
require('dotenv').config()
// const PORT = process.env.PORT || 3000;

const bot = new TelegramBot(process.env.TOKEN,{polling: true});


let lastPumpTokens = [];
let lastDumpTokens = [];


  


    // Your code logic here

    // Send a response if needed
    







function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

async function start(msg){
    // Create a bot that uses 'polling' to fetch new updates
        

        // const bota = await bot.getChat('@mybinancePumpAlert')
        // console.log(bota)
     
     //Send Msg to telegram switched off
        await bot.sendMessage('@mybinancePumpAlertFutures', msg);
    //    await sleep(1000)

}
// start();




let date = new Date();
let sec = date.getSeconds();


setTimeout(()=>{
  setInterval(()=>{
    doRequests();
    
    let bnbUsdt = lastData?.filter(x =>{
        return(x.symbol == 'BNBUSDT')
    })
    let bnbUsdt2 = currentData?.filter(x =>{
        return(x.symbol == 'BNBUSDT')
    })

    
    
    let comp = currentData?.forEach(x =>{
        
        let lastComp = lastData?.filter(y =>{
            return(y.symbol == x.symbol)
            // if(y.symbol == x.symbol){
            //     console.log("Same! old Data ",x.symbol,": ",x.price," currentData: ",y.symbol,": ",y.price)
            // }
    })
        // console.log(lastComp[0].symbol);
        const currentPrice = x.price;
        const lastPrice = lastComp[0]?.price
        const percentagePrice = ((currentPrice - lastPrice)/lastPrice) * 100;
        const percentagePriceDecrease = ((lastPrice -currentPrice)/currentPrice) * 100;
        const uselessBtc = Math.floor((currentPrice*(10**8))-(lastPrice*(10**8)))==1?true:false
       
        if(currentPrice == lastPrice){
            // console.log("Same! old Data ",x.symbol,": ",x.price," currentData: ",lastComp[0]?.symbol,": ",lastComp[0]?.price)
        }else{
            if ((percentagePrice>=0.3) || (percentagePriceDecrease >= 0.3)){
                let slc_link = "";
                let slc_others = "";
                // const percentageIncrease = ((5/100) * lastComp[0]?.price) + (+lastComp[0]?.price);
                let slc = (x.symbol.slice(-4))
                let slc2 = (x.symbol.slice(-3))
                if((slc == "BUSD")||(slc == "USDT")||(slc == "BIDR")){
                    
                    slc_others = x.symbol.slice(0, -4)
                    slc_link = "https://www.binance.com/en-NG/trade/"+slc_others+"_"+slc;
                }else if((slc2 == "BTC")||(slc2 == "AUD")||(slc2 == "BNB")||(slc2 == "ETH")||(slc2 == "TRY")||(slc2 == "EUR")||(slc2 == "GBP")){
                    slc_others = x.symbol.slice(0, -3)
                    slc_link = "https://www.binance.com/en-NG/trade/"+slc_others+"_"+slc2;
                }



                //send only BUSD USDT pairs to Telegram
                //  if((slc == "BUSD")||(slc == "USDT")){
                // remove BTTC Pairs
                // console.log("BTTC: ", slc_others, x.symbol);
                if(((slc == "BUSD")||(slc == "USDT")) && (slc_others != "BTTC")){
                  
                   if((percentagePriceDecrease >= 0.7)){
                    
                    if(lastDumpTokens.some(({symbol}) => symbol == slc_others)){
                         //Find index of specific object using findIndex method.    
                         const objIndex = lastDumpTokens.findIndex((obj => obj.symbol == x.symbol));
                         const lastDumpTokenTime = lastDumpTokens[objIndex]?.time;
                         let timeNow =Math.floor(Date.now());
                         let dumpTimeElapsed = (  timeNow - lastDumpTokenTime)/(1000*60);
                         if (dumpTimeElapsed >5){
                            console.log("dumpTimeElapsed: ", dumpTimeElapsed)
                            msgs = `Dump Alert!!!! ${x.symbol}  : ${x.price} Suggested Limit Buy Price: ${lastComp[0]?.price}  ${slc_link}`
                            queue.push(msgs);
                            queue4.push(msgs);
                         }
                         console.log("Fall Alert! ",slc_link," ",Math.floor((lastPrice*(10**8)) - (currentPrice*(10**8))),uselessBtc,"btc ",percentagePriceDecrease,"- ",x.symbol,": ",x.price," lastData: ",lastComp[0]?.symbol,": ",lastComp[0]?.price)
                    }else{

                        let lastDumpTokenDate =Math.floor(Date.now());
                        lastDumpTokens.push({
                            symbol:slc_others,
                            time:lastDumpTokenDate
                        })
                        msgs = `Dump Alert!!!! ${x.symbol}  : ${x.price} Suggested Limit Buy Price: ${lastComp[0]?.price}  ${slc_link}`
                        console.log("Fall Alert! ",slc_link," ",Math.floor((lastPrice*(10**8)) - (currentPrice*(10**8))),uselessBtc,"btc ",percentagePriceDecrease,"- ",x.symbol,": ",x.price," lastData: ",lastComp[0]?.symbol,": ",lastComp[0]?.price)
                        queue.push(msgs);
                        queue4.push(msgs);
                    }
                   }
                   if(percentagePrice>=0.7){

                    if(lastPumpTokens.some(({symbol}) => symbol == slc_others)){
                        //Find index of specific object using findIndex method.    
                        const objIndex = lastPumpTokens.findIndex((obj => obj.symbol == x.symbol));
                        const lastPumpTokenTime = lastPumpTokens[objIndex]?.time;
                        let timeNow =Math.floor(Date.now());
                        let pumpTimeElapsed = (  timeNow - lastPumpTokenTime)/(1000*60);
                        if (pumpTimeElapsed >5){
                            console.log("PumpTimeElapsed: ", pumpTimeElapsed)
                            msgs = `Pump Alert!!!! ${x.symbol}  : ${x.price} Suggested Limit Buy Price: ${lastComp[0]?.price}  ${slc_link}`
                            queue.push(msgs);
                            queue4.push(msgs);
                        }
                        console.log("Pump Alert! ",slc_link," ",Math.floor((currentPrice*(10**8))-(lastPrice*(10**8))),uselessBtc,"btc ",percentagePrice,"- ",x.symbol,": ",x.price," lastData: ",lastComp[0]?.symbol,": ",lastComp[0]?.price)
                   }else{

                        let lastPumpTokenDate =Math.floor(Date.now());
                        lastPumpTokens.push({
                            symbol:slc_others,
                            time:lastPumpTokenDate
                        })
                        msgs = `Pump Alert!!!! ${x.symbol}  : ${x.price} Suggested Limit Buy Price: ${lastComp[0]?.price}  ${slc_link}`
                        console.log("Pump Alert! ",slc_link," ",Math.floor((currentPrice*(10**8))-(lastPrice*(10**8))),uselessBtc,"btc ",percentagePrice,"- ",x.symbol,": ",x.price," lastData: ",lastComp[0]?.symbol,": ",lastComp[0]?.price)
                        queue.push(msgs);
                        queue4.push(msgs);
                   }
                   
                   }
                                 
   
                       var log_file2 = fs.createWriteStream('Queue.json', {flags : 'w'});
                       log_file2.write(JSON.stringify(queue) + '\n');
                     
                }
                
                

                if ((typeof msgs !== 'undefined') && !uselessBtc && slc_others !== "FIL" && slc_others !== "PHB"){
                    // queue.push(msgs);
                
                    //turn off the sound please!
                    //   player.play({
                    //     path: './audio.wav',
                    //   })
               
                }
                
            }
           
        }
    })

    

    lastData = currentData?.map(object => ({ ...object }))
    // var log_file = fs.createWriteStream('LOGS_lastData', {flags : 'w'});
    // log_file.write(JSON.stringify(lastData) + '\n');

    // console.log("lastData: ",bnbUsdt[0]?.price," currentData: ", bnbUsdt2[0]?.price)
    
  }, 60 * 1000);
}, (60 - sec) * 3000);

setInterval(async ()=>{
    if(queue.length>0) {
    //   await bot.telegram.sendMessage(chat_id, queue[0]);
    
    start(queue[0]);
      queue.shift(0);
      queue4.reverse();
    
      //sound the alarm
        // player.play({
        //     path: './audio.wav',
        // })  
    }
  },3000)


// async function doRequests(){
//     try{
//         // lastData = JSON.stringify(currentData);
       
//         // const results = await axios.get('https://api.binance.com/api/v3/ticker/price');
//         const results = await axios.get('https://fapi.binance.com/fapi/v1/ticker/price');
//         currentData = results.data;
//         // console.log(results.data)
        
//         var log_file2 = fs.createWriteStream('LOGS_currentData', {flags : 'w'});
//         // log_file2.write(JSON.stringify(currentData) + '\n');


       


//     } catch (err){

//         console.log('Something went wrong', err)

//     };
// }


// function for queue2 and queue3
setTimeout(() => {
    setInterval(async () => {
      doKline();
      async function doKline() {
        // let s = symbol
        let newMax = 0;
        try {
          // lastData = JSON.stringify(currentData);
          // const klineresults = await axios.get('https://api.binance.com/api/v3/ticker/price');
          const klineresults = await axios.get(
            "https://fapi.binance.com/fapi/v1/ticker/price"
          );
          const currentkData = klineresults.data;
          // console.log(currentkData)
          for (let x of currentkData) {
            let slc_link = "";
            let slc_others = "";
  
            let slc = x.symbol.slice(-4);
            let slc2 = x.symbol.slice(-3);
            slc_others = x.symbol.slice(0, -4);
            //&& slc_others == "UTK"
            if ((slc == "BUSD" || slc == "USDT") && slc_others !== "BTT") {
              // const resultsKline = await axios.get('https://api.binance.com/api/v3/klines?symbol='+x.symbol+'&interval=5m');
              // const currentKlineData = resultsKline?.data;
              // // console.log(currentKlineData)
              // const kdata1 = currentKlineData? currentKlineData[currentKlineData?.length-0] : ""
              // const kdata2 = currentKlineData? currentKlineData[currentKlineData?.length-1] : ""
              // const kdata3 = currentKlineData? currentKlineData[currentKlineData?.length-2] : ""
              // if(kdata1 !== "" && kdata2 !== "" && kdata3 !== ""){
  
              //     if (kdata1[4]>kdata1[1] && kdata2[4]>kdata2[1] && kdata3[4]>kdata3[1]){
              //         // console.log(kdata1[4],' ',kdata1[1]," ",kdata2[4],' ',kdata2[1]," ",kdata3[4],' ',kdata3[1])
              //         if(kdata1[1]>kdata2[1]>kdata3[1]){
              //             console.log("Alert!!!!!!!!!!!!", x.symbol)
              //              console.log(kdata1[4],' ',kdata1[1]," ",kdata2[4],' ',kdata2[1]," ",kdata3[4],' ',kdata3[1])
              //             // player.play({
              //             //     path: './audio.wav',
              //             // })
              //         }
              //     }else{
  
              //     }
              // }
  
              const resultsKline = await axios.get(
                "https://fapi.binance.com/fapi/v1/klines?symbol=" +
                  x.symbol +
                  "&interval=3m"
              );
              // const resultsKline = await axios.get('https://api.binance.com/api/v3/klines?symbol='+x.symbol+'&interval=30m');
              const currentKlineData = resultsKline?.data;
              // console.log(currentKlineData)
  
              const last30 = currentKlineData?.slice(-300); //get last 30 (30mins) records
              let kdataNew = last30?.map((x) => x[2]); //get xth element
              let kdataNew_min = last30?.map((x) => x[3]); //get xth element
              let kdataNew2 = kdataNew.slice(0, -1); //remove the last element
              let kdataNew2_min = kdataNew_min.slice(0, -1); //remove the last element
              const max = Math.max(...kdataNew2); //get max
              const min = Math.min(...kdataNew2_min); //get max
  
              const currentPrice = kdataNew[kdataNew.length - 1];
              const currentPrice_min = kdataNew_min[kdataNew_min.length - 1];
  
              //calclate real current price
              const results_real = await axios.get(
                "https://fapi.binance.com/fapi/v1/ticker/price"
              );
              // Get the index of Array item which matchs the symbol
              const index = results_real.data.findIndex(
                (item) => item.symbol == x.symbol
              );
              const currentPriceReal = results_real.data[index].price;
  
              const pdif = ((max - currentPriceReal) / max) * 100;
              const pdif_min = ((currentPriceReal - min) / currentPriceReal) * 100;
  
              // console.log("current Price: ", currentPriceReal);
              //for link
              // let positiveTradesCount2, negativeTradesCount2
              let slc_link = "";
              let slc_others = "";
              // const percentageIncrease = ((5/100) * lastComp[0]?.price) + (+lastComp[0]?.price);
              let slc = x.symbol.slice(-4);
              let slc2 = x.symbol.slice(-3);
              // if((slc == "BUSD")||(slc == "USDT")||(slc == "BIDR")){
  
              slc_others = x.symbol.slice(0, -4);
              slc_link =
                "https://www.binance.com/en-NG/trade/" + slc_others + "_" + slc;
                
                      
              // console.log("this is the max ", kdataNew2, "this is max 2 ", max);
              // console.log("this is the max ", kdataNew, "this is max 2 ", max);
  
              // for (var i = 1; i < 31; i++) {
              //     var z = i+1;
              //     const kdata = currentKlineData? currentKlineData[currentKlineData.length-i] : ""
              //     const kdata1 = currentKlineData? currentKlineData[currentKlineData.length-z] : ""
  
              //     if(kdata != "" && kdata1 != ""){
              //         // newMax = kdata[4];
  
              //         if (kdata1[4]>kdata[4]){
              //             newMax = kdata1[4];
              //         }else{
              //             newMax = kdata[4];
              //         }
              //         console.log(newMax);
              //     }
              //   }
              // console.log("x.price = ", kdataNew[kdataNew.length-1]) || pdif < 0.01
              // if ((kdataNew[kdataNew.length-1] > max)){
              if (currentPriceReal > max) {
                // console.log("Mega Alert!!!!!!!!!!!!", x.symbol)
                //  console.log(kdataNew[kdataNew.length-1],' > =', max)
  
                //  if (queue2.includes(x.symbol)){
                if (queue2.some(({ symbol }) => symbol == x.symbol)) {
                  //Find index of specific object using findIndex method.
                  const objIndex = queue2.findIndex(
                    (obj) => obj.symbol == x.symbol
                  );
  
                  //Log object to Console.
  
                  //Update object's name property.
                  queue2[objIndex].totalmin = queue3.length;
                  queue2[objIndex].totalmax = queue2.length;
                  queue2[objIndex].price = kdataNew[kdataNew.length - 1];
                  queue2[objIndex].max = max;
  
                  queue2[objIndex].count = Number(queue2[objIndex].count) + 1;
  
                  //Log object to console again.
  
                  // for (const obj of queue2) {
                  //     if (obj.symbol == x.symbol) {
                  //         obj.price= kdataNew[kdataNew.length-1],
                  //         obj.max = max,
                  //         obj.count = Number(obj.count)+1
  
                  //         break;
                  //     }
                  // }
                  if (queue2[objIndex].count == 4){
                    //   let cost = 100/x.price;
                    // let sym = slc_others + slc;
                    // console.log("Persistent Buy Trend Detected", x.price);
                    // console.log("======================================symbol", sym);
                    // tradesb.tradeBuy(sym, x.price);
                  }
  
                          if (!(topBreakout.some(item => item.symbol === x.symbol))){
  
                    topBreakout.push({
                      name: "topBreakout",
                      symbol: x.symbol,
                      price: x.price,
                      time: Date.now(),
                      lastprice: 0, 
                      reversalCount: 0,
                      followTrendCount: 0
                    });
                    // player.play({
                    //   path: "./notifications/mixkit-elevator-tone-2863.wav",
                    // });
  
                  }
                  console.log("trend(short/long):", queue3.length, queue2.length);
                  console.log("queue2:",queue2);
                } else {
                  if (queue2.length >= 300) {
                    queue2.shift(); // pop() will remove the last element, while shift removes the first element
                  }
  
                  queue2.push({
                    // array:"max",
                    totalmin: queue3.length,
                    totalmax: queue2.length,
                    symbol: x.symbol,
                    price: kdataNew[kdataNew.length - 1],
                    max: max,
                    count: 1,
                    link: slc_link,
                     time: Date.now(),
                  });
                  if (!(topBreakout.some(item => item.symbol === x.symbol))){
  
                    topBreakout.push({
                       name: "topBreakout",
                      symbol: x.symbol,
                      price: x.price,
                      time: Date.now(),
                      lastprice: 0, 
                       reversalCount: 0,
                      followTrendCount: 0
                    });
                    // player.play({
                    //   path: "./notifications/mixkit-elevator-tone-2863.wav",
                    // });
  
                  }
                  console.log("trend(short/long):", queue3.length, queue2.length);
                  console.log("queue2:",queue2);
  
                  //notification for new entries
                  // player.play({
                  //     path: './audio.wav',
                  // })
                }
              } else {
                // Todo: if x.symbol is in query2, remove
                if (queue2.some(({ symbol }) => symbol == x.symbol)) {
                  //Find index of specific object using findIndex method.
                  console.log("retracing token: ", x.symbol, x.price);
                  const objIndex = queue2.findIndex(
                    (obj) => obj.symbol == x.symbol
                  );
                  queue2.splice(objIndex, 1);
  
                  //get current time
                  let reversalDate = Math.floor(Date.now());
  
                  //calculate time difference btw last reversal and now
                  let reversalTimeElapsed =
                    (reversalDate - lastReversalForSell) / 1000;
  
                  //add time difference to array
  
                  reversalForSell.push(reversalTimeElapsed || 0);
  
                  //some feedback: fullArray, lastx, sumOfLastx
                  console.log(
                    "reversalForSell: ",
                    reversalForSell,
                    reversalForSell?.slice(-reversalForSellNumber),
                    reversalForSell
                      ?.slice(-reversalForSellNumber)
                      .reduce((acc, val) => acc + val)
                  );
  
                  // calculate sum of last x elements in array
                  const lastx = reversalForSell
                    ?.slice(-reversalForSellNumber)
                    .reduce((acc, val) => acc + val); ///get last x elements
  
                  //get average reversal rate
                  let reversalRateDenominator =
                    reversalForSell.length > reversalForSellNumber
                      ? reversalForSellNumber
                      : reversalForSell.length - 1;
                  let reversalRate = lastx / reversalRateDenominator;
  
                  console.log(
                    "Last Reversal: ",
                    reversalDate,
                    " ReversalTimeElased: ",
                    reversalTimeElapsed,
                    " Number of Reversal: ",
                    reversalRateDenominator,
                    " :: ",
                    reversalRate
                  );
                  lastReversalForSell = reversalDate;
                  if (
                    reversalForSell.length > reversalForSellNumber &&
                    reversalRate < 12
                  ) {
                    //sound the alarm
                    // player.play({
                    //   path: "./audio-old.wav",
                    // });
  
                    // let sym = slc_others + slc;
                    // let cost = 100/ x.price;
                    // console.log("newData======reversalForSell======price", x.price);
                    // console.log("newData============symbol", sym);
                    // console.log("newData============cost", cost);
                    // console.log("newData============tp",  x.price*(105/100));
                    // console.log("newData============sl",  x.price*(95/100));
                    // // trades.tradeSell(sym, cost, x.price);
                    // tradesb.tradeSell(sym, x.price);
  
                    //---------------
                    //   let cost = 100/x.price;
                    // let sym = slc_others + slc;
                    // console.log("newData======lastReversalForBuy======price", x.price);
                    // console.log("newData============symbol", sym);
                    // console.log("newData============cost", cost);
                    // console.log("newData============tp",  x.price*(105/100));
                    // console.log("newData============sl",  x.price*(95/100));
                    // if (sym != "BAKE/USDT" && sym != "SOL/USDT"){
                      // }
                      // tradesb.tradeBuy(sym, x.price);
                      //---------------
                  }
                }
              }
  
              if (currentPriceReal < min) {
                // if ((kdataNew_min[kdataNew_min.length-1] < min)){
                // console.log("Mega22 Alert!!!!!!!!!!!!", x.symbol)
                // console.log(x.price,' < =', max)
                //  if (queue3.includes(x.symbol)){
  
                if (queue3.some(({ symbol }) => symbol == x.symbol)) {
                  //Find index of specific object using findIndex method.
                  const objIndex = queue3.findIndex(
                    (obj) => obj.symbol == x.symbol
                  );
  
                  //Log object to Console.
  
                  //Update object's name property.
                  queue3[objIndex].totalmin = queue3.length;
                  queue3[objIndex].totalmax = queue2.length;
  
                  queue3[objIndex].price = kdataNew[kdataNew.length - 1];
                  queue3[objIndex].min = min;
  
                  queue3[objIndex].count = Number(queue3[objIndex].count) + 1;
  
                  //Log object to console again.
  
                  // for (const obj of queue3) {
                  //     if (obj.symbol == x.symbol) {
                  //         obj.price= kdataNew[kdataNew.length-1],
                  //         obj.max = max,
                  //         obj.count = Number(obj.count)+1
  
                  //         break;
                  //     }
                  // }
                  if (queue3[objIndex].count == 4){
                    //   let cost = 100/x.price;
                    // let sym = slc_others + slc;
                    // console.log("Persistent Sell Trend Detected", x.price);
                    // console.log("======================================symbol", sym);
                    // tradesb.tradeSell(sym, x.price);
                  }
                    if (!(bottomBreakout.some(item => item.symbol === x.symbol))){
                        bottomBreakout.push({
                          name: "bottomBreakout",
                          symbol: x.symbol,
                          price: x.price,
                          time: Date.now(),
                          lastprice: 0,
                           reversalCount: 0,
                      followTrendCount: 0
                        });
                    // player.play({
                    //   path: "./notifications/mixkit-elevator-tone-2863.wav",
                    // });
                   }
                  console.log("trend(short/long):", queue3.length, queue2.length);
                  console.log("queue3:",queue3);
                } else {
                  if (queue3.length >= 300) {
                    queue3.shift(); // pop() will remove the last element, while shift removes the first element
                  }
  
                  //   player.play({
                  //     path: './audio.wav',
                  //     })
                  queue3.push({
                    // array:"min",
                    totalmin: queue3.length,
                    totalmax: queue2.length,
                    symbol: x.symbol,
                    price: kdataNew[kdataNew.length - 1],
                    min: min,
                    count: 1,
                    link: slc_link,
                     time: Date.now(),
                  });
                  
                   if (!(bottomBreakout.some(item => item.symbol === x.symbol))){
                     bottomBreakout.push({
                      name:"bottomBreakout",
                       symbol: x.symbol,
                       price: x.price,
                       time: Date.now(),
                       lastprice: 0,
                        reversalCount: 0,
                      followTrendCount: 0
                     });
                    // player.play({
                    //   path: "./notifications/mixkit-elevator-tone-2863.wav",
                    // });
                   }
                  console.log("trend(short/long):", queue3.length, queue2.length);
                  console.log("queue3:",queue3);
                  // player.play({
                  //     path: './audio.wav',
                  // })
                }
              } else {
                // Todo: if x.symbol is in query3, remove
  
                if (queue3.some(({ symbol }) => symbol == x.symbol)) {
                  //Find index of specific object using findIndex method.
                  console.log("retracing token: ", x.symbol);
                  const objIndex = queue3.findIndex(
                    (obj) => obj.symbol == x.symbol
                  );
                  queue3.splice(objIndex, 1);
  
                  let reversalDate = Math.floor(Date.now());
                  let reversalTimeElapsed =
                    (reversalDate - lastReversalForBuy) / 1000;
  
                  reversalForBuy.push(reversalTimeElapsed || 0);
  
                  console.log(
                    "reversalForBuy: ",
                    reversalForBuy,
                    reversalForBuy?.slice(-reversalForBuyNumber),
                    reversalForBuy
                      ?.slice(-reversalForBuyNumber)
                      .reduce((acc, val) => acc + val)
                  );
  
                  const lastx = reversalForBuy
                    ?.slice(-reversalForBuyNumber)
                    .reduce((acc, val) => acc + val); ///get last x elements
  
                  //get average reversal rate
                  let reversalRateDenominator =
                    reversalForBuy.length > reversalForBuyNumber
                      ? reversalForBuyNumber
                      : reversalForBuy.length - 1;
                  let reversalRate = lastx / reversalRateDenominator;
  
                  console.log(
                    "Last Reversal: ",
                    reversalDate,
                    " ReversalTimeElased: ",
                    reversalTimeElapsed,
                    " Number of Reversal: ",
                    reversalRateDenominator,
                    " :: ",
                    reversalRate
                  );
                  lastReversalForBuy = reversalDate;
                  if (
                    reversalForBuy.length > reversalForBuyNumber &&
                    reversalRate < 12
                  ) {
                    // player.play({
                    //   path: "./audio-old.wav",
                    // });
  
                  
  
                    //---------------------
                    // let sym = slc_others + slc;
                    // let cost = 100/ x.price;
                    // console.log("newData======reversalForSell======price", x.price);
                    // console.log("newData============symbol", sym);
                    // console.log("newData============cost", cost);
                    // console.log("newData============tp",  x.price*(105/100));
                    // console.log("newData============sl",  x.price*(95/100));
                    // // trades.tradeSell(sym, cost, x.price);
                    // tradesb.tradeSell(sym, x.price);
                    //---------------------
  
                    //   let cost = 100/x.price;
                    // let sym = slc_others + slc;
                    // console.log("newData======lastReversalForBuy======price", x.price);
                    // console.log("newData============symbol", sym);
                    // console.log("newData============cost", cost);
                    // console.log("newData============tp",  x.price*(105/100));
                    // console.log("newData============sl",  x.price*(95/100));
                    // if (sym != "BAKE/USDT" && sym != "SOL/USDT"){
                    // }
                    // tradesb.tradeBuy(sym, x.price);
  
                  }
  
  
         
                }
  
                //
              }
  
              if (
                Number(pdif_min) < 3 ||
                currentPriceReal < min ||
                currentPriceReal > max
              ) {
                // if ((Number(pdif_min) <3) || (kdataNew_min[kdataNew_min.length-1] < min) || (kdataNew[kdataNew.length-1] > max)){
                // && (Number(pdif_min) != 0)
                //   player.play({
                //               path: './audio.wav',
                //           })
                // console.log("minnnnnn", kdataNew2_min)
  
                if (Number(pdif_min) < 0.2) {
                  console.log(
                    "bottom token:",
                    x.symbol,
                    currentPriceReal,
                    min,
                    pdif_min, "trend(short/long): ", queue3.length, queue2.length, " || ", bottomBreakout.length, topBreakout.length, " || ", bottomPriceMovementStrategy.length, topPriceMovementStrategy.length, " || ", triggered.length
                  );
                  // console.log("bottom token:", x.symbol,currentPrice_min, min, pdif_min);
                } else {
                }
                // console.log("trend(short/long):", queue3.length, queue2.length);
              }
              if (
                Number(pdif) < 1 ||
                currentPriceReal < min ||
                currentPriceReal > max
              ) {
                // if ((Number(pdif) < 1) || (kdataNew_min[kdataNew_min.length-1] < min)|| (kdataNew[kdataNew.length-1] > max)){
                // player.play({
                //     path: './audio.wav',
                // })
  
                if (Number(pdif) < 0.2) {
                  console.log(
                    "top token:",
                    x.symbol,
                    currentPriceReal,
                    max,
                    pdif, "trend(short/long): ", queue3.length, queue2.length, " || ", bottomBreakout.length, topBreakout.length, " || ", bottomPriceMovementStrategy.length, topPriceMovementStrategy.length, " || ", triggered.length
                  );
                  // console.log("top token:", x.symbol,currentPrice, max, pdif);
                } else {
                }
                // console.log("trend(short/long):", queue3.length, queue2.length);
              }
              if (Number(queue3.length) > 20 || Number(queue2.length) > 20) {
                if (Number(queue2.length)>20){
                     let sym = slc_others + slc;
                    let cost = 100/ x.price;
                    console.log("=================================================", x.price);
                    console.log("Trend Following Strategy Implemented", sym);
                    console.log("Strong Buy Breakout Detected", cost);
  
                    // trades.tradeSell(sym, cost, x.price);
                    // tradesb.tradeBuy(sym, x.price);
                }
                if (Number(queue3.length)>20){
                     let sym = slc_others + slc;
                    let cost = 100/ x.price;
                    console.log("=================================================", x.price);
                    console.log("Trend Following Strategy Implemented", sym);
                    console.log("Strong Sell Breakout Detected", cost);
  
                    // trades.tradeSell(sym, cost, x.price);
                    // tradesb.tradeSell(sym, x.price);
                }
  
                //sound the alarm
                // player.play({
                //   path: "./audio-old.wav",
                // });
              }
            }
          }
        } catch (err) {
          console.log("Something went wrong", err);
        }
      }
    }, 60 * 1000 * 1);
  }, (60 - sec) * 1000);
  
  async function tradeData(symbol) {
    let s = symbol;
    let trades = 0;
    let positiveTradesCount = 0;
  
    let negativeTradesCount = 0;
    try {
      // lastData = JSON.stringify(currentData);
  
      // const results = await axios.get('https://api.binance.com/api/v3/trades?symbol='+s);
      const results = await axios.get(
        "https://fapi.binance.com/fapi/v1/trades?symbol=" + s
      );
      const currentTradeData = results.data;
  
      currentTradeData?.forEach((t) => {
        if (trades < t.price) {
          positiveTradesCount += 1;
          trades = t.price;
        }
        if (trades > t.price) {
          negativeTradesCount += 1;
          trades = t.price;
        }
      });
    } catch (err) {
      console.log("Something went wrong", err);
    }
  
    // console.log( s," Trades: ",trades," PositiveTrades: ", positiveTradesCount, " NegativeTrades: ", negativeTradesCount )
  
    return {
      pSymbol: s,
      pCount: positiveTradesCount,
      nCount: negativeTradesCount,
    };
  }
  
  async function doRequests() {
    try {
      // lastData = JSON.stringify(currentData);
  
      const results = await axios.get(
        "https://fapi.binance.com/fapi/v1/ticker/price"
      );
      // const results = await axios.get('https://api.binance.com/api/v3/ticker/price');
      currentData = results.data;
      // console.log(results.data)
  
      var log_file2 = fs.createWriteStream("LOGS_currentData", { flags: "w" });
    //   log_file2.write(JSON.stringify(currentData) + "\n");
    } catch (err) {
      console.log("Something went wrong", err);
    }
  }
  
  
  
  


  
app.listen(3001, function() {
  console.log("Server started on port 3001");
});


      
    



 
  


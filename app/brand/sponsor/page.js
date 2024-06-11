"use client";
import BrandNabvar from "../../../components/BrandNav";
import React from "react";
import { useEffect, useState } from "react";
import { consumeToken } from "../../../utils";
import {
  getOrdersArray,
  addGenStation,
  getMarketPrice,
  getRECTokenBalance,
} from "../../../utils";
import BrandCard from "../../../components/BrandCard";
import Link from "next/link";
export default function Sponsor() {
  const [SLRBalance, setSLRBalance] = useState("Fetching ...");
  const [marketPrice, setMarketPrice] = useState("Fetching");
  const [ordersArray, setOrdersArray] = useState([]);

  async function handleSLRBalanceUpdate() {
    //console.log("Fetching GW token balance...");
    try {
      const updatedBalance = await getRECTokenBalance();
      console.log("Fetched balance:", updatedBalance);
      setSLRBalance(updatedBalance);
    } catch (error) {
      console.error("Failed to fetch REC token balance:", error);
    }
  }

  async function updateArray() {
    const arr = await getOrdersArray();
    //console.log(arr);
    setOrdersArray(arr);

    //console.log(ordersArray);
    // for (let i = 0; i < ordersArray.length; i++) {
    //     if(ordersArray[i][9]){
    //         const currArr = ordersArray[i];
    //         //console.log(currArr[i]);
    //         <Card array={currArr}></Card>
    //     }
    //   //console.log(ordersArray[i][0]);
    //   for (let j = 0; j < ordersArray[i].length; j++) {
    //     //console.log(ordersArray[i][j]);
    //   }
    // }
  }

  async function updateMarketPrice() {
    try {
      const updatedPrice = await getMarketPrice();
      console.log("Fetched Market Price:", updatedPrice);
      setMarketPrice(updatedPrice);
    } catch (error) {
      console.error("Failed to fetch REC token balance:", error);
    }
  }

  useEffect(() => {
    handleSLRBalanceUpdate();
    updateArray();
    updateMarketPrice();
  }, [ordersArray]);
  return (
    <div className="bg-black">
      <BrandNabvar />
      <div className=" w-full bg-black dark:bg-grid-white/[0.2] max-h-screen  items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-slate-400 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
        {/* <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Backgrounds
      </p> */}
        <h1 className="scroll-m-20 text-5xl text-white font-extrabold text-center tracking-wide lg:text-5xl mt-10">
          Sponsor
          <mark className="bg-yellow-500 ml-3 rounded-lg px-3">
            Self Sufficient users
          </mark>{" "}
          from SolarXM .
        </h1>

        <div className="border-2 border-white py-5 mt-10 mx-60 rounded ">
          <div className="text-center text-white text-3xl  font-extrabold tracking-wider">
            You have {" "}
            <mark className="px-5 py-2 rounded-2xl bg-sky-400">
              <span className="text-black">{SLRBalance}</span>
            </mark>{" "}
            REC tokens{" "}
          </div>
        </div>

        <div className="flex flex-wrap content-center justify-center">
          {ordersArray.map((data) => {
            if (!data[9]) {
              return <BrandCard key={data[0]} array={data}></BrandCard>;
            }
          })}
        </div>
      </div>
    </div>
  );
}

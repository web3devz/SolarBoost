"use client";
import React from "react";
import { useEffect, useState } from "react";
import {
  getOrdersArray,
  addGenStation,
  getMarketPrice,
  getSLRTokenBalance,
} from "../utils";
import Card from "./Card";
import Link from "next/link";
export const 
GridBackground = () => {
  const [SLRBalance, setSLRBalance] = useState("Fetching ...");
  const [marketPrice, setMarketPrice] = useState("Fetching");
  const [ordersArray, setOrdersArray] = useState([]);

  async function handleSLRBalanceUpdate() {
    //console.log("Fetching GW token balance...");
    try {
      const updatedBalance = await getSLRTokenBalance();
      console.log("Fetched balance:", updatedBalance);
      setSLRBalance(updatedBalance);
    } catch (error) {
      console.error("Failed to fetch SLR token balance:", error);
    }
  }

  async function updateArray() {
    const arr = await getOrdersArray();
    //console.log(arr);
    setOrdersArray(arr);
  }

  async function updateMarketPrice() {
    try {
      const updatedPrice = await getMarketPrice();
      console.log("Fetched Market Price:", updatedPrice);
      setMarketPrice(updatedPrice);
    } catch (error) {
      console.error("Failed to fetch SLR token balance:", error);
    }
  }

  useEffect(() => {
    handleSLRBalanceUpdate();
    updateArray();
    updateMarketPrice();
  }, [ordersArray]);
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center">
      <h1 className=" text-5xl font-extrabold text-center tracking-tight lg:text-6xl text-white">
        Buy 
        <mark className="bg-yellow-500 mx-2 rounded-lg px-3 mr-2">Energy Tokens</mark> 
        from SolarXM.
      </h1>

      <div className="border-2 border-gray-700 bg-gray-800 p-8 mt-10 mx-4 md:mx-60 rounded-lg shadow-lg">
        <div className="text-center text-3xl font-extrabold tracking-tight text-white">
          You have generated 
          <mark className="px-5 rounded-2xl bg-sky-400 mx-3">
            <span className="text-black">{SLRBalance}</span>
          </mark> 
          SLR tokens 
        </div>

        <div className="text-center text-3xl pt-2 font-extrabold tracking-tight text-white">
          Current Market Price 
          <mark className="px-5 rounded-3xl bg-white mx-3">
            <span className="text-green-600">{marketPrice}</span>
          </mark> 
          per Token 
        </div>
      </div>

      <div className="mt-10 w-full flex flex-wrap justify-center gap-4">
        {ordersArray.map((data) => {
          if (!data[9]) {
            return <Card key={data[0]} array={data} />;
          }
        })}
      </div>
    </div>
  );
};
 



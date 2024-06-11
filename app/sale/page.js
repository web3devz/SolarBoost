"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { createSellOrder, addGenStation, getSLRTokenBalance } from "../../utils";
import { ToastContainer, toast , Slide , Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
export default function Main() {
  const [SLRBalance, setSLRBalance] = useState("Fetching ...");
  const [noOfTokens, setNoOfTokens] = useState(0);
  const [price, setPrice] = useState(0);
  const [isOption, setIsOption] = useState(false);
  const [optionPrice, setOptionPrice] = useState(0);
  const [optionDuration, setOptionDuration] = useState(0);
  const [toggle, setToggle] = useState(false);


  async function handleSLRBalanceUpdate() {
    console.log("Fetching SLR token balance...");
    try {
      const updatedBalance = await getSLRTokenBalance();
      console.log("Fetched balance:", updatedBalance);
      setSLRBalance(updatedBalance);
    } catch (error) {
      console.error("Failed to fetch SLR token balance:", error);
    }
  }

  async function handleSubmit() {
    createSellOrder(noOfTokens, price, optionPrice, optionDuration);
    setPrice(0);
    setNoOfTokens(0);
    setOptionPrice(0);
    setOptionDuration(0);
  }

  function handleNoOfTokenUpdate(noOfTokens) {
    console.log("incoming token", noOfTokens);
    setNoOfTokens(noOfTokens);
  }

  function handlepriceUpdate(price) {
    console.log("incoming token", price);
    setPrice(price);
  }

  function handleOptionPriceUpdate(price) {
    console.log("incoming token", price);
    setOptionPrice(price);
  }

  function handleOptionDurationUpdate(duration) {
    console.log("incoming token", duration);
    setOptionDuration(duration);
  }

  useEffect(() => {
    handleSLRBalanceUpdate();
  }, []);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  

  return (
    <div className=" h-max-screen w-full bg-black ">
      <Navbar />
      
      {/* <button
        onClick={() => {
          handleSLRBalanceUpdate();
        }}
        <div className=" mt-36 text-white items-center justify-center w-full">
        <div className=" text-4xl font-extrabold tracking-tight lg:text-5xl text-center border-1 rounded-xl content-center font-roboto p-2 border-2 mx-48 border-white py-5 ">
          You have generated <mark className="px-5 rounded-lg bg-white"><span className="text-green-600">{SLRBalance}</span></mark>{" "}
          SLR tokens{" "}
      >
        click
      </button> */}

      <div className=" mt-36 text-white items-center justify-center w-full">
        <div className=" text-4xl font-extrabold tracking-wide lg:text-5xl text-center border-1 rounded-md content-center font-Roboto p-2 border-2 mx-48 py-5 border-white ">
          You have generated <mark className="px-5 rounded-lg bg-white"><span className="text-green-600">{SLRBalance}</span></mark>{" "}
          SLR tokens{" "}
        </div>

        <div className="flex flex-row ml-96 mb-16">
        <div className="ml-20  w-1/2  mt-12  bg-gray-600 p-6">
  <label
    htmlFor="default-input"
    className="block mb-6 font-roboto font-semibold tracking-tight text-white text-center text-4xl"
  >
    List Sales
  </label>

  <div className="border-2 p-8 w-full bg-slate-500 rounded-lg">
    <div className="flex flex-col">
      <label htmlFor="noOfTokensField" className="text-xl font-semibold mt-5 text-white">
        No of Tokens
      </label>
      <input
        type="number"
        id="noOfTokensField"
        placeholder="No of tokens"
        value={noOfTokens}
        onChange={(e) => handleNoOfTokenUpdate(e.target.value)}
        className="mt-2 mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-md font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />

      <label htmlFor="priceField" className="text-xl mt-5 font-semibold text-white">
        Total Price (chain)
      </label>
      <input
        type="number"
        id="priceField"
        placeholder="Total price"
        value={price}
        onChange={(e) => handlepriceUpdate(e.target.value)}
        className="mt-2 mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-md font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />

      <label htmlFor="toggle" className="inline-flex items-center cursor-pointer mb-6">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          id="toggle"
          checked={toggle}
          onChange={handleToggle}
        />
        <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-xl font-semibold text-white">
          Offer as Option
        </span>
      </label>

      <div className={`w-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${toggle ? 'max-h-screen' : 'max-h-0'}`}>
        <label htmlFor="optionPriceField" className="text-xl font-semibold mt-5 text-white">
          Price for Option (amoy)
        </label>
        <input
          type="number"
          id="optionPriceField"
          value={optionPrice}
          onChange={(e) => handleOptionPriceUpdate(e.target.value)}
          className="mt-2 mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />

        <label htmlFor="optionDurationField" className="text-xl font-semibold mt-5 text-white">
          Duration for Option (In seconds)
        </label>
        <input
          type="number"
          id="optionDurationField"
          value={optionDuration}
          onChange={(e) => handleOptionDurationUpdate(e.target.value)}
          className="mt-2 mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>

      <button
        onClick={() => {
          handleSubmit();
          toast.success('Sale successfully!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }}
        className="self-center border-2 w-1/2 mt-4 p-2 rounded-full hover:bg-white hover:border-black hover:text-black font-roboto font-semibold text-2xl text-white transition-all duration-300"
      >
        Sale
      </button>
    </div>
  </div>
</div>


        <div className=" m-5 p-10"></div>
        </div>
      </div>
    </div>
  );
}

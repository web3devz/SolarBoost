"use client";
import { useEffect, useState } from "react";
import { getAllEligiblePromotions, generateDiscountCode } from "../../utils";
import Nabvar from "@/components/Navbar";

export default function Promotions() {
  const [shopName, setShopName] = useState("");
  const [shopApi, setShopApi] = useState("");
  const [code, setCode] = useState("xxxxx");

  const handleCodeGeneration = async (shopifyToken, shopifyStore) => {
    const res = await generateDiscountCode(20, "ll", shopApi, shopName);
    setCode(res.code);
  };
  useEffect(() => {
    (async () => {
      const res = await getAllEligiblePromotions();
      const resArr = res[0].split(",");
      setShopName(resArr[0]);
      setShopApi(resArr[1]);
      console.log(resArr);
    })();
  }, []);

  return (
    <div className="bg-black">
    <Nabvar />
    <span className="flex text-white mt-32 content-center justify-center my-6 text-5xl tracking-tight font-bold">Redeem Your Reward .</span> 
    <div className="flex  content-center justify-center">
        <div className="w-1/3 border-2 border-gray-800 rounded-md shadow bg-gray-400 ">
        <span className="ml-5 mt-5 font-semibold text-2xl">Shop Name</span>
        <div className=" border-2 rounded-lg m-2 ml-5 text-xl w-1/2 px-3">
        {shopName.split(".")[0]}
        </div>
        <span className="ml-5 mt-5 font-semibold text-2xl">Shop URL</span>
        <div className=" border-2 rounded-lg m-2 ml-5 text-lg font-bold w-1/2 px-3">
        {shopName}
        </div>
        <span className="border-2 border-black ml-5 mb-3 rounded-full mt-3 py-1 px-4 bg-white font-semibold">
            {code}
        </span>
        <button 
        onClick={handleCodeGeneration}
        className="border-2 border-black ml-5 mb-3 rounded-full mt-3 px-4 py-1 bg-white hover:bg-blue-400 hover:text-black font-semibold">
            Generate code 
        </button>
        </div>
        
    </div>
</div>

    // <div>
    //   {code}
    //   <button onClick={handleCodeGeneration}>generate code </button>
    // </div>
  );
}

"use client";
import BrandNabvar from "@/components/BrandNav";
import { addPromotionSecret, hashValues, unhashValues } from "@/utils";
import { useState } from "react";
export default function Setup() {
  const [brandStore, setBrandStore] = useState();
  const [brandApiKey, setBrandApiKey] = useState();
  function cleanShopifyUrl(url) {
    // Remove the protocol (http:// or https://)
    url = url.replace(/^https?:\/\//, "");

    // Remove any path or query parameters after the domain
    url = url.replace(/\/.*$/, "");

    // Extract the subdomain and domain
    const parts = url.split(".");

    if (parts.length >= 3 && parts[parts.length - 2] === "myshopify") {
      // Return the last 3 parts (subdomain.myshopify.com)
      return parts.slice(-3).join(".");
    } else {
      // Return an empty string if the URL is not in the expected format
      return "";
    }
  }
  const handleAddPromotionSecret = async (e) => {
    e.preventDefault();
    const shopifyStoreName = cleanShopifyUrl(brandStore);
    const inputSecret = shopifyStoreName + "," + brandApiKey;
    // console.log(brandApiKey);
    const hashedPromotionSecret = await hashValues(
      shopifyStoreName,
      brandApiKey
    );
    // const res = await unhashValues(hashedPromotionSecret);
    // console.log(res);

    // console.log(inputSecret);
    const res = await addPromotionSecret(inputSecret);
    console.log(res);
  };
  return (
    <div className="bg-black">
      <BrandNabvar />
      <h1 className="text-white text-center mt-10 text-7xl font-bold">Setup Your Shopify Store</h1>
      <div className="flex flex-row content-center justify-center mt-36">
        <form
          onSubmit={handleAddPromotionSecret}
          className="py-10 px-5 mx-40 flex flex-col border-black rounded-md bg-slate-300 border-2 w-1/2 "
        >
          <label className="text-2xl font-bold">Shopify store Name</label>
          <input
            onChange={(e) => {
              setBrandStore(e.target.value);
            }}
            className="text-center border border-black rounded-md py-1 font-semibold"
            type="text"
            placeholder="store name"
          />

          <label className="mt-8 text-2xl font-bold">Shopify store API</label>
          <input
            onChange={(e) => {
              setBrandApiKey(e.target.value);
            }}
            className="text-center border border-black rounded-md py-1 font-semibold"
            type="text"
            placeholder="store API"
          />

          <button className="mt-5 text-xl bg-blue-500 hover:bg-blue-400 rounded-lg font-semibold border border-black w-1/2 ml-32">
            Setup Brand
          </button>
        </form>
        <h1 className=" font-extrabold tracking-tight text-white text-5xl mx-10 py-3">
          Setup your brand Seamlessly with 
          SolarXM.
        </h1>
      </div>
    </div>
  );
}

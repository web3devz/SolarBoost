"use client";
import { checkIsBrand, registerAsBrand } from "@/utils";
import BrandNav from "../../components/BrandNav";
import { useEffect, useState } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";


export default function Brand() {
  const [hasJoined, setHasJoined] = useState(false);
  useEffect(() => {
    const checkBrandValidity = async () => {
      const result = await checkIsBrand();
      if (result) {
        setHasJoined(true);
      }
      console.log("is brand ?", result);
    };

    checkBrandValidity();
  }, [hasJoined]);

  return (
    <div className="bg-black">
      <BrandNav />
      {/* <h1 className="scroll-m-20 text-5xl text-center font-extrabold tracking-tight lg:text-6xl mt-10">
                    Setup your <mark className="bg-cyan-500 ml-1 rounded-lg px-3">Brand</mark> .
                 </h1> */}
      <div className="h-[40rem] w-full rounded-md  relative flex flex-col items-center justify-center antialiased">
      <div className=" p-4">
        <h1 className="relative z-50 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-400  text-center font-sans font-bold">
          Join the Revolution With Us
        </h1>
        <p></p>
        <p className="text-neutral-300 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
        SolarXM introduces an innovative ecosystem to accelerate the adoption and generation of renewable energy. With the GenSensor technology, individuals can attach smart sensors to their green energy sources, like solar panels, to track and convert energy production into digital tokens. This mechanism not only encourages renewable energy generation but also allows for the creation and trade of green energy certificates in our marketplace, promoting transparency and economic activity within the green energy sector. 
        </p>
        <div className="flex flex-wrap content-center  justify-center">
        <button
      className="border-2 px-8 text-3xl font-bold font-Roboto bg-gray-200 hover:bg-white hover:text-black text-black border-black py-1 mt-5 mb-24 "
        onClick={async () => {
          const res = await registerAsBrand();
          console.log(res);
        }}
      >
        {hasJoined ? "successfully joined" : "Join SolarXM"}
      </button>
      </div>
      </div>
     
    </div>
      
    </div>
  );
}

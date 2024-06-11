"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Innovative Sensor Technology",
    description:
      "Tracks and Converts Renewable Energy Production into Digital Tokens: The cutting-edge sensor technology precisely monitors renewable energy generation, whether from solar, wind, or other sources. ",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Innovative Sensor Technology
      </div>
    ),
  },
  {
    title: "Green Energy Token Marketplace",
    description:
      "Enables Buying and Selling of Tokens Representing Renewable Energy Generation: The marketplace allows users to trade tokens that symbolize generated renewable energy, promoting transparency and liquidity in the green energy market. ",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        Green Energy Token Marketplace
      </div>
    ),
  },
  {
    title: "Tackles Carbon Footprint",
    description:
      "Directly Addresses Climate Change by Motivating Carbon Emission Reduction: The system incentivizes the shift towards renewable energy by rewarding users for their green energy contributions. This proactive approach helps lower the global carbon footprint, as more individuals and businesses are motivated to adopt sustainable energy solutions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Tackles Carbon Footprint
      </div>
    ),
  },
  {
    title: "Economic Incentives for Green Energy",
    description:
      "Offers Financial Rewards for Clean Energy Production and Consumption: The token system provides tangible economic benefits to those who invest in and utilize renewable energy. This financial model lowers the barrier to entry for renewable energy projects, making them more appealing and viable.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Economic Incentives for Green Energy
      </div>
    ),
  },
];
export function StickyScrollRevealDemo() {
  return (
    <div className="p-10">
      <StickyScroll content={content} />
    </div>
  );
}

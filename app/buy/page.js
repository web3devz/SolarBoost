"use client";
import Navbar from "../../components/Navbar";
import {
  getOrdersArray,
  addGenStation,
  getMarketPrice,
  getSLRTokenBalance,
} from "../../utils";
import Card from "../../components/Card";
import { GridBackground } from "@/components/Grid"

export default function Buy() {
  return (
    <div className="w-full h-max-screen ">
      <Navbar />
      <GridBackground />
    </div>
  );
}

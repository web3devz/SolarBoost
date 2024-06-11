import React from "react";
import { FlipWords } from "@/components/ui/flip-words";

export function FlipWordsDemo() {
  const words = ["better", "Sustainable", "beautiful", "Green"];

  return (
    <div className="h-[4rem] flex justify-center items-center px-2">
      <div className="text-7xl font-Roboto text-white font-bold">
        Build
        <FlipWords words={words} /> 
        Future with us !
      </div>
    </div>
  );
}

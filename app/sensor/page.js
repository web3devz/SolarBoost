"use client";
import { useEffect, useState } from "react";
import { addGenStation } from "../../utils";
import Navbar from "@/components/Navbar";
import { ToastContainer, toast , Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FlipWords } from "@/components/ui/flip-words";

function AddGenSensor() {
  const [code, setCode] = useState("");
  function handleAddSensor() {
    addGenStation(code);
  }; 
  const handleClick = () => {
    
      handleAddSensor();

      toast.success('GenSensor Added Successfully !', {
      position: "bottom-right",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
      });
    // ...
  };
  
  const combinedFunction = () => {
    handleClick();
    // Call other functions or perform additional actions
  };

  return (
    <>
      <Navbar />
      <div className="pt-40 bg-black text-white text-center font-Roboto font-bold text-7xl tracking-tight">
        Enter your secret code
      </div>
      <div className="bg-black">
      <div className=" text-center border-2 border-zinc-950 w-1/2 ml-96 rounded-lg p-8">
        <input
          className="text-black text-2xl font-semibold h-10 w-64 mt-10 rounded-md border-2 border-slate-900"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            //console.log(code);
          }}
          type="text"
        />

        <button
          className="border ml-8 px-5 py-1.5 font-bold rounded-xl bg-slate-700 text-white hover:bg-white hover:text-black"
          onClick={combinedFunction}
        >
          ADD
        </button>
        <ToastContainer />
        


        <p className="text-xl mt-16 font-medium">
        &quot; Add sensors to make sure their reportings are added to your account
        &quot;
        </p>
      </div>
      </div>

    
    </>
  );
}
export default AddGenSensor;

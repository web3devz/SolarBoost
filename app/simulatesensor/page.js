"use client";
import {
  getNearbyWeatherXMDevices,
  getSolarIrradiance,
  findClosestDeviceIndex,
  simulateSensorSendingData,
} from "@/utils";
import { useEffect, useState } from "react";
import Nabvar from "@/components/Navbar";

let intervalId; // Define intervalId outside of the component

export default function SimulateSensor() {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [solarIrradiance, setSolarIrradiance] = useState(null);
  const [voltage, setVoltage] = useState(0);
  const [current, setCurrent] = useState(0);
  const [time, setTime] = useState(0.5);
  const [capturing, setCapturing] = useState(false);
  const [totalEnergyUsed, setTotalEnergyUsed] = useState(0);
  const [totalExpectedOutput, setTotalExpectedOutput] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasStopped, setHasStopped] = useState(false);

  const fetchSolarIrradiance = async () => {
    try {
      const closestDeviceIndex = await findClosestDeviceIndex(
        latitude,
        longitude
      );
      console.log("Closest device index:", closestDeviceIndex);

      const res2 = await getSolarIrradiance(closestDeviceIndex);
      if (res2) {
        const irradiance = res2[0].current_weather.solar_irradiance;
        console.log("Solar irradiance for current location is", irradiance);
        setSolarIrradiance(irradiance);
      }
    } catch (error) {
      console.error(
        "Error finding closest device index or getting solar irradiance:",
        error
      );
    }
  };

  useEffect(() => {
    if (capturing) {
      fetchSolarIrradiance();
    }
  }, [latitude, longitude, capturing, fetchSolarIrradiance]);

  useEffect(() => {
    const calculateAndAccumulate = () => {
      const energyUsed = 0.5 * voltage * current; // Time is always 0.5 hours per interval
      setTotalEnergyUsed((prevTotal) => prevTotal + energyUsed);

      if (solarIrradiance !== null) {
        const panelArea = 18 * 0.092903; // 18 square feet to square meters
        const efficiency = 0.2;
        const expectedOutput = solarIrradiance * panelArea * efficiency * 0.5; // Time is always 0.5 hours per interval
        setTotalExpectedOutput((prevTotal) => prevTotal + expectedOutput);
      }
    };

    if (capturing && solarIrradiance !== null) {
      calculateAndAccumulate();
    }
  }, [time, solarIrradiance, voltage, current, capturing]);

  const handleLongitudeChange = (e) => {
    setLongitude(parseFloat(e.target.value));
  };

  const handleLatitudeChange = (e) => {
    setLatitude(parseFloat(e.target.value));
  };

  const handleVoltageChange = (e) => {
    setVoltage(parseFloat(e.target.value));
  };

  const handleCurrentChange = (e) => {
    setCurrent(parseFloat(e.target.value));
  };

  const updateCaptureData = () => {
    setTime((prevTime) => prevTime + 0.5);
  };

  const startCapture = () => {
    setCapturing(true);
    setHasStarted(true);
    setHasStopped(false);
    intervalId = setInterval(async () => {
      await fetchSolarIrradiance();
      updateCaptureData();
    }, 10000); // Capture every 10 seconds
  };

  const stopCapture = () => {
    setCapturing(false);
    clearInterval(intervalId);
    intervalId = null;
    setHasStopped(true); // Set hasStopped after clearing the interval
  };

  const sendToSmartContract = () => {
    // Placeholder function to interact with the smart contract
    console.log("Data sent to the smart contract");
  };

  const getButtonToShow = () => {
    if (!hasStopped) return null;

    const roundedTotalEnergyUsed = Math.round(totalEnergyUsed);
    const roundedTotalExpectedOutput = Math.round(totalExpectedOutput);
    const energyDiff = roundedTotalExpectedOutput - roundedTotalEnergyUsed;
    const tolerance = Math.round(roundedTotalExpectedOutput * 0.1);

    console.log("Energy difference:", energyDiff);
    console.log("Tolerance:", tolerance);
    console.log(
      "Absolute energy difference <= tolerance:",
      Math.abs(energyDiff) <= tolerance
    );
    console.log(
      "Total energy used > total expected output * 1.1:",
      roundedTotalEnergyUsed > roundedTotalExpectedOutput * 1.1
    );

    if (Math.abs(energyDiff) <= tolerance) {
      return (
        <button
          className=" text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1.5 text-center"
          type="button"
        >
          Send to Smart Contract
        </button>
      );
    } else if (roundedTotalEnergyUsed > roundedTotalExpectedOutput * 1.1) {
      return (
        <button
          className=" text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1.5 text-center"
          type="button"
        >
          Anomaly Detected Cannnot Send Data to Smart Contract
        </button>
      );
    }
    return null;
  };

  const slrTokens = totalEnergyUsed / 200;

  return (
    <div className="bg-black">
      <Nabvar />
      <div className=" flex mt-20 max-h-screen text-white w-full">
        <div className="border-r-2 w-1/2">
          <div className="text-white mt-24 mb-48">
            <h2>Simulating for sensor code &quot;rn285&quot;</h2>
            <form className=" text-white ml-16 pr-20 ">
              <div className="mb-3 w-1/2">
                <label className="block mb-2 text-lg font-medium text-white">
                  Longitude
                </label>
                <input
                  type="number"
                  value={longitude}
                  onChange={handleLongitudeChange}
                  step="0.000001"
                  className="bg-gray-50 border border-gray-300 text-gray-900 font-medium text-sm rounded-lg block w-full p-1.5"
                  placeholder="Longitude"
                />
              </div>

              <div className="mb-5 w-1/2">
                <label className="block mb-2 text-lg font-medium text-white">
                  Latitude
                </label>
                <input
                  type="number"
                  value={latitude}
                  onChange={handleLatitudeChange}
                  step="0.000001"
                  className="bg-gray-50 border border-gray-300 text-gray-900 font-medium text-sm rounded-lg block w-full p-1.5"
                  placeholder="Latitude"
                />
              </div>

              <h2 className="ml-5 mt-8 text-yellow-400 font-semibold text-2xl mb-2">
                Enter Voltage and Current
              </h2>

              <div className="mb-3 w-1/2">
                <label className="block mb-2 text-lg font-medium text-white">
                  Voltage (V)
                </label>
                <input
                  type="number"
                  value={voltage}
                  onChange={handleVoltageChange}
                  step="0.1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 font-medium text-sm rounded-lg block w-full p-1.5"
                  placeholder="Voltage"
                />
              </div>

              <div className="mb-5 w-1/2">
                <label className="block mb-2 text-lg font-medium text-white">
                  Current (A)
                </label>
                <input
                  type="number"
                  value={current}
                  onChange={handleCurrentChange}
                  step="0.1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 font-medium text-sm rounded-lg block w-full p-1.5"
                  placeholder="Current"
                />
              </div>
            </form>
            <br />
            {!capturing ? (
              <button
                className="ml-16 text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1.5 text-center"
                type="button"
                onClick={startCapture}
              >
                Start Capture
              </button>
            ) : (
              <button
                className="ml-16 text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1.5 text-center"
                type="button"
                onClick={stopCapture}
              >
                Stop Capture
              </button>
            )}
          </div>
        </div>

        <div className=" w-1/2 text-center mt-32">
          <div className="text-white text-2xl font-semibold text-left ml-16 font-Roboto">
            {solarIrradiance !== null && (
              <div className="gap-y-20">
                <h1 className="my-2">
                  Solar Irradiance: {solarIrradiance} W/m²
                </h1>
                <h2 className="my-2">
                  Total Energy Used: {totalEnergyUsed.toFixed(2)} Wh
                </h2>
                <h2 className="my-2">
                  Total Expected Solar Panel Output:{" "}
                  {totalExpectedOutput.toFixed(2)} Wh
                </h2>
              </div>
            )}

            <h2 className="my-2">SLR Tokens</h2>
            <p className="my-2">
              You will receive{" "}
              <span className="text-emerald">{slrTokens.toFixed()}</span> SLR
              tokens
            </p>
            {hasStopped &&
              (totalEnergyUsed > totalExpectedOutput ? (
                <button
                  onClick={() => {
                    simulateSensorSendingData(slrTokens.toFixed());
                  }}
                  className=" text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1.5 text-center"
                  type="button"
                >
                  Anomaly Detected: Can&apos;t Send Data to Smart Contract
                </button>
              ) : (
                <button
                  onClick={() => {
                    simulateSensorSendingData(slrTokens.toFixed());
                  }}
                  className=" text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1.5 text-center"
                  type="button"
                >
                  Send to Smart Contract
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { ethers, parseEther, parseUnits } from "ethers";
import { registryAbi, registryAddress } from "./contractRefs";
import { getSHA256Hash } from "boring-webcrypto-sha256";

let signer = null;

let provider;

export async function connectWithMetamask() {
  if (window.ethereum == null) {
    console.log("MetaMask not installed; using read-only defaults");
    provider = ethers.getDefaultProvider();
    console.log(provider);
  } else {
    provider = await new ethers.BrowserProvider(window.ethereum);
    console.log(provider);

    signer = await provider.getSigner();
    console.log(signer);
    return await provider.send("eth_requestAccounts", [0]);
  }
}
connectWithMetamask();

export async function counterTest() {
  connectWithMetamask();
  console.log(provider);
  console.log(signer);
  const abi = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_newNumber",
          type: "uint256",
        },
      ],
      name: "updateNumber",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "number",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const address = "0x3ae16B796f9e3aCa9Ae7E830679D53658d6Eb63d";
  const contract = new ethers.Contract(address, abi, signer);
  const tx = await contract.updateNumber(10);

  console.log(tx);
}

export async function createSellOrder(
  _noOfSLRTokens = 0,
  _sellPrice = 0,
  _leasePrice = 0,
  _duration = 0
) {
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, signer);
  const tx = await contract.listOrder(
    ethers.parseEther(_sellPrice.toString()),
    _noOfSLRTokens,
    ethers.parseEther(_leasePrice.toString()),
    _duration
  );
  console.log(tx);
}

export async function buyOrder(orderId, value) {
  console.log(typeof value);
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, signer);
  const gasPrice = parseUnits("20", "gwei");
  const gasLimit = 300000;
  const tx = await contract.createBuyOrder(orderId, {
    value: value,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
  });
  console.log(tx);
}

export async function buyOption(orderId, value) {
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, signer);
  const gasPrice = parseUnits("20", "gwei");
  const gasLimit = 300000;
  const tx = await contract.takeOnOption(orderId, {
    value: value,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
  });
  console.log(tx);
}

export async function createLeaseOrder(_sellPrice, _noOfSLRTokens, _duration) {
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, signer);
  const tx = await contract.createSellOrder(
    ethers.parseEther(_sellPrice),
    _noOfSLRTokens,
    _duration
  );
  console.log(tx);
}

export async function getSLRTokenBalance() {
  await connectWithMetamask();
  // console.log(signer.address);
  const abi = registryAbi;
  const address = registryAddress;
  // console.log(address);
  // console.log(abi);
  // console.log(provider);
  const contract = new ethers.Contract(address, abi, provider);
  const tx = await contract.balances(signer.address);
  //await tx.wait();
  //console.log(tx.toString());
  return tx.toString();
}

export async function getRECTokenBalance() {
  await connectWithMetamask();
  // console.log(signer.address);
  const abi = registryAbi;
  const address = registryAddress;
  // console.log(address);
  // console.log(abi);
  // console.log(provider);
  const contract = new ethers.Contract(address, abi, provider);
  const tx = await contract.recBalances(signer.address);
  //await tx.wait();
  //console.log(tx.toString());
  return tx.toString();
}

export async function getMarketPrice() {
  await connectWithMetamask();
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, provider);
  const tx = await contract.credsMarketPrice();

  return (Number(tx / 1000000000000000n) / 1000).toString();
}

export async function getOrdersArray() {
  await connectWithMetamask();
  //console.log(signer.address);
  const abi = registryAbi;
  const address = registryAddress;
  //console.log(address);
  //console.log(abi);
  //console.log(provider);
  const contract = new ethers.Contract(address, abi, provider);
  const arrayLength = await contract.returnOrdersArrayLength();
  const ordersArray = [];
  //await tx.wait();
  //console.log(Number(arrayLength));
  for (let i = 0; i <= Number(arrayLength) - 1; i++) {
    //console.log(i);
    const currOrder = await contract.orderArray(i);
    //console.log(currOrder);
    ordersArray.push(currOrder);
    //console.log(ordersArray);
  }
  return ordersArray;
}

export async function addGenStation(_code) {
  const encodedCode = await getSHA256Hash(_code);
  console.log(encodedCode);
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, signer);
  console.log(contract);

  const tx = await contract.addGenStation(encodedCode);
  console.log(tx);
}

export async function updateSLRTokenBalance() {
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, signer);
}

export async function registerAsBrand() {
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, signer);
  const gasPrice = parseUnits("20", "gwei");
  const gasLimit = 300000;
  const tx = await contract.registerAsBrand({
    gasPrice: gasPrice,
    gasLimit: gasLimit,
  });
  console.log(tx);
}
export async function consumeToken(orderId, value) {
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, signer);
  const gasPrice = parseUnits("20", "gwei");
  const gasLimit = 300000;
  const tx = await contract.consumeToken(orderId, {
    value: value,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
  });
  console.log(tx);
}

export async function addPromotionSecret(promotionSecret) {
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, signer);
  const gasPrice = parseUnits("20", "gwei");
  const gasLimit = 300000;
  const tx = await contract.addPromotionSecret(promotionSecret, {
    gasPrice: gasPrice,
    gasLimit: gasLimit,
  });
  console.log(tx);
}

export async function simulateSensorSendingData(newValue) {
  console.log("called");
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, signer);
  const gasPrice = parseUnits("20", "gwei");
  const gasLimit = 300000;
  const tx = await contract.updateSLRTokenBalance(
    "2105742f5adb229dd4be3898314fdd0f0dd35efbf0a5724cc7d5a17eee9afd1f",
    newValue,
    {
      gasPrice: gasPrice,
      gasLimit: gasLimit,
    }
  );
  console.log(tx);
}

export async function checkIsBrand() {
  await connectWithMetamask();
  // console.log(signer.address);
  const abi = registryAbi;
  const address = registryAddress;
  // console.log(address);
  // console.log(abi);
  // console.log(provider);
  const contract = new ethers.Contract(address, abi, provider);
  const tx = await contract.isBrand(signer.address);
  //await tx.wait();
  //console.log(tx.toString());
  return tx;
}

export async function hashValues(value1, value2) {
  let hashedValue = "";
  const separator = "|"; // Separator to distinguish between hashed values

  for (let i = 0; i < Math.max(value1.length, value2.length); i++) {
    const char1 = value1[i] || "";
    const char2 = value2[i] || "";
    hashedValue += String.fromCharCode(
      char1.charCodeAt(0) ^ char2.charCodeAt(0)
    );
  }

  return hashedValue + separator + value1.length + separator + value2.length;
}

export async function unhashValues(hashedString) {
  const [hashedValue, length1, length2] = hashedString.split("|");
  let value1 = "";
  let value2 = "";

  for (let i = 0; i < hashedValue.length; i++) {
    const char = hashedValue[i];
    const char1 = value1[i] || "";
    const char2 = value2[i] || "";
    const unhashedChar = String.fromCharCode(
      char.charCodeAt(0) ^ char1.charCodeAt(0) ^ char2.charCodeAt(0)
    );

    if (i < length1) {
      value1 += unhashedChar;
    } else {
      value2 += unhashedChar;
    }
  }

  return { store: value1, key: value2 };
}
export async function getAllEligiblePromotions() {
  await connectWithMetamask();
  // console.log(signer.address);
  const abi = registryAbi;
  const address = registryAddress;
  // console.log(address);
  // console.log(abi);
  // console.log(provider);
  const contract = new ethers.Contract(address, abi, provider);
  const tx = await contract.getAllEligiblePromotions(signer.address);
  //await tx.wait();
  //console.log(tx.toString());
  return tx;
}
export async function removeUsedPromotion() {
  const abi = registryAbi;
  const address = registryAddress;
  const contract = new ethers.Contract(address, abi, signer);
  const gasPrice = parseUnits("20", "gwei");
  const gasLimit = 300000;
  const tx = await contract.removeUsedPromotion({
    gasPrice: gasPrice,
    gasLimit: gasLimit,
  });
  console.log(tx);
}

export async function generateDiscountCode(
  percentage,
  code,
  accessToken,
  shopName
) {
  try {
    const response = await fetch("/api/genPromoCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        percentage: percentage,
        code: code,
        accessToken: accessToken,
        shopName: shopName,
      }),
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.log("An error occurred while creating the discount code.");
    }
  } catch (error) {
    console.error("Error creating discount code:", error);
  }
}
export async function getNearbyWeatherXMDevices(param) {
  const response = await fetch(
    `https://api.weatherxm.com/api/v1/network/search?query=${param}&exact=false&exclude=places`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function getSolarIrradiance(param) {
  const response = await fetch(
    `https://api.weatherxm.com/api/v1/cells/${param}/devices`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

async function fetchWeatherxmData() {
  const url = "https://api.weatherxm.com/api/v1/cells/";
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  // Euclidean distance
  return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2));
}

export async function findClosestDeviceIndex(targetLat, targetLon) {
  const data = await fetchWeatherxmData();
  if (!data.length) {
    return null;
  }

  let closestIndex = null;
  let smallestDistance = Infinity;

  data.forEach((entry) => {
    const centerLat = entry.center.lat;
    const centerLon = entry.center.lon;
    const distance = calculateDistance(
      targetLat,
      targetLon,
      centerLat,
      centerLon
    );
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestIndex = entry.index;
    }
  });

  return closestIndex;
}

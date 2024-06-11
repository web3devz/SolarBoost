import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
export default function Nabvar() {
    return(
        <div className="">
            <nav className=" fixed w-full z-20 top-0 start-0 border-b border-gray-800 bg-gray-300 backdrop-blur-md rounded-b-full ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link legacyBehavior href="/landing">
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://static.vecteezy.com/system/resources/previews/001/194/541/original/lightning-png.png" className="h-8" alt="Flowbite Logo" />
                <span className="self-center text-3xl font-semibold whitespace-nowrap ">SolarXM</span>
            </a>
            </Link>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <ConnectButton chainStatus="none"/>
            
            </div>
            
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
             <ul className="flex flex-col p-4 md:p-0 mt-4 font-semibold md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 text-black  ">
            <Link legacyBehavior href="/sensor">
            <li>
             <a href="#" className="block rounded-lg px-1 py-1 text-black text-xl" aria-current="page">Add Sensor</a>
            </li>
            </Link>

            <Link legacyBehavior href="/sale">
            <li>
             <a href="#" className="block rounded-lg px-1 py-1 text-black text-xl" aria-current="page">Sale</a>
            </li>
            </Link>

            <Link legacyBehavior href="/buy">
            <li>
             <a href="#" className="block rounded-lg px-1 py-1 text-black text-xl" aria-current="page">Buy</a>
            </li>
            </Link>

            <Link legacyBehavior href="/promotions">
            <li>
            <a href="#" className="block rounded-lg px-1 py-1 text-black text-xl">My Rewards</a>
            </li>
            </Link>

            <Link legacyBehavior href="/brand">
            <li>
            <a href="#" className="block text-black text-xl bg-yellow-200 px-1 py-1 rounded-lg">Brands</a>
            </li>
            </Link>

            <Link legacyBehavior href="/simulatesensor">
            <li>
            <a href="#" className="block text-black text-xl bg-yellow-200 px-1 py-1 rounded-lg focus:bg-amber-400">Simulate sensor</a>
            </li>
            </Link>
            </ul>
            </div>
            </div>
             </nav>
        </div>
    )
}
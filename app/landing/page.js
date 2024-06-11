"use client"
import Navbar from "@/components/Navbar"
import { FlipWordsDemo } from "@/components/Flip"
import GradualSpacing from "@/components/magicui/gradual-spacing";
import { StickyScrollRevealDemo } from "@/components/Reveal";
import  { AnimatedListDemo } from "@/components/AnimatedCards";
export default function Landing(){
    return(
        <div className="items-center justify-between bg-black max-h-screen">
            <Navbar />
            
                <div className="mt-32">
                    <h1 className="text-white  text-center text-9xl font-extrabold bg-clip-text text-transparent text-gradient">SolarXM</h1>
                    <FlipWordsDemo />
                </div>

                <div className="flex mx-56 items-center justify-between mt-3">
                <figure class="max-w-lg  items-center justify-center">
                    <img class="h-auto max-w-full rounded-lg" src="https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image description" />
                    <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400"></figcaption>
                </figure>
                <figure class="max-w-lg  items-center justify-center">
                    <img class="h-auto max-w-full rounded-lg" src="https://images.pexels.com/photos/3619870/pexels-photo-3619870.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image description" />
                    <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400"></figcaption>
                </figure>
                </div>
                

               <GradualSpacing
                 className="font-display text-center text-4xl font-bold tracking-[-0.1em] text-white md:text-7xl mt-16 md:leading-[5rem]"
                text="Features of SolarXM"
                />
                <div className=" mx-96">
                <AnimatedListDemo />
                </div>
                <StickyScrollRevealDemo />

                

<footer class=" rounded-lg shadow m-4 bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm  sm:text-center text-gray-400">@2024 <a href="#" class="hover:underline">SolarXM</a>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
        <li>
            <a href="https://github.com/akashbiswas0/SolarXM" class="hover:underline me-4 md:me-6">About</a>
        </li>
        <li>
            <a href="https://github.com/akashbiswas0/SolarXM" class="hover:underline me-4 md:me-6">Licensing</a>
        </li>
        <li>
            <a href="https://github.com/akashbiswas0" class="hover:underline">Contact</a>
        </li>
    </ul>
    </div>
</footer>

                
        </div>
    )
}
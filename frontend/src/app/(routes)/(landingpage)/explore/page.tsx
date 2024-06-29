"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import Navbar from '@/components/landingpage/navbar'
import Loader from "@/components/landingpage/loading";
import Link from "next/link";
import Text from "@/components/landingpage/text";
import Features from "./Pages/Features/Features";
import Emogrid from "@/components/emogrid/emogrid";
import Globe from "@/components/purpleglobe/globe";
import {VelocityScroll} from "@/components/landingpage/scroll-based-velocity";
import Particles from "@/components/landingpage/particles";
import TextReveal from "@/components/landingpage/text-reveal";
import RevealAI from "@/components/landingpage/revealai";

export default function Home() {



 




  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3500);
  }, []);
  if (loading) {
    return <>
    
      <Loader />
    </>;
  } else {
    return (
      <>
 <Particles className="absolute w-full h-full"/>

        <Globe />
       

       
        <div className="relative z-10 p-3 gap-14 flex flex-col ">
          {/* <div className={` absolute backdrop-invert l h-[100px] w-[100px] rounded-[50%] -translate-x-[50%] -translate-y-[50%] `} style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}></div> */}

          <Navbar />





          <div className=" flex flex-col w-[70%]  justify-center">
            <Text />

            <div className="my-9 text-[1rem] text-justify w-[50%]">Connect with your friends and family. Expresso provides the best user-experience giving a seamless connection with lowest latency matched with power our all-new AI allowing you to express yourself easier than ever.</div>
          </div>






          <div className=" flex w-[100%] justify-between items-center gap-9">
            <div>
              <Emogrid />
            </div>

            <Link href="/signup" className="relative w-[100%] " >

              <div className="z-100 flex justify-center items-center w-[100%] rounded-full border-[2px] px-10  border-white  text-white uppercase text-[5rem] font-extrabold "> Sign Up</div>
            </Link>


          </div>

          {/* <VelocityScroll
      text="😀 😂 😅 😍 😎 🤓 🥳 🤩 🥺 😴 😶‍🌫️"
      default_velocity={3}
      className="  font-display text-center text-[3rem] font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white  md:leading-[5rem] "
    /> */}

            <TextReveal text="Expresso will change the way you connect." />
      
            <RevealAI text="Expresso Intelligence"/>

            
            
            <Features/>



<div className=" w-[100vw] h-[100vh]"></div>




        </div>


      </>
    );
  }
}

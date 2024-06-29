"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import Navbar from '@/components/landingpage/navbar'
import Loader from "@/components/landingpage/loading";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Text from "@/components/landingpage/text";
import Features from "./Pages/Features/Features";
import Emogrid from "@/components/emogrid/emogrid";
import Globe from "@/components/purpleglobe/globe";
import { VelocityScroll } from "@/components/landingpage/scroll-based-velocity";
import Particles from "@/components/landingpage/particles";
import TextReveal from "@/components/landingpage/text-reveal";
import RevealAI from "@/components/landingpage/revealai";
import BoxReveal from "@/components/landingpage/boxreveal";
import BoxReveal2 from "@/components/landingpage/boxreveal2";
import trapezium from "@/components/extras/Trapezium/Trapezium";
import Trapezium from "@/components/extras/Trapezium/Trapezium";
import { motion } from "framer-motion";
import Light from "@/components/landingpage/light";
import DotPattern from "@/components/landingpage/dotpattern";

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
        <Particles className="absolute w-full h-full" />

        <Globe />



        <div className="relative z-10 p-3 gap-14 flex flex-col ">
          {/* <div className={` absolute backdrop-invert l h-[100px] w-[100px] rounded-[50%] -translate-x-[50%] -translate-y-[50%] `} style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}></div> */}

          <Navbar />





          <div className=" flex flex-col w-[70%]  justify-center">

            <div className=' flex flex-col justify-center max-w-[800px]     items-center  '>
              <div className=' text-[6rem] uppercase font-extrabold w-[100%]  '>
                The Gen-z way to connect
              </div>
              <div className=' text-[2rem] font-semibold text-customorange-700 w-[100%]  '>
                <BoxReveal boxColor={"#F86400"} duration={0.5}>
                  <div>Don't let distances hold you back</div>
                </BoxReveal>
              </div>

            </div>

            <div className="my-9 text-[1rem] text-justify w-[50%]">
              <BoxReveal boxColor={"#FFFFFF"} duration={0.5}>
                <div>
                  Connect with your friends and family. Expresso provides the best user-experience giving a seamless connection with lowest latency matched with power our all-new AI allowing you to express yourself easier than ever.
                </div>
              </BoxReveal>
            </div>
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

          <div className="flex flex-col items-center">
            <TextReveal text="Expresso will change the way you connect." />


{/* 
            <div className="w-[90%] h-[70vh] relative bg-black shadow-lg  rounded-3xl " style={{boxShadow: "inset 0px 0px 100px 0px rgb(248,100,0,0.2)"}}>

              <DotPattern
                className={cn(
                  "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                )}
              />

            </div> */}

            {/* <RevealAI text="Expresso Intelligence"></RevealAI> */}

          </div>








          {/* <div className=" w-[100%] h-[20rem] flex justify-center">
          <BoxReveal2 boxColor={"#F86400"} duration={1}>
           <div className=" w-[95vw] h-[100%]"> 
kjsndfjk
           </div>
                  
          </BoxReveal2>
          </div> */}





          <div className=" w-[100vw] h-[100vh]"></div>




        </div>


      </>
    );
  }
}

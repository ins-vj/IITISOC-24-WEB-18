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
import Image from "next/image";
import Logo from "@/components/logo/logo";
import Typing from "@/components/landingpage/typing";
import Expressoprompt from "@/components/landingpage/expressoprompt";
import Intelligenceprompt from "@/components/landingpage/intelligenceprompt";

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

        <div className=" w-[100%] h-[110vh] absolute left-0 top-[-50px] animate-rise ">
          <Globe />
        </div>


        <div className="relative z-10  gap-14 flex flex-col ">

          <Navbar />





          <div className=" flex flex-col   justify-center p-3">

            <div className=' flex flex-col justify-center  2xl:max-w-[850px] items-center xl:max-w-[700px] lg:max-w-[600px] md:max-w-[450px] sm:max-w-[400px] max-w-[300px]  '>
              <div className='  text-[2rem] uppercase font-extrabold w-[100%] 2xl:text-[6rem] xl:text-[5rem] lg:text-[4rem] md:text-[3.5rem] sm:text-[3rem]  '>
                The Gen-z way to connect
              </div>
              <div className=' 2xl:text-[2rem] xl:text-[1.8rem] lg:text-[1.6rem] md:text-[1.4rem] sm:text-[1.2rem] text-[0.8rem] font-semibold text-customorange-700 w-[100%]  '>
                <BoxReveal boxColor={"#F86400"} duration={0.5}>
                  <div>Don't let distances hold you back</div>
                </BoxReveal>
              </div>

            </div>

            <div className="xl:my-9 lg:my-6 my-3 2xl:max-w-[620px] xl:max-w-[510px] lg:max-w-[430px] md:max-w-[370px] sm:max-w-[320px] max-w-[230px]  text-justify  2xl:text-[1rem] xl:text-[1rem] lg:text-[1rem] md:text-[0.9rem] sm:text-[0.9rem] text-[0.7rem]">
              <BoxReveal boxColor={"#FFFFFF"} duration={0.5}>
                <div>
                  Connect with your friends and family. Expresso provides the best user-experience giving a seamless connection with lowest latency matched with power our all-new AI allowing you to express yourself easier than ever.
                </div>
              </BoxReveal>
            </div>
          </div>






          <div className=" flex w-[100%] justify-between  gap-9 px-3 flex-col-reverse items-start md:flex-row md:items-center">
            <div>
              <Emogrid />
            </div>

            <Link href="/signup" className="relative w-[100%] " >

              <div className="z-100 flex justify-center items-center w-[100%] rounded-full border-[2px] px-10  border-white  text-white uppercase text-[5rem] font-extrabold max-[825px]:text-[4rem] "> Sign Up</div>
            </Link>


          </div>



          <div className="flex flex-col items-center">
            <TextReveal text="Expresso will change the way you connect." />


          </div>

















          <div className=" relative flex flex-col w-[100%] ">





            <Expressoprompt prompt="Expresso Intelligence" />
            <Intelligenceprompt prompt="Hi, I am a pre-trained model that can recoganize your facial-expressions and based on that can overlay emoji's that perfectly depicts your mood. Imagine talking to your friend in which you can vibe together on-screen full of your favourite emojis based on your moods." />

          </div>

          {/* <div className=" -z-10 top-0">
            <VelocityScroll className="  text-[rgb(50,50,50)] font-extrabold opacity-30 text-[1.3rem] min-[540px]:text-[2rem] 2xl:text-[10rem] xl:text-[4.5rem] lg:text-[3.5rem] md:text-[2.8rem] sm:text-[2.5rem]" text="EXPRESSO INTELLIGENCE" />
          </div>
          <div className=" -z-10 bottom-0 ">
            <VelocityScroll className=" text-customorange-700  font-extrabold opacity-30 text-[1.3rem] min-[540px]:text-[2rem] 2xl:text-[10rem] xl:text-[4.5rem] lg:text-[3.5rem] md:text-[2.8rem] sm:text-[2.5rem]" text="EXPRESSO INTELLIGENCE" />
          </div> */}



          <div className=" flex w-[100%] relative p-[8rem]">


         

          <div className=" w-[750px] bg-[rgb(10,10,10)] relative p-3 flex items-center justify-center ">
            <div className="">
              <span className=" text-[1.5rem] lowercase font-extrabold  2xl:text-[4rem] xl:text-[3.5rem] lg:text-[3rem] md:text-[2.6rem] sm:text-[2rem]" >Do More with </span><span className="text-customorange-700 text-[2rem] uppercase font-extrabold w-[50%] 2xl:text-[6rem] xl:text-[5rem] lg:text-[4rem] md:text-[3.5rem] sm:text-[3rem]">Expresso Intelligence</span>
            </div>
            
          </div>
          <div className=" left-[15rem] -z-10  -rotate-[15deg] absolute top-[6rem] w-[700px]  h-[550px] border-customorange-700 border-[3px]">
         
            </div>
          </div>

          <div className=" w-[100vw] h-[100vh]"></div>










        </div>


      </>
    );
  }
}

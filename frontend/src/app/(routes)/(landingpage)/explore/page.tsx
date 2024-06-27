"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import Navbar from './components/navbar'
import Loader from "./components/loading";
import Link from "next/link";
import Text from "./components/text";
import Page1 from "./Pages/page1";
import Features from "./Pages/Features/Features";
import { VelocityScroll } from "./components/scroll-based-velocity";
import Light from "@/components/Trapezium/Trapezium"
import Emogrid from "@/components/emogrid/emogrid";
import Emogrid2 from "@/components/emogrid2/emogrid";
import Globe from "@/components/purpleglobe/globe";

export default function Home() {


  const [
    mousePosition,
    setMousePosition
  ] = React.useState({ x: null, y: null });
  React.useEffect(() => {
    const updateMousePosition = (ev: any) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);




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

        <Globe />

        <div className="relative z-10 p-3 gap-14 flex flex-col ">
          <div className={` absolute backdrop-invert l h-[100px] w-[100px] rounded-[50%] -translate-x-[50%] -translate-y-[50%] `} style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}></div>

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

              <div className=" flex justify-center items-center w-[100%] rounded-full border-[2px] px-10  border-white  text-white uppercase text-[5rem] font-extrabold "> Sign Up</div>
            </Link>


          </div>

          {/* <VelocityScroll
      text="EXPRESSO CONNECT"
      default_velocity={5}
      className="  font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem] "
    /> */}

          <Features></Features>


        </div>


      </>
    );
  }
}

"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Loader from "@/components/loader/loading";
import Ripple from "@/components/ripple/ripple";
import Globe from "@/components/Globe/globe";
import { cn } from "@/lib/utils";
import Image from "next/image";
import AnimatedGradientText from "@/components/gradienttext/gradienttext";
import { ChevronRight } from "lucide-react";
import TextReveal from "@/components/magicui/text-reveal";
import IconCloud from "@/components/magicui/icon-cloud";
import Globe2 from "@/components/purpleglobe/globe";
import Particle from "@/components/particlejs/particle";

export default function Home() {

  const slugs = [
    "typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "sonarqube",
    "figma",
  ];

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  if (loading) {
    return <>
      <Loader />
    </>;
  }else{
  return (
    <>
   <Particle></Particle>
    
   <div className="h-[100vh] w-[100vw] ">
   <Globe2 className="z-0"></Globe2>
     <div className=" flex justify-between w-[100%] px-5 py-2">
          <div className=" z-10">
            <Image src="/data/logos/logo.png" alt="logo" width={150} height={100} />
          </div>
          <div className="z-10 flex  items-center justify-center">
            <div className=" px-3 text-white">
              Login
            </div>
            <AnimatedGradientText className=" mx-2">

              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                )}
              >
                Sign Up
              </span>

            </AnimatedGradientText>
          </div>

        </div>

   </div>

      <div className={` bg-white flex flex-col h-[100vh] overflow-x-hidden  w-[100%] `}>

        <div className="absolute h-[100vh] w-[100vw]  overflow-hidden bg-white  p-20 ">
          <Ripple />
        </div>

        <div className="z-20 absolute flex h-full w-full   overflow-hidden   bg-background  ">

          <Globe className="top-28" />
          <div className="pointer-events-none absolute inset-0 h-full " />
        </div>

       
        <div className="z-10 text-[13rem] w-[100%] flex justify-center uppercase font-bold text-gray-500">
          Friends
        </div>



      </div>



      <div className="z-10 left-0 flex flex-col-reverse relative  items-start justify-start  border bg-white dark:bg-[#F86400]">
        <TextReveal text="Expresso changes the way you connect" />
        <div className=" absolute z-20 top-0">

          <div className=" text-white text-[10vw] flex justify-center uppercase font-bold -rotate-90 translate-y-96 -translate-x-80">
            Features
          </div>


        </div>
      </div>






    </>
  );
}
}

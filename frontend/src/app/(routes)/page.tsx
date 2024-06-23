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
  }
  return (
    <>
  
    <div className={`${styles.app} flex flex-col h-[100vh]  w-[100vw] `}>
    
    <div className="absolute h-[100vh] w-[100vw]  overflow-hidden   p-20 ">
      <Ripple />
    </div>

    <div className="z-20 absolute flex h-full w-full   overflow-hidden   bg-background  ">
      
      <Globe className="top-28" />
      <div className="pointer-events-none absolute inset-0 h-full " />
    </div>

<div className=" flex justify-between ">
    <div className="z-20 p-[10px] flex gap-6 ">
      <Image src="/data/logos/logo.png" alt="logo" width={150} height={100} />
      
    </div>


    <div className="z-10 flex  items-center justify-center">
      <div className=" px-3 ">
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

          
  
    <div className="z-10 left-0 flex flex-col-reverse relative  items-start justify-start  border bg-white dark:bg-[#F86400]">
      <TextReveal text="Expresso changes the way you connect" />
      <div className=" absolute z-20 top-0">
         
      <div className=" text-white text-[5rem] flex justify-center uppercase font-bold rotate-90 translate-y-44 -translate-x-24"> 
         Features
         </div>
          

      </div>
    </div>
   
   
    

    
    
    </>
  );
}

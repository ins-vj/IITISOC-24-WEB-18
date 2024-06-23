"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Loader from "@/components/loader/loading";
import Ripple from "@/components/ripple/ripple";
import Globe from "@/components/Globe/globe";
import Image from "next/image";

export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
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


    <div className="z-20 p-[10px] ">
      <Image src="/data/logos/logo.png" alt="logo" width={150} height={100} />
    </div>
  

    </div>
    
    </>
  );
}

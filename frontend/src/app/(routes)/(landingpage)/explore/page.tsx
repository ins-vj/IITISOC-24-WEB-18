"use client";
import { useEffect, useState } from "react";
import Navbar from './components/navbar'
import Loader from "./components/loading";
import Link from "next/link";

export default function Home() {

 

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3500);
  }, []);
  if (loading) {
    return <>
      <Loader />
    </>;
  }else{
  return (
    <>
    
    <div className="relative z-10">
    <Navbar />
    
    

    </div>


    </>
  );
}
}

"use client";
import Image from "next/image";
import Emogrid from "./components/emogrid/emogrid";
import Loader from "./components/loader/loading";
import { useEffect, useState } from "react";
import Navbar from "./navbar/navbar";
import Logo from "./components/logo/logo"

export default function Home() {
 

  const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => setLoading(false), 5000)
    }, [])
    if (loading) {
        return <Loader/>
    }
  return (
    <div className="App">
       <Navbar />
     
      <h1>Hello</h1>
    </div>
  );
}
   
   
  


"use client";
import { useEffect, useState } from "react";

import Loader from "../components/loader";
import Link from "next/link";
import Image from 'next/image'
import Sidebar from '../components/sidebar'
import Topbar from '../components/topbar'

export default function Dashboard() {


 

  const [user, setUser] = useState("Jai");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 4000);
  }, []);
  if (loading) {
    return <>
      <Loader />
    </>;
  }else{
  return (
    <div className="w-[100%] h-[100%] p-[15px] overflow-y-auto flex flex-col ">
    
    <div className="flex flex-col scrollbar-hide">

    <div className="flex flex-row ">
      
     <div className=" flex flex-col">
      <span className=" text-[5rem]">Welcome, {user} !</span>
      <span className=" text-[1.5rem] text-[#10101075]">Let's connect to the outside world</span>
     </div>

      </div>



    </div>

 


    </div>
  );
}
}

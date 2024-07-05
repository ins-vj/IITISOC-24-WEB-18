"use client";
import { useEffect, useState } from "react";

import Loader from "@/components/dashboard/loader";
import Quickroom from "@/components/dashboard/room/quickroom";
import Joinroom from "@/components/dashboard/room/joinroom";
import Customroom from "@/components/dashboard/room/customroom";
import Upcoming from "@/components/dashboard/room/upcoming";
import Tasks from "@/components/dashboard/room/tasks";
import WordRotate from "@/components/dashboard/word-rotate";
import TypingAnimation from "@/components/dashboard/typinganimation";
import Topbar from "@/components/dashboard/topbar";
import Cards from "@/components/dashboard/room/cards";

export default function Dashboard() {
  const [user, setUser] = useState("Jai");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2500);
  }, []);
  if (loading) {
    return (
      <>
        <Loader user={user} />
      </>
    );
  } else {
    return (
      <div className={`flex gap-[10px] w-[100%] justify-around [@media(max-width:1100px)]:flex-col lg:flex-row  `}>

    <div className=" flex  [@media(max-width:1100px)]:flex-col-reverse lg:flex-row gap-[10px] w-[100%]">
    <Cards>
    <Quickroom/>
    <Joinroom/>
      <Customroom/>
      
    </Cards>

    <div className=" w-[100%] items-center min-w-[350px]  min-h-[100vh] flex flex-col gap-[15px]">
      <Topbar></Topbar>
      
      <Upcoming/> 
    </div>
  
    </div>
    <Cards>
      <Tasks/>
      {/* <Profile/> */}
    </Cards>
    
    
   
  

      </div>






    );
  }
}

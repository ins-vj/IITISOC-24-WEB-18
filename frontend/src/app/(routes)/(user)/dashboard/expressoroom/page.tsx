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
      <div className={`flex flex-col gap-[4rem] `}>

      <div className="flex flex-row justify-between items-center ">
        
       <div className=" flex flex-col">
  
       <WordRotate
        className=" text-[3rem] comfortaa font-bold "
        words={[`${user}'s Dashboard`]}
      />
  
  <TypingAnimation
        className=" text-[1.5rem] comfortaa text-[#10101075]"
        text="Connecting world"
      />
     
       </div>
  
      
       
        </div>
  
        <div className=" w-[100%] flex flex-row flex-wrap gap-14 ">
  
        <Quickroom />
  
        <Joinroom/>
        <Customroom/>
        <Upcoming/>
        <Tasks/>
  
        </div>
  
  
  
  
      </div>
  

 


    
  );
}
}

"use client";
import { useEffect, useState } from "react";

import Loader from "../../../../../components/dashboard/loading";
import WordRotate from "../../../../../components/dashboard/word-rotate";
import TypingAnimation from "../../../../../components/dashboard/typinganimation";


export default function Dashboard() {


 

  const [user, setUser] = useState("Jai");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  if (loading) {
    return <>
      <Loader user={user} />
    </>;
  }else{
  return (
   
    
    <div className={`flex flex-col gap-[4rem] `}>

    <div className="flex flex-row justify-between items-center ">
      
     <div className=" flex flex-col">

     <WordRotate
      className=" text-[3rem] comfortaa font-bold "
      words={["Expresso Insight"]}
    />
    <TypingAnimation
      className=" text-[1.5rem] comfortaa text-[#10101075]"
      text="Connecting technology"
    />
  
   
     </div>

    
     
      </div>

      <div className=" w-[100%] flex flex-row flex-wrap gap-14 ">

      

      </div>




    </div>

 


    
  );
}
}

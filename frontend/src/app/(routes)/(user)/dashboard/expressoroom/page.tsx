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
      <div className={`flex flex-col gap-[4rem] w-[100%] items-center `}>

        


        <div className="flex  flex-row  justify-between w-[100%] flex-wrap  ">
        
       

        <div className="flex flex-col  gap-[20px]">
        <Quickroom />
        <Tasks />
        </div>
       
        <div className="flex flex-col gap-[20px]  min-h-[100vh] bg-red-600">
        
        </div>

        <div className="flex flex-col gap-[20px]  ">
        <Customroom />
        <Joinroom />
        </div>
          
        
  

        </div>

       



      </div>






    );
  }
}

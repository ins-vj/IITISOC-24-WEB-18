"use client";
import { useEffect, useState } from "react";

import Loader from "@/components/dashboard/loading";
import Quickroom from "@/components/dashboard/friends/quickroom";
import Joinroom from "@/components/dashboard/friends/joinroom";
import Requests from "@/components/dashboard/friends/customroom";
import Favourites from "@/components/dashboard/friends/favourites";
import Upcoming from "@/components/dashboard/friends/upcoming";
import Search from "@/components/dashboard/friends/tasks";
import WordRotate from "@/components/dashboard/word-rotate";
import TypingAnimation from "@/components/dashboard/typinganimation";
import Topbar from "@/components/dashboard/topbar";
import Sections from "@/components/dashboard/friends/sections";
import Profile from "@/components/dashboard/friends/profile";
import ViewAI from "@/components/dashboard/friends/viewai";
import Particles from "@/components/landingpage/particles";
import React from "react";
export default function Dashboard() {






  const [user, setUser] = useState("Jai");
  const [username, setUsername] = useState("jaipannu08");
  const [mail, setMail] = useState("ce230004019@iiti.ac.in");
  const [photo, setPhoto] = useState("/data/generative/dp.jpg");

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
      <>
        <Particles className="absolute w-full h-full" />


        <div className={`flex gap-[10px] w-[100%] justify-around [@media(max-width:1100px)]:flex-col lg:flex-row  `}>
          {/* <div className=" absolute -z-0 -translate-x-[50%] -translate-y-[50%]  bg-customorange-700 w-[40%] h-[40%] blur-[500px] opacity-[0.3]"  style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}></div> */}


          <div className=" flex [@media(max-width:1100px)]:flex-col-reverse lg:flex-row gap-[10px] w-[100%]">
            <Sections>
            <div className=" enter w-[100%]">
              <Search photo={photo} user={user} username={username} />
            </div>
            <div className=" enter2 w-[100%]">

              <Requests photo={photo} user={user} username={username} />
            </div>
            <div className=" enter3 w-[100%]">

              <Favourites photo={photo} user={user} username={username} />
            </div>

            </Sections>

            <div className=" w-[100%] items-center min-w-[270px] justify-around   flex flex-col gap-[10px]">

              <div className=" enter7 w-[100%]">
                <Topbar></Topbar>
              </div>
              <div className=" enter5 w-[100%]">
                <ViewAI photo={photo} user={user} username={username} />
              </div>

            </div>

          </div>
          





        </div>

      </>





    );
  }
}

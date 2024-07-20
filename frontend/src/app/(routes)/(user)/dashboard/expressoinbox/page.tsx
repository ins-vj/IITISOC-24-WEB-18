
"use client";
import { useEffect, useState } from "react";

import Loader from "@/components/dashboard/loading";
import Quickroom from "@/components/dashboard/inbox/quickroom";
import Joinroom from "@/components/dashboard/inbox/joinroom";
import Requests from "@/components/dashboard/inbox/customroom";
import Favourites from "@/components/dashboard/inbox/favourites";
import Upcoming from "@/components/dashboard/inbox/upcoming";
import Search from "@/components/dashboard/inbox/tasks";
import WordRotate from "@/components/dashboard/word-rotate";
import TypingAnimation from "@/components/dashboard/typinganimation";
import Topbar from "@/components/dashboard/topbar";
import Sections from "@/components/dashboard/inbox/sections";
import Profile from "@/components/dashboard/inbox/profileuser";
import List from "@/components/dashboard/inbox/frndlst";
import Particles from "@/components/landingpage/particles";
import React from "react";
import ViewAI from "@/components/dashboard/inbox/viewai";
import Meetings from "@/components/dashboard/room/upcoming"
export default function Inbox() {



  const [user, setUser] = useState("Jai");
  const [username, setUsername] = useState("jaipannu08");
  const [mail, setMail] = useState("ce230004019@iiti.ac.in");
  const [photo, setPhoto] = useState("/data/generative/dp.jpg");

  // const [
  //   mousePosition,
  //   setMousePosition
  // ] = React.useState({ x: 0, y: 350 });
  // React.useEffect(() => {
  //   const updateMousePosition = (ev: any) => {
  //     setMousePosition({ x: ev.clientX, y: ev.clientY });
  //   };
  //   window.addEventListener('mousemove', updateMousePosition);
  //   return () => {
  //     window.removeEventListener('mousemove', updateMousePosition);
  //   };
  // }, []);





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
        <div className={`flex gap-[10px] w-[100%] justify-around [@media(max-width:1100px)]:flex-col lg:flex-row `}>
          {/* <div className=" absolute -z-0 -translate-x-[50%] -translate-y-[50%]  bg-customorange-700 w-[40%] h-[40%] blur-[500px] opacity-[0.3]"  style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}></div> */}

          <Sections>
            <div className=" enter7 w-[100%]">
              <Topbar></Topbar>
            </div>
            <div className=" [@media(min-width:1101px)]:hidden w-[100%]">
              <div className=" enter5 w-[100%]">
                <Profile user={user} username={username} mail={mail} photo={photo} />
              </div>
            </div>
          


            <div className=" enter2 w-[100%] h-[100%]">
              <Requests photo={photo} user={user} username={username} />
            </div>

            <div className=" enter3 w-[100%] h-[100%]">
              <Favourites photo={photo} user={user} username={username} />
            </div>



          </Sections>

          <div className=" w-[100%] items-center max-w-[500px] justify-around   flex flex-col gap-[10px]">

           

            <div className=" [@media(max-width:1100px)]:hidden w-[100%]">
              <div className=" enter4 w-[100%]">
                <Profile user={user} username={username} mail={mail} photo={photo} />
              </div>
            </div>
            <div className=" enter5 w-[100%]">
              <Meetings />
            </div>

            <div className=" enter3 w-[100%]">
              <Upcoming />
            </div>

            <div className=" enter8 w-[100%]">
              <ViewAI />
            </div>



          </div>


          {/* <Sections>
          <div className=" [@media(max-width:1100px)]:hidden w-[100%]">
            <div className=" enter4 w-[100%]">
            <Profile user={user} username={username} mail={mail} photo={photo} />
            </div>
          </div>
          <div className=" enter5 w-[100%]">
          <Meetings />
          </div>

            <div className=" enter3 w-[100%]">
            <Upcoming />
            </div>

            <div className=" enter8 w-[100%]">
            <ViewAI />
            </div>
         

        </Sections> */}





        </div>
      </>





    );
  }
}









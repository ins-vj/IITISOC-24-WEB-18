"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Quickroom from "@/components/landingpage/room/quickroom";
import Customroom from "@/components/landingpage/room/customroom";
import Joinroom from "@/components/landingpage/room/joinroom";
import Upcoming from "@/components/landingpage/room/upcoming";
import Tasks from "@/components/landingpage/room/tasks";
import Image from "next/image";
import Requests from "@/components/landingpage/friends/customroom";
import Favourites from "@/components/landingpage/friends/favourites";
import Search from "@/components/landingpage/friends/tasks";
import Profile from "@/components/landingpage/friends/profileuser";
import List from "@/components/landingpage/friends/frndlst";

import Incoming from "@/components/landingpage/inbox/customroom";
import Sent from "@/components/landingpage/inbox/favourites";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const [title, setTitle] = useState("Welcome")

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");
  const [user, setUser] = useState("Jai");
  const [username, setUsername] = useState("jaipannu08");
  const [mail, setMail] = useState("ce230004019@iiti.ac.in");
  const [photo, setPhoto] = useState("/data/generative/dp.jpg");

  useEffect(() => {

    return scrollYProgress.onChange((progress) => {
      console.log(progress);
      if (progress > 0.75) {
        setTitle("Inbox");
      }
      else if (progress > 0.50) {
        setTitle("Friends");
      }
      else if (progress > 0.25) {
        setTitle("Dashboard")
      }
      else{
        setTitle("Welcome")
      }
    });
  }, [scrollYProgress]);

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[400vh] max-w-[1440px] w-[100%]", className)}>
      <div
        className={
          "sticky top-0  flex h-[25%] w-[100%] items-center justify-center bg-transparent "
        }
      >
        <div className="bg-[rgb(253,204,146,0.3)] w-[100%] h-[90%] rounded-3xl absolute ">
          {title === "Welcome" &&
          <div className="change w-[100%] h-[100%] flex justify-center items-center uppercase text-[9rem] text-[#FDCC92]  font-black leading-[9rem] text-center">Welcome to Expresso</div>
          }
          {title === "Dashboard" &&
            <div className="w-[100%] h-[100%] flex flex-col gap-2 m-3 items-center ">
              <div className="absolute w-[100%] h-[100%] justify-end items-start flex z-10 pr-20 appear ">
                  <Image src="/data/logos/expressoai.png" width={200} height={200} alt="expresso"></Image>
                </div>
              <div className=" flex flex-col   w-[95%] ">
                <div className="change w-[100%] uppercase text-[9rem] text-[#FDCC92]  font-black leading-[9rem]">{title}</div>
                <div className="appear text-[rgb(250,219,181)] ">Everyhting you will ever need to connect with people and organize your life better</div>
              </div>
              <div className=" absolute bottom-0 w-[95%] h-[70%] overflow-hidden flex justify-around ">
                
                <div className=" max-w-[400px] h-min flex flex-col gap-6 appearcards ">
                  <Quickroom />
                  <div className=" ">
                    <Customroom />
                  </div>
                </div>
                <div className=" max-w-[400px] h-min flex flex-col gap-6 appearcards pt-9 opacity-65 ">
                  <Joinroom />
                  <div className=" ">
                    <Upcoming />
                  </div>
                </div>
                <div className=" max-w-[400px] h-min flex flex-col gap-6 appearcards ">
                  <Tasks/>
                  <div className=" ">
                    <Quickroom />
                  </div>
                </div>
              </div>
            </div>
          }
          {title === "Friends" &&
            <div className="w-[100%] h-[100%] flex flex-col gap-2 m-3 items-center ">
              <div className="absolute w-[100%] h-[100%] justify-end items-start flex z-10 pr-20 appear  ">
                  <Image src="/data/logos/frndsemo.png" width={240} height={240} alt="expresso"></Image>
                </div>
              <div className=" flex flex-col   w-[95%] ">
                <div className="change w-[100%] uppercase text-[9rem] text-[#FDCC92]  font-black leading-[9rem]">{title}</div>
                <div className="appear text-[rgb(250,219,181)] ">Make new friends. Looking forward connecting you to the world</div>
              </div>
              <div className=" absolute bottom-0 w-[95%] h-[70%] overflow-hidden flex justify-around ">
                
                <div className=" max-w-[420px] h-min flex flex-col gap-6 appearcards ">
                  <Search  user={user} username={username} mail={mail} photo={photo} />
                  <div className=" ">
                    <Requests  user={user} username={username} mail={mail} photo={photo} />
                  </div>
                </div>
                <div className=" max-w-[400px] h-min flex flex-col gap-6 appearcards pt-9 opacity-65 ">
                  <Favourites user={user} username={username} mail={mail} photo={photo}  />
                  <div className=" ">
                    <Upcoming />
                  </div>
                </div>
                <div className=" max-w-[400px] h-min flex flex-col gap-6 appearcards ">
                  <List user={user} username={username} mail={mail} photo={photo}/>
                  <div className=" ">
                    <Quickroom />
                  </div>
                </div>
              </div>
            </div>
          }
          {title === "Inbox" &&
            <div className="w-[100%] h-[100%] flex flex-col gap-2 m-3 items-center ">
              <div className="absolute w-[100%] h-[100%] justify-end items-start flex z-10 pr-20 appear ">
                  <Image src="/data/logos/mail.png" width={200} height={200} alt="expresso"></Image>
                </div>
              <div className=" flex flex-col   w-[95%] ">
                <div className="change w-[100%] uppercase text-[9rem] text-[#FDCC92]  font-black leading-[9rem]">{title}</div>
                <div className="appear text-[rgb(250,219,181)] ">Your friends might be waiting for you to join</div>
              </div>
              <div className=" absolute bottom-0 w-[95%] h-[70%] overflow-hidden flex justify-around ">
                
                <div className=" w-[600px] h-min flex flex-col gap-6 appearcards ">
                  <Incoming  user={user} username={username} mail={mail} photo={photo}/>
                  
                </div>
                <div className=" w-[600px] h-min flex flex-col gap-6 appearcards pt-9 opacity-65 ">
                  <Sent  user={user} username={username} mail={mail} photo={photo}/>
                  
                </div>
                
              </div>
            </div>
          }
        
        </div>
        <p
          ref={targetRef}
          className={
            "hidden  flex-wrap p-5 text-2xl backdrop-blur-lg rounded-2xl   font-bold text-black/20 dark:text-white/20 md:text-3xl   absolute bottom-[4rem] left-[1rem]"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: any;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-black dark:text-white"}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default TextRevealByWord;

"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const [title, setTitle] = useState(0)

  useEffect(() => {

    return scrollYProgress.onChange((progress) => {
      console.log(progress);
      if (progress > 0.80) {
        setTitle(5);
      }
      else if (progress > 0.60) {
        setTitle(4)
      }
      else if (progress > 0.40) {
        setTitle(3)
      }
      else if (progress > 0.20) {
        setTitle(2)
      }
      else {
        setTitle(1)
      }
    });
  }, [scrollYProgress]);


  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative  z-0 h-[400vh] flex justify-center max-w-[1440px] w-[100%]", className)}>


      <div
        className={
          "sticky top-0  flex h-[25%] w-[100%] items-center justify-center bg-transparent m-3 "
        }
      >
        
        <div className=" w-[100%] h-[95%]  rounded-3xl absolute  ">

          {title > 0 ? <div className="w-[100%]  flex  gap-[5rem] items-center ">
            <div className="   xl:text-[15rem]  opacity-10 flex xl:leading-[12rem] leading-[8rem] md:leading-[11rem]  sm:leading-[10rem]  md:text-[10rem] sm:text-[7rem] text-[5rem] ">
            1
            </div>

            <div className=" flex flex-col   w-[95%] ">
              <div className="change  uppercase xl:text-[5rem] md:text-[4rem] sm:text-[3.5rem] text-[1rem] text-[#FDCC92]  font-black leading-[3rem] sm:leading-[5rem] md:leading-[6rem] lg:leading-[9rem]">Interface</div>
              <div className="appear text-[rgb(250,219,181)] text-[0.7rem] sm:text-[1rem] ">User can find every feature available at finger tips with expresso dashboard interface</div>
            </div>

          </div>
          : null

          }
          {title > 1 ? <div className="w-[100%]   flex  gap-[5rem] items-center ">
            <div className="   xl:text-[15rem]  opacity-10 flex xl:leading-[12rem] leading-[8rem] md:leading-[11rem]  sm:leading-[10rem]  md:text-[10rem] sm:text-[7rem] text-[5rem] ">
            2
            </div>

            <div className=" flex flex-col   w-[95%] ">
              <div className="change  uppercase xl:text-[5rem] md:text-[4rem] sm:text-[3.5rem] text-[1rem] text-[#FDCC92]  font-black leading-[3rem] sm:leading-[5rem] md:leading-[6rem] lg:leading-[9rem]">Invite friends</div>
              <div className="appear text-[rgb(250,219,181)] text-[0.7rem] sm:text-[1rem] ">Invite as many friends you want directly using mail while creating a room.</div>
            </div>

          </div>
          : null

          }
          {title > 2 ? <div className="w-[100%]   flex  gap-[5rem] items-center ">
            <div className="   xl:text-[15rem]  opacity-10 flex xl:leading-[12rem] leading-[8rem] md:leading-[11rem]  sm:leading-[10rem]  md:text-[10rem] sm:text-[7rem] text-[5rem] ">
            3
            </div>

            <div className=" flex flex-col   w-[95%] ">
              <div className="change  uppercase xl:text-[5rem] md:text-[4rem] sm:text-[3.5rem] text-[1rem] text-[#FDCC92]  font-black leading-[3rem] sm:leading-[5rem] md:leading-[6rem] lg:leading-[9rem]">Automated Invitations</div>
              <div className="appear text-[rgb(250,219,181)] text-[0.7rem] sm:text-[1rem] ">Just select friend you want to connect and see how expresso does magic</div>
            </div>

          </div>
          : null

          }
          { title > 3 ? <div className="w-[100%]   flex  gap-[5rem] items-center ">
            <div className="   xl:text-[15rem]  opacity-10 flex xl:leading-[12rem] leading-[8rem] md:leading-[11rem]  sm:leading-[10rem]  md:text-[10rem] sm:text-[7rem] text-[5rem] ">
            4
            </div>

            <div className=" flex flex-col   w-[95%] ">
              <div className="change  uppercase xl:text-[5rem] md:text-[4rem] sm:text-[3.5rem] text-[1rem] text-[#FDCC92]  font-black leading-[3rem] sm:leading-[5rem] md:leading-[6rem] lg:leading-[9rem]">Management Of Tasks</div>
              <div className="appear text-[rgb(250,219,181)] text-[0.7rem] sm:text-[1rem] ">Dashboard is made efficient to handle all daily life requirements</div>
            </div>

          </div>
          : null

          }
          {title > 4 ? <div className="w-[100%]  flex  gap-[5rem] items-center ">
            <div className="   xl:text-[15rem]  opacity-10 flex xl:leading-[12rem] leading-[8rem] md:leading-[11rem]  sm:leading-[10rem]  md:text-[10rem] sm:text-[7rem] text-[5rem] ">
            5
            </div>

            <div className=" flex flex-col   w-[95%] ">
              <div className="change  uppercase xl:text-[5rem] md:text-[4rem] sm:text-[3.5rem] text-[1rem] text-[#FDCC92]  font-black leading-[3rem] sm:leading-[5rem] md:leading-[6rem] lg:leading-[9rem]">Latency</div>
              <div className="appear text-[rgb(250,219,181)] text-[0.7rem] sm:text-[1rem] ">Expresso provides users best latency so that they won't skip a moment.</div>
            </div>

          </div>
          : null

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

"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { FC, ReactNode, useRef } from "react";
import Particles from "@/components/magicui/particles";
import Image from "next/image";
import BoxReveal from "./boxreveal";
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
  const words = text.split(" ");

  return (


    <div ref={targetRef} className={cn("relative  z-0 h-[200vh]", className)}>
        <div className="  absolute top-0 opacity-30 flex items-center justify-center w-[100%] h-[100%]"><Image src="/data/logos/expressoai.png" width={1500} height={200} alt="" className=" blur-md"></Image></div>
        
       
      <div
        className={
          "sticky z-10 top-0 mx-auto flex flex-col justify-center   h-[50%] max-w-[95%]  items-center bg-transparent px-[1rem] "
        }
      >
        
       
        <p
          ref={targetRef}
          className={
            "flex flex-wrap items-center p-5 h-[80%] text-2xl  font-bold text-black/20 dark:text-white/20  md:text-3xl  lg:text-4xl xl:text-[10rem]"
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
         
        <div className=" text-[5rem]">introducing <span className=" text-customorange-700 opacity-50">Expresso Intelligence</span></div>
   
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
        className={ " text-customorange-700"}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default TextRevealByWord;

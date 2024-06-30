"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { FC, ReactNode, useRef } from "react";
import Particles from "@/components/magicui/particles";

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
    <div ref={targetRef} className={cn("relative z-0 w-[100vw]  h-[400vh] flex flex-col justify-between ", className)}>

      


      <div
        className={
          "sticky top-[0] mx-auto flex h-[25%]  w-[100%] justify-center bg-transparent  "
        }
      >
   
        <p
          ref={targetRef}
          className={
            "flex relative z-30 flex-wrap justify-center p-5 text-2xl  w-[100%] font-bold  text-black/20 dark:text-white/20 py-[2rem]  md:text-3xl  lg:text-4xl xl:text-[5rem]"
          }
          style={{boxShadow: "inset 0px 50px 50px 100px rgb(10, 10, 10)"}}
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

          <div className=" ">
          <Particles className=" relative h-[100vh] w-[100%] "/>

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
        className={" text-customorange-700"}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default TextRevealByWord;

"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
      if (progress > 0.7) {
        setTitle(2);
      }
      else if (progress > 0.5) {
        setTitle(1);
      }

      else {
        setTitle(0)
      }
    });
  }, [scrollYProgress]);


  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh] w-[100%]", className)}>
      {title > 1 ?
        <div className=" absolute sm:right-[-5rem] right-[4rem] sm:bottom-[10vh] bottom-[30vh] sm:w-[450px] w-[250px] gap-5 items-end justify-around  object-contain flex flex-wrap ">
          <div className=" w-[50px] h-[50px] md:w-[150px] md:h-[150px] animate-pulse">
            <Image src="/data/emotions/happy.png" width={400} height={400} alt="expresso" className=" appear object-contain  "></Image>
          </div>
          <div className=" w-[50px] h-[50px] md:w-[150px] md:h-[150px] animate-pulse ">    <Image src="/data/emotions/surprised.png" width={400} height={400} alt="expresso" className=" appear object-contain  "></Image>
          </div>
          <div className=" w-[50px] h-[50px] md:w-[150px] md:h-[150px] animate-pulse">  <Image src="/data/emotions/angry.png" width={400} height={400} alt="expresso" className=" appear object-contain  "></Image>
          </div>
          <div className=" w-[50px] h-[50px] md:w-[150px] md:h-[150px] animate-pulse">  <Image src="/data/emotions/disgusted.png" width={400} height={400} alt="expresso" className=" appear object-contain  "></Image>
          </div>
          <div className=" w-[50px] h-[50px] md:w-[150px] md:h-[150px] animate-pulse">  <Image src="/data/emotions/sad.png" width={400} height={400} alt="expresso" className=" appear object-contain  "></Image>
          </div>
          <div className=" w-[50px] h-[50px] md:w-[150px] md:h-[150px] animate-pulse">  <Image src="/data/emotions/fearful.png" width={400} height={400} alt="expresso" className=" appear object-contain  "></Image>
          </div>
        </div> : null}

      {title > 0 ?
        <div className=" absolute right-7 sm:bottom-[65vh] bottom-[5vh] sm:w-[400px] w-[320px] text-justify sm:text-[2.5rem] text-[1.5rem] font-bold opacity-25   ">

          With our Expression detection Model. Express yourself like you never have before.

        </div> : null}

      <div
        className={
          "sticky top-0  flex h-[50%] max-w-4xl  items-center bg-transparent px-[1rem] py-[1rem]"
        }
      >

        <p
          ref={targetRef}
          className={
            "flex flex-wrap flex-col sm:flex-row  h-[80%] items-center text-[3.5rem] sm:text-[4.5rem] font-bold text-black/20 dark:text-white/20  md:text-[6rem]  lg:text-[7.5rem] xl:text-[10rem]"
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

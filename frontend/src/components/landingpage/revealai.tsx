"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { FC, ReactNode, useRef } from "react";
import Logo from "@/components/logo/logo";
import { Input, Button, Divider } from "@nextui-org/react";
import data from './data.json';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CloudIcon from '@mui/icons-material/Cloud';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import ShineBorder from "./shinecard"

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


    const [count, setCount] = useState<number>(0);


    const updateCount = () => {
        setCount(prevCount => prevCount + 1);
    };


    useEffect(() => {
        const intervalId = setInterval(updateCount, 1000);


        return () => clearInterval(intervalId);
    }, []);

    function getRandomInteger() {
        return Math.floor(Math.random() * 115) + 1;
    }

    return (
        <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
            <div className=" absolute top-[-200px] opacity-60 flex items-center justify-center w-[100%] h-[95%]"><Image src="/data/logos/expressoai.png" width={2000} height={200} alt="" className=" blur-lg"></Image></div>

            <div
                className={
                    "sticky top-0 mx-auto w-[100%] z-10   flex justify-center h-[50%]  items-end bg-transparent px-[1rem] py-[1rem]"
                }
            >






                <p
                    ref={targetRef}
                    className={
                        "flex flex-wrap flex-col   items-center p-5 w-[95%]  text-2xl font-bold text-black/20 dark:text-white/10  md:text-3xl lg:p-10 lg:text-4xl xl:text-[6rem]"
                    }
                >
                    <div>
                        {words.map((word, i) => {
                            const start = i / words.length;
                            const end = start + 1 / words.length;
                            return (
                                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                                    {word}
                                </Word>
                            );
                        })}
                    </div>
                    <div className=" mt-[20px] text-[2rem]">Spreading Happiness</div>
                </p>


            </div>

            <div className=" h-[100vh]  w-[100%]    absolute flex items-center flex-col px-4 ">
                {/* <div className=" flex w-[100%] h-[40%] justify-around ">
                   
                        <ShineBorder
                        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
                            <div className="flex gap-[20px] ">
                                


                                <Image src="/data/logos/expressoai.png" alt="G" width={200} height={200} />

                            </div>
                            <div className="w-[50%] text-justify text-[1rem] uppercase ">
                                Expresso is powerfull enough to dig deep into your emotions using your facial expressions.
                            </div>
                        </ShineBorder>
                 
          
                        <ShineBorder
                        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
                        <div><Image src={data[getRandomInteger()]} width={100} height={100} alt=""></Image></div>
                        <div className="w-[50%] text-justify text-[1rem] uppercase">
                            Expresso can overlay emoji based on your mood, All in real-time with the lowest possible latency.
                        </div>
                        </ShineBorder>
                 
                </div>
                <div className=" flex w-[100%] h-[40%] justify-around">

                        <ShineBorder
                        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
                        <div className="flex gap-[20px] ">
                            <CloudIcon  fontSize="large" className=" scale-[5]" />
                            <EnhancedEncryptionIcon fontSize="large" className=" scale-[3] drop-shadow-xl" />

                        </div>
                        <div className="w-[50%] text-justify text-[1rem] uppercase">
                            Expresso stores all data on the most secure global cloud infrastructure
                        </div>
                        </ShineBorder>
                    
        
                        <ShineBorder
                        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
                        <div className="w-[50%] text-justify text-[1rem] uppercase">
                            Experience how it feels connecting with your friends with the power of Expresso Intelligence
                        </div>
                        </ShineBorder>
                        </div> */}
              


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

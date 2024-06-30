
import React, { useEffect, useRef, useState } from 'react';
import Logo from '@/components/logo/logo';
import Typing from '@/components/landingpage/typing';
import Image from "next/image";


export default function LazyLoadedComponent(props:any) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedContent, setLoadedContent] = useState<string>('');
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
      
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            setIsLoading(true); 
      
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1, 
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {

    if (isLoading) {
 
      setTimeout(() => {
 
        const fetchedContent = 'This is the lazy-loaded content.';
        setLoadedContent(fetchedContent);
        setIsLoading(false); 
      }, 4000); 
    }
  }, [isLoading]);

  return (
    <div ref={componentRef}>
      {loadedContent ? (
        <div className=" px-[4rem] w-[100%] mb-6 flex gap-[2rem]  ">
        <div className="h-[80px] w-[85px] relative rounded-[50%] flex justify-center items-center bg-[rgba(20,20,20)]">
        <Image src="/data/logos/expressoai.png" width={60} height={60} alt="" />
        </div>
        <div className="  bg-[rgba(20,20,20)] w-[100%]  px-[2rem] py-[0.5rem] rounded-[20px] flex items-center">
        <Typing text={props.prompt} className=" text-[1.5rem] text-[#ffffffaa] text-left   " />
        </div>
      </div>
      ) : (
        <div className=" px-[4rem] w-[100%] mb-6 flex gap-[2rem]  ">
        <div className="h-[80px] w-[85px] relative rounded-[50%] flex justify-center items-center bg-[rgba(20,20,20)]">
        <Image src="/data/logos/expressoai.png" width={60} height={60} alt="" />
        </div>
        <div className="  bg-[rgba(20,20,20)] w-[100%]  px-[2rem] py-[0.5rem] rounded-[20px] flex items-center gap-[10px]">
        <div className='h-[10px] w-[10px] bg-[#ffffffaa] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div className='h-[10px] w-[10px] bg-[#ffffffaa] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div className='h-[10px] w-[10px] bg-[#ffffffaa] rounded-full animate-bounce'></div>
        </div>
      </div>
      )}
    </div>
  );
};



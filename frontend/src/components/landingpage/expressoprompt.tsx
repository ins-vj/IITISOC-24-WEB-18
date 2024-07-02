import React, { useEffect, useRef, useState } from 'react';
import Logo from '@/components/logo/logo';
import Typing from '@/components/landingpage/typing';

export default function LazyLoadedComponent(props:any) {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
         
          if (entry.isIntersecting) {
            setIsVisible(true);
        
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.01, 
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={componentRef}>
      {isVisible && (
        <div className=" px-[4rem] w-[100%] mb-6 flex gap-[2rem] items-center">
            <div className="h-[80px] w-[80px] relative rounded-[50%] flex justify-center items-center bg-[rgba(20,20,20)]">
              <Logo width={60}  />
              </div>
              <div className=" h-[80px]  bg-[rgba(20,20,20)]  px-[2rem] py-[0.5rem] rounded-[20px] flex items-center">
               <Typing text={props.prompt} className=" text-[1.5rem] text-[#ffffffaa]   " />
              </div>
          
          
        </div>
      )}
    </div>
  );
};



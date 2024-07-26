"use client";

import React from "react";

import Cards from "@/components/landingpage/friends/cards";

import {blackops} from '@/app/fonts'


import Profile from "@/components/landingpage/friends/reqprofile";

export default function joinroom(props:any) {
   
    
    



    return (



        <Cards>
            
            
           
            

                <div className={` w-[100%] flex justify-between  text-wrap text-left text-[2rem] font-black ${blackops.className}`}>
                    Friend Requests
                    
                </div>

                <div className="w-full max-h-[20.5rem] min-h-[20.5rem] flex flex-col  gap-1 px-[5px] py-[2px] rounded-l-3xl border-default-200 dark:border-default-100 dark overflow-y-auto">

                 <Profile user={props.user} username={props.username} photo={props.photo} />
                 <Profile user={props.user} username={props.username} photo={props.photo} />
                 <Profile user={props.user} username={props.username} photo={props.photo} />
                 
               
                
    
                </div>


                
        
            

        </Cards>



    );
}
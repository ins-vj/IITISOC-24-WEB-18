"use client";
import { Button, Input, Tooltip } from "@nextui-org/react";


import React from "react";

import Cards from "@/components/landingpage/friends/cards";
import Image    from 'next/image'

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import toast from "react-hot-toast";

export default function Profile(props:any) {
   
    
    function sendRequest() {
        toast.success("Friend Request Sent");
    }




    return (



       <Cards>

        <div className=" flex w-[100%] gap-[20px] items-center justify-between">
        <div className="flex w-[100%] gap-[20px] items-center ">
            <Image src={props.photo}  width={50} height={50} alt="user" className=" object-cover rounded-[50%] bg-customorange-300" />
            <div>
            <div className=" flex items-center w-[100%] justify-start gap-[10px]">
            <div className="text-[1.5rem]" >{props.user}</div>
            <Image src="/data/flags/in.png"  width={20} height={20} alt="user" className=" object-cover bg-customorange-300 rounded-lg" />
            </div>
            <div className="text-[0.8rem] opacity-60 lowercase">@ {props.username}</div>
            </div>
            </div>
            <div>
     

            <Button color="warning" variant="ghost" isIconOnly size="lg" className=" border-none" onClick={sendRequest}> 
            <PersonAddAlt1Icon fontSize='medium' color='warning' className=' transition-all duration-300'  style={{color: "white" }}/>
            </Button>
                    
           
            </div>
        </div>
         
         


        </Cards>



    );
}
"use client";
import { Button, Input, Tooltip } from "@nextui-org/react";


import React from "react";

import Cards from "@/components/dashboard/friends/cards";
import Image    from 'next/image'

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import toast from "react-hot-toast";
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import StarIcon from '@mui/icons-material/Star';
import DuoIcon from '@mui/icons-material/Duo';
import VideoCallIcon from "@mui/icons-material/VideoCall";

export default function Profile(props:any) {
   
    
    function sendRequest() {
        toast.success("Friend Added");
    }
    function addFavourite() {
        toast.success("Added to favourites");
    }




    return (



        <div className=" relative flex w-[100%]  justify-start  hover:scale-[1.01] transition-all duration-300 flex-col items-center   gap-[20px] [@media(max-width:420px)]:px-[3px] p-[10px] sm:p-[20px] rounded-3xl">

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
     
            <div className=" flex sm:gap-[5px]">
            
            <Button color="warning" variant="ghost" isIconOnly size="lg" className=" border-none" > 
            <VideoCallIcon fontSize='medium' color='warning' className=' transition-all duration-300'  style={{color: "white" }}/>
            </Button>
            
            <Button color="default" variant="ghost" isIconOnly size="lg" className=" border-none" > 
            <StarIcon fontSize='medium' color='warning' className=' transition-all duration-300'  style={{ color: props.favourite ? "rgba(248,108,0)" : "rgba(254,254,254)" } }/>
            </Button>

            <Button color="danger" variant="light" isIconOnly  size="lg" className=" border-none" > 
            <ClearIcon fontSize='medium' className=' transition-all duration-300'  style={{color: "rgb(223,53,98)" }}/>
            </Button>
            </div>  
           
            </div>
        </div>
         
         


        </div>



    );
}
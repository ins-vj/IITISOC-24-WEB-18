"use client";
import { Button, Input, Tooltip } from "@nextui-org/react";

import { useState } from 'react';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import React from "react";
import { DateInput } from "@nextui-org/react";
import { parseZonedDateTime } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { today } from "@internationalized/date";
import Shine from './shine'
import { DatePicker } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import FriendPicker from "./addfriends";
import Cards from "@/components/dashboard/room/cards";
import Image    from 'next/image'
import Link from 'next/link'
import PersonIcon from '@mui/icons-material/Person';

export default function Profile(props:any) {
   
    




    return (



       <Cards>

        <div className=" flex w-[100%] gap-[20px] items-center justify-between">
        <div className="flex w-[100%] gap-[20px] items-center ">
            <Image src="/data/generative/dp.jpg"  width={100} height={100} alt="user" className=" object-cover rounded-[50%] bg-customorange-300" />
            <div>
            <div className=" flex items-center w-[100%] justify-between gap-[20px]">
            <div className="text-[2rem]" >{props.user}</div>
            <Image src="/data/flags/in.png"  width={30} height={30} alt="user" className=" object-cover bg-customorange-300 rounded-lg" />
            </div>
            <div className="text-[1rem] opacity-60 lowercase">@ {props.username}</div>
            </div>
            </div>
            <div>
            <Link href='/dashboard/expressoaccount' className=" transitioncustom">
                    <Tooltip content="Profile" color='foreground' placement='bottom' className=' bg-[rgb(30,30,30)]' >
                       
                            <PersonIcon fontSize='large' color='warning' className=' hover:scale-[1.5] transition-all duration-300'  style={{color: "white" }}/>
                
                    </Tooltip>
            </Link>
            </div>
        </div>
         
         


        </Cards>



    );
}